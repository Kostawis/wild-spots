import classNames from "classnames";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

type TogglerAdvancedProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  options: [string, string];
};

const TogglerAdvanced: FC<TogglerAdvancedProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div className="mx-auto mb-4 w-full max-w-sm rounded-lg p-1 dark:bg-gray-700">
      <div className="relative flex">
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(!!index)}
            className="z-10 flex-1 rounded-md p-1 text-center text-white"
          >
            {option}
          </button>
        ))}
        <span
          className={twMerge(
            "absolute top-0 h-full w-1/2 rounded-md bg-gray-600 transition-transform",
            classNames({
              "translate-x-full": value,
            }),
          )}
        ></span>
      </div>
    </div>
  );
};

export default TogglerAdvanced;
