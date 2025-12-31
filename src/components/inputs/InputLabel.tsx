import { FC, LabelHTMLAttributes } from "react";
import Heading from "../text/Heading";

interface LabelProps extends Pick<
  LabelHTMLAttributes<HTMLLabelElement>,
  "htmlFor"
> {
  label?: string;
  bigLabel?: boolean;
}

const InputLabel: FC<LabelProps> = ({ label, htmlFor, bigLabel }) => {
  return label ? (
    <label
      htmlFor={htmlFor}
      className={"mb-2 block text-sm font-medium text-gray-900 dark:text-white"}
    >
      {bigLabel ? (
        <Heading.H4 className="font-normal">{label}</Heading.H4>
      ) : (
        label
      )}
    </label>
  ) : null;
};

export default InputLabel;
