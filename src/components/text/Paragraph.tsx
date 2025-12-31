import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ParagraphProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> {
  children: ReactNode;
}

const Paragraph: FC<ParagraphProps> = ({ children, className, ...props }) => {
  return (
    <p
      className={twMerge(`text-gray-800 dark:text-gray-200 ${className}`)}
      {...props}
    >
      {children}
    </p>
  );
};

export default Paragraph;
