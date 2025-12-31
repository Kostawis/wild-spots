import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

const SocialMediaItem: FC<{
  item: {
    icon: IconDefinition;
    url: string;
    bgColor: string;
  };
}> = ({ item }) => {
  const { icon, url, bgColor } = item;

  return url ? (
    <a
      key={bgColor}
      className={twMerge(
        'flex h-9 w-9 items-center justify-center rounded-2xl hover:opacity-75 transition-opacity',
        bgColor,
      )}
      title={url}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={icon} className="text-white" />
    </a>
  ) : null;
};

export default SocialMediaItem;
