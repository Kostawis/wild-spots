import { FC, ReactNode } from 'react';

interface SubtitleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: ReactNode;
}

const Subtitle: FC<SubtitleProps> = ({ children, className, ...props }) => {
  return (
    <p className={`text-gray-500 dark:text-gray-400 ${className}`} {...props}>
      {children}
    </p>
  );
};

export default Subtitle;
