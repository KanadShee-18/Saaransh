import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export const DeleteBtn = () => {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="text-slate-600 bg-slate-200 hover:bg-rose-200 hover:text-rose-500 shadow-sm shadow-slate-400"
    >
      <Trash2Icon />
    </Button>
  );
};
