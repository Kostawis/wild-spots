import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";
import InputLoader from "../InputLoader";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  smallLabel?: boolean;
  unit?: string;
  icon?: IconDefinition;
  loading?: boolean;
  className?: string;
}

const TextInput = ({
  label,
  unit,
  icon,
  type = "text",
  value = "",
  error,
  loading = false,
  className,
  disabled,
  ...props
}: TextInputProps) => {
  return (
    <div className={twMerge("relative pb-6", className)}>
      <InputLabel label={label} />
      <div className="relative">
        <div
          className={classNames(
            "relative flex w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus-within:border-primary dark:border-gray-600 dark:bg-gray-700",
            {
              "border-red-500 dark:border-red-500": error,
              "opacity-40": loading,
            },
          )}
        >
          {icon ? (
            <div className="mr-2.5 flex items-center justify-center border-r pr-2.5 text-gray-500 dark:border-gray-600 dark:text-gray-300">
              <FontAwesomeIcon icon={icon} className="m-0" />
            </div>
          ) : null}
          <div className="relative flex-1">
            <input
              formNoValidate
              className={classNames(
                "w-full border-none bg-transparent p-0 text-sm text-gray-900 autofill:shadow-lightInput focus:ring-0 dark:text-white dark:placeholder:text-gray-400 dark:autofill:caret-white dark:autofill:shadow-darkInput dark:autofill:text-fill-white",
                {
                  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none":
                    type === "number",
                  "opacity-40": disabled && !loading,
                },
              )}
              disabled={loading || disabled}
              value={value}
              type={type}
              {...props}
            />
          </div>
          {unit && !loading ? (
            <div className="ml-2.5 flex justify-center border-l pl-2.5 font-semibold text-gray-500 dark:border-gray-600 dark:text-gray-300">
              {unit}
            </div>
          ) : null}
        </div>
        <InputLoader loading={loading} />
      </div>
      <InputErrorMessage error={error} />
    </div>
  );
};

export default TextInput;
