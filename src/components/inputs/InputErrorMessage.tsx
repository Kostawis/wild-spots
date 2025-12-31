import { FC } from 'react';

const InputErrorMessage: FC<{ error?: string }> = ({ error }) => {
  return error ? (
    <span
      title={error}
      className="absolute bottom-1 mt-1 line-clamp-1 cursor-default text-xs text-red-500"
    >
      {error}
    </span>
  ) : null;
};

export default InputErrorMessage;
