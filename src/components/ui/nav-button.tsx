import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function NavButton({
  isActive,
  className,
  children,
  ...props
}: NavButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-full transition-colors duration-200",
        isActive
          ? "bg-purple-600 text-white hover:bg-purple-700"
          : "border border-purple-400 text-white hover:bg-purple-800",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
