"use client";

import {
  generatePdfSummary,
  generatePdfText,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useUploadThing } from "@/utils/uploadthing";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import UploadFormInput from "@/components/upload/upload-form-input";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { LoadingSkeleton } from "@/components/upload/loading-skeleton";
import { formatFileNameAsTitle } from "@/utils/format-filename";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File must be less than 20MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});

export const UploadForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useUser();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded successfully!");
    },
    onUploadError: (err) => {
      console.log("Error occurred while uploading!");
      toast.error("Error occurred while uploading!", {
        description: err.message,
      });
    },
    onUploadBegin: (file) => {
      console.log("Upload has begun for ", file);
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      // Validating the fields
      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error("Something went wrong!", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid File",
        });
        setIsLoading(false);
        return;
      }

      toast.message("🌨️Uploading PDF", {
        description: (
          <span className="text-rose-400 font-medium">
            We're uploading your file, this may take a few seconds
          </span>
        ),
      });

      console.log("Upload started ...");

      // upload the pdf to uploadthing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Something went wrong!", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }

      const processingToast = toast.loading("📄 Processing PDF", {
        description: (
          <span className="text-rose-400 font-medium">
            Hang tight! Our AI is reading through your content! ✨
          </span>
        ),
      });

      toast.dismiss(processingToast);

      // call the AI service
      const formattedFileName = formatFileNameAsTitle(file.name);

      toast.message(<span className="text-indigo-500">🔍 Parsing PDF</span>, {
        description: (
          <span className="text-rose-400 font-medium">
            We are parsing your PDF, this may take a few seconds
          </span>
        ),
      });

      const result = await generatePdfText({
        fileUrl: resp[0].serverData.file.url,
      });

      toast.message(
        <span className="text-indigo-500">✨Generating PDF Summary</span>,
        {
          description: (
            <span className="text-rose-400 font-medium">
              Summary from your PDF📝 is being generated...
            </span>
          ),
        }
      );

      const summaryResult = await generatePdfSummary({
        pdfText: result?.data?.pdfText ?? "",
        fileName: formattedFileName,
      });

      let savingToast = toast.message(
        <span className="text-indigo-500">Saving📩 PDF Summary</span>,
        {
          description: (
            <span className="text-rose-400 font-medium">
              We are saving your summary .....
            </span>
          ),
        }
      );

      const { data = null } = summaryResult || {};
      if (data?.summary) {
        // save the summary to the database
        const storedResult = await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: resp[0].serverData.file.url,
          title: formattedFileName,
          fileName: file.name,
          email: user?.emailAddresses[0].emailAddress,
        });

        if (storedResult.success) {
          toast.dismiss(savingToast);
          toast.message(
            <span className="text-indigo-500">✨Summary Generated!</span>,
            {
              description: (
                <span className="text-rose-400 font-medium">
                  Your summary has been successfully summarized and saved!📝
                </span>
              ),
            }
          );
          formRef.current?.reset();
          // redirect to the summary[id] page
          router.push(`/summaries/${storedResult?.data?.id}`);
        } else {
          toast.message(
            <span className="text-rose-400 font-medium">
              Failed to save summary!
            </span>,
            {
              description: (
                <span className="text-slate-500 font-medium">
                  Some error occurred from our end, please try again later!
                </span>
              ),
            }
          );
        }
        formRef.current?.reset();
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error Occurred: ", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background shadow-sm px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={onSubmit}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground shadow-sm text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
};
