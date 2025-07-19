import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg";
}

/**
 * Button component chuẩn hóa style cho toàn bộ dự án
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant = "default", size = "default", ...props },
        ref
    ) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                    variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
                    variant === "outline" && "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
                    variant === "ghost" && "bg-transparent hover:bg-gray-100 text-gray-900",
                    variant === "link" && "bg-transparent underline text-blue-600 hover:text-blue-800",
                    size === "default" && "h-10 px-4 py-2 text-base",
                    size === "sm" && "h-8 px-3 py-1 text-sm",
                    size === "lg" && "h-12 px-6 py-3 text-lg",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export default Button;
