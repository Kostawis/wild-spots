import classNames from "classnames";
import { FC } from "react";

const getInitials = (username: string) => {
  const parts = username.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
};

interface ProfileImageProps {
  username?: string | null;
  avatarUrl?: string | null;
  size?: "xs" | "sm" | "md" | "lg";
}

const SIZES: { [key in NonNullable<ProfileImageProps["size"]>]: string } = {
  xs: "w-8 h-8 text-xs",
  sm: "w-10 h-10 text-md",
  md: "w-16 h-16 text-2xl",
  lg: "w-20 h-20 text-3xl",
};

const ProfileImage: FC<ProfileImageProps> = (props) => {
  const { size = "sm", username, avatarUrl } = props;
  const initials = getInitials(username || "Deleted_user");

  return avatarUrl ? (
    <div
      className={classNames(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-medium text-white",
        {
          [SIZES[size]]: true,
        },
      )}
    >
      <img src={avatarUrl} />
    </div>
  ) : (
    <div
      className={classNames(
        "flex shrink-0 items-center justify-center rounded-full bg-primary font-medium text-white",
        {
          [SIZES[size]]: true,
        },
      )}
    >
      {initials}
    </div>
  );
};

export default ProfileImage;
