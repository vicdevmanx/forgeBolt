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
          "rounded-xl border-none shadow-lg w-full max-w-md transition-all",
          "bg-[var(--bg-color)] text-[var(--text-primary)] font-[poppins-semibold]"
        )}
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-primary)",
        }}
      >
        <DialogHeader className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          {/* {!hideCloseIcon && (
            <button
              onClick={onClose}
              className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition"
            >
              <X className="w-5 h-5" />
            </button>
          )} */}
        </DialogHeader>

        {/* 🔥 Inject any form or content you want */}
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
