import { FC } from "react";

import HorizontalSeparator from "../HorizontalSeparator";
import Heading from "../text/Heading";
import Paragraph from "../text/Paragraph";
import ProfileImage from "./ProfileImage";
import SocialMedia, { SocialMediaProps } from "./SocialMedia";

type AccountHeader = {
  socialMedia?: SocialMediaProps;
  firstName?: string;
  email?: string;
};

const AccountHeader: FC<AccountHeader> = (props) => {
  const { firstName, email, socialMedia } = props;

  return (
    <>
      <div className="flex justify-between gap-x-3">
        <div className="flex gap-x-6">
          <ProfileImage size="lg" firstName={firstName} />
          <div className="flex flex-col justify-center">
            <Heading.H1 noMargin>{firstName}</Heading.H1>
            <Paragraph>{email}</Paragraph>
          </div>
        </div>
        {socialMedia && (
          <div className="flex items-center flex-nowrap gap-x-3">
            <SocialMedia socialMedia={socialMedia} />
          </div>
        )}
      </div>
      <HorizontalSeparator className="mt-5 mb-4" />
    </>
  );
};

export default AccountHeader;
