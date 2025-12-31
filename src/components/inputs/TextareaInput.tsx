import classNames from "classnames";
import { useEffect, useState } from "react";
import ReactTextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";
import InputLoader, { LoaderPosition } from "../InputLoader";

interface TextareaInputProps extends TextareaAutosizeProps {
  label?: string;
  error?: string;
  loading?: boolean;
}

const TextareaInput = ({
  label,
  error,
  value = "",
  loading = false,
  ...props
}: TextareaInputProps) => {
  const [lengthCounter, setLengthCounter] = useState(
    value ? value.toString().length : 0,
  );
  const maxLength = props.maxLength || 1024;

  useEffect(() => {
    setLengthCounter(value ? value.toString().length : 0);
  }, [value]);

  return (
    <div className="relative">
      <InputLabel label={label} />
      <div className="relative pb-6">
        <span className="absolute bottom-1 right-0 text-xs text-gray-500 dark:text-gray-200">{`${lengthCounter}/${maxLength}`}</span>
        <ReactTextareaAutosize
          className={classNames(
            "block w-full flex-1 resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 scrollbar-small focus:border-primary focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400",
            {
              "border-red-500 dark:border-red-500": error,
              "opacity-40": loading,
            },
          )}
          disabled={loading}
          minRows={6}
          maxRows={20}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        <InputLoader loading={loading} position={LoaderPosition.TOP} />
      </div>
      <InputErrorMessage error={error} />
    </div>
  );
};

export default TextareaInput;
