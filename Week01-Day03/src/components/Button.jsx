import React from "react";

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseClass =
    "w-full py-4 px-6 rounded-2xl font-medium flex items-center justify-between transition-colors";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
