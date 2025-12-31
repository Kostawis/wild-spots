import { FC } from 'react';

const COLOR_PATTERNS = {
  primary: 'text-primary-500 dark:text-primary-400',
};

const TextColorizer: FC<{
  children: string;
  color: keyof typeof COLOR_PATTERNS;
}> = ({ children, color }) => {
  return <span className={COLOR_PATTERNS[color]}>{children}</span>;
};

export default TextColorizer;
