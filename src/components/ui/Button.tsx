import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  loading,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 rounded font-medium focus:outline-none transition disabled:opacity-50 cursor-pointer";

  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : variant === "secondary"
      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
      : "bg-red-500 text-white hover:bg-red-600";

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
