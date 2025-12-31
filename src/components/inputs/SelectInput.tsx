import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useSelect } from "downshift";
import { twMerge } from "tailwind-merge";

import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";
import Heading from "../text/Heading";
import Subtitle from "../text/Subtitle";
import InputLoader from "../InputLoader";

export type SelectInputItems = {
  id: string;
  name: string;
  description?: string;
};

interface SelectInputProps {
  label?: string;
  error?: string;
  loading?: boolean;
  items: SelectInputItems[];
  value: SelectInputItems;
  onChange: (value?: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const Select = ({
  onChange,
  value,
  label,
  items,
  loading = false,
  error,
  placeholder,
  disabled,
  className,
}: SelectInputProps) => {
  const {
    isOpen,
    getToggleButtonProps,
    selectedItem,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect<SelectInputItems>({
    items,
    selectedItem: value || {
      id: null,
      name: placeholder || "Wybierz z listy",
    },
    onSelectedItemChange: (e) => onChange(e.selectedItem?.id),
  });

  return (
    <div className={twMerge("relative pb-6", className)}>
      <InputLabel label={label} />
      <div
        className={classNames(
          "relative flex w-full cursor-pointer justify-between rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none autofill:shadow-lightInput dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:autofill:caret-white dark:autofill:shadow-darkInput dark:autofill:text-fill-white",
          {
            "border-red-500 dark:border-red-500": error,
            "pointer-events-none select-none opacity-40": loading || disabled,
            "focus:border-primary": !loading && !disabled,
          },
        )}
        {...getToggleButtonProps({ disabled: disabled || loading })}
      >
        <div>{selectedItem?.name}</div>
        <div
          className={classNames(
            "absolute right-4 top-1/2 -translate-y-1/2 transition ease-in-out",
            {
              ["rotate-180"]: isOpen,
              ["hidden"]: loading,
            },
          )}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <ul
        className="absolute bottom-6 left-0 z-50 max-h-56 w-full translate-y-full list-none overflow-y-auto rounded-b-lg bg-gray-50 shadow-lg scrollbar-small dark:bg-gray-700"
        {...getMenuProps({ disabled: disabled || loading })}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={classNames(
                "cursor-pointer border-b border-gray-300 p-2 transition-colors ease-out last:border-0 dark:border-gray-600",
                {
                  "bg-gray-200": highlightedIndex === index,
                },
              )}
              key={`${item.id}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              <Heading.H5
                noMargin
                className={classNames("font-normal", {
                  "font-bold": selectedItem === item,
                })}
              >
                {item.name}
              </Heading.H5>
              <Subtitle className="text-xs text-gray-500">
                {item.description}
              </Subtitle>
            </li>
          ))}
      </ul>
      <InputLoader loading={loading} />
      <InputErrorMessage error={error} />
    </div>
  );
};

export default Select;
