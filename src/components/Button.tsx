import classNames from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

const colorVariants = {
  primary: {
    normal: {
      bg: "bg-primary enabled:hover:bg-primary-700",
      text: "text-white",
      border: "border-transparent",
    },
    loading: {
      bg: "bg-transparent",
      border: "border border-solid border-primary",
    },
  },
  dark: {
    normal: {
      bg: "bg-gray-500 enabled:hover:bg-gray-600",
      text: "text-white",
      border: "border-transparent",
    },
    loading: {
      bg: "bg-transparent",
      border: "border border-solid border-gray-600",
    },
  },
  transparent: {
    normal: {
      bg: "bg-white dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100",
      text: "text-gray-700 dark:text-gray-200",
      border: "border border-solid dark:border-gray-700",
    },
    loading: {
      bg: "bg-transparent",
      border: "border border-solid border-gray-600",
    },
  },
  red: {
    normal: {
      bg: "bg-red-600 dark:hover:bg-red-600 dark:bg-red-500 hover:bg-red-300",
      text: "text-red-100 dark:text-gray-100",
      border: "border border-solid dark:border-gray-700",
    },
    loading: {
      bg: "bg-transparent",
      border: "border border-solid border-gray-600",
    },
  },
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof colorVariants;
  fullWidth?: boolean;
  toRight?: boolean;
  toLeft?: boolean;
  isLoading?: boolean;
}

const Button = ({
  color = "primary",
  fullWidth,
  toRight,
  toLeft,
  isLoading,
  className,
  children,
  ...props
}: ButtonProps) => {
  const colorClasses = colorVariants[color];
  const getColorClassesStringFromObject = (colorObject: {
    [key: string]: string;
  }) => {
    return Object.values(colorObject).join(" ");
  };

  return (
    <button
      className={classNames(
        twMerge(
          "flex h-9 items-center justify-center whitespace-nowrap rounded-lg border-gray-200 px-5 py-2 text-sm font-medium transition-colors disabled:opacity-50",
          className,
        ),
        {
          [getColorClassesStringFromObject(colorClasses.normal)]: true,
          [getColorClassesStringFromObject(colorClasses.loading)]: isLoading,
          "w-full": fullWidth,
          "ml-auto": toRight,
          "mr-auto": toLeft,
          "pointer-events-none": isLoading,
        },
      )}
      type="button"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          aria-hidden="true"
          role="status"
          className="inline h-5 w-5 animate-spin text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#059669"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
