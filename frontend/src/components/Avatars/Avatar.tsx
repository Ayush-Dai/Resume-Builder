import React from 'react';

type AvatarProps = {
  src?: string;
  firstName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const Avatar: React.FC<AvatarProps> = ({ src = '', firstName = '', size = 'md' }) => {
  const firstLetter = firstName && firstName.length > 0 ? firstName.charAt(0).toUpperCase() : '?';

  const sizeClasses: Record<Required<AvatarProps>['size'], string> = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-24 w-24 text-xl',
  };

  const hasValidImage = src.trim().length > 0;
  console.log(src);

  const commonClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center overflow-hidden`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const parent = e.currentTarget.parentElement;
    if (parent) {
      e.currentTarget.style.display = 'none';
      parent.classList.add('bg-blue-500', 'text-white');
      parent.innerHTML = firstLetter;
    }
  };

  return (
    <div className={commonClasses}>
      {hasValidImage ? (
        <img
          src={src}
          alt={`${firstName}'s avatar`}
          className="h-full w-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="h-full w-full bg-blue-500 text-white flex items-center justify-center font-medium">
          {firstLetter}
        </div>
      )}
    </div>
  );
};

export default Avatar;
