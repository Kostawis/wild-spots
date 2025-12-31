import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

const HorizontalSeparator: FC<Props> = ({ className, children, ...props }) => {
  // jeśli NIE ma children → zwykła linia
  if (!children) {
    return (
      <span
        className={twMerge(
          "block h-0.5 rounded-md bg-gray-200 dark:bg-gray-600",
          className,
        )}
        {...props}
      />
    );
  }

  // jeśli JEST children → linie + tekst na środku
  return (
    <div
      className={twMerge(
        "flex w-full items-center gap-3 text-sm text-gray-500 dark:text-gray-400",
        className,
      )}
      {...props}
    >
      <span className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
      <span className="whitespace-nowrap">{children}</span>
      <span className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
    </div>
  );
};

export default HorizontalSeparator;
