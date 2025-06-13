import { useNavigate } from "react-router-dom";
import { IceCream } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-1 min-h-screen flex-col items-center justify-center"
      style={{ color: "#000" }}
    >
      <IceCream size={64} strokeWidth={1.5} className="mb-6 text-[var(--color-primary)]" />
      <h1 className="text-3xl mb-2 font-[poppins-bold] text-[var(--color-primary)]">Page Not Found</h1>
      <p className="text-lg mb-4 text-center font-[poppins-medium] text-[var(--text-tertiary)]">
        Oops! This page doesn&apos;t exist.
      </p>
      <button
        className="px-6 py-2 rounded bg-[var(--color-primary)] text-white font-[poppins-bold] mt-2"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
}
