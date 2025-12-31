import classNames from "classnames";
import { FC } from "react";

import Loader, { LoaderSize } from "./Loader";

export enum LoaderPosition {
  CENTER = "CENTER",
  TOP = "TOP",
}

const InputLoader: FC<{ loading: boolean; position?: LoaderPosition }> = ({
  loading,
  position = LoaderPosition.CENTER,
}) => {
  return loading ? (
    <div
      className={classNames("absolute right-3", {
        ["top-3"]: position === LoaderPosition.TOP,
        ["top-1/2 -translate-y-1/2"]: position === LoaderPosition.CENTER,
      })}
    >
      <Loader loading={loading} size={LoaderSize.SMALL} />
    </div>
  ) : null;
};

export default InputLoader;
