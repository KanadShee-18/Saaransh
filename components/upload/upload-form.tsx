"use client";

import { UploadFormInput } from "@/components/upload/upload-form-input";

export const UploadForm = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted!");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // Validating the fields
    // Schema validation with zod
    // upload the pdf to uploadthing
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
