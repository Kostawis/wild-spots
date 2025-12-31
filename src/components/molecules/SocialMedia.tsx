import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { FC } from "react";
import SocialMediaItem from "../atoms/SocialMediaItem";

export type SocialMediaProps = {
  facebook: string;
  youtube: string;
  instagram: string;
};

const SocialMedia: FC<{
  socialMedia: { facebook: string; youtube: string; instagram: string };
}> = ({ socialMedia }) => {
  const SOCIAL_MEDIA = {
    youtube: {
      icon: faYoutube,
      bgColor: "bg-company-youtube",
    },
    facebook: {
      icon: faFacebook,
      bgColor: "bg-company-facebook",
    },
    instagram: {
      icon: faInstagram,
      bgColor: "bg-company-instagram",
    },
  };

  return (
    <>
      <SocialMediaItem
        item={{ ...SOCIAL_MEDIA.youtube, url: socialMedia.youtube }}
      />
      <SocialMediaItem
        item={{ ...SOCIAL_MEDIA.facebook, url: socialMedia.facebook }}
      />
      <SocialMediaItem
        item={{ ...SOCIAL_MEDIA.instagram, url: socialMedia.instagram }}
      />
    </>
  );
};

export default SocialMedia;
