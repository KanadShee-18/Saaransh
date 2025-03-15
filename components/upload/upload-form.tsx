"use client";

import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useUploadThing } from "@/utils/uploadthing";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import UploadFormInput from "@/components/upload/upload-form-input";
import { useRouter } from "next/navigation";

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

      // parse the pdf text
      const result = await generatePdfSummary([
        { serverData: resp[0].serverData },
      ]);
      console.log("Summary: ", result);

      toast.dismiss(processingToast);

      const { data = null, message = null } = result || {};
      if (data) {
        toast.message("⤵️ Saving PDF", {
          description: (
            <span className="text-rose-400 font-medium">
              Hang tight! We're saving your summary! ✨
            </span>
          ),
        });

        if (data.summary) {
          // save the summary to the database
          const storedResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: resp[0].serverData.file.url,
            title: data.title,
            fileName: file.name,
          });

          if (storedResult.success) {
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
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={onSubmit}
      />
    </div>
  );
};
