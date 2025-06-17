import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AuthModal({
  isOpen,
  onClose,
  title = "Authentication",
  children,
  hideCloseIcon = false,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "border-none font-[poppins-semibold] transition-all duration-300 ease-in-out"
        )}
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-primary)",
        }}
      >
        <DialogHeader className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
