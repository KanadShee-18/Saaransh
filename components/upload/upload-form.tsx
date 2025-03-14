"use client";

import { generatePdfSummary } from "@/actions/upload-actions";
import { UploadFormInput } from "@/components/upload/upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { z } from "zod";

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
      return;
    }

    toast.message("Uploading PDF", {
      description: "We're uploading your file, this may take a few seconds",
    });

    // upload the pdf to uploadthing
    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("Something went wrong!", {
        description: "Please use a different file",
      });
      return;
    }

    // toast.loading("📄 Processing PDF", {
    //   description: "Hang tight! Our AI is reading through your content! ✨",
    // });

    toast.loading("📄 Processing PDF", {
      description: (
        <span className="text-rose-400 font-medium">
          Hang tight! Our AI is reading through your content! ✨
        </span>
      ),
    });

    // parse the pdf text
    const summary = await generatePdfSummary(resp);
    console.log("Summary: ", summary);
    // summarize the pdf using AI
    // save the summary to the database
    // redirect to the summary[id] page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={onSubmit} />
    </div>
  );
};
