"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { toast } from "sonner";

interface DeleteBtnProps {
  summaryId: string;
}

export const DeleteBtn = ({ summaryId }: DeleteBtnProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummaryAction(summaryId);
      if (!result.success) {
        toast.message(
          <span className="text-rose-400">📝{result.message} ❌</span>
        );
      }
      if (result.success) {
        toast.message(
          <span className="text-emerald-600">📝{result.message} ✔️</span>
        );
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-slate-600 bg-slate-200 hover:bg-rose-200 hover:text-rose-500 shadow-sm shadow-slate-400"
        >
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose className="text-white"></DialogClose>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            This action will delete your summary and this action can&apos;t be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setOpen(false)}
              className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="text-white hover:bg-linear-to-r hover:from-slate-900 hover:to-rose-600"
            >
              {isPending ? (
                <>
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2Icon className="w-4 h-4" />
                  <span>Delete</span>
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
