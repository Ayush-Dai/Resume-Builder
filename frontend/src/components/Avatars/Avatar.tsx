import React from 'react';

type AvatarProps = {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const Avatar: React.FC<AvatarProps> = ({   name = '', size = 'md' }) => {
  // Prefer firstName, fallback to name, then '?'
  const displayName =  name || '';
  const firstLetter = displayName.length > 0 ? displayName.charAt(0).toUpperCase() : '?';

  const sizeClasses: Record<Required<AvatarProps>['size'], string> = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-24 w-24 text-xl',
  };

  const commonClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center overflow-hidden`;

//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
//   console.log('Avatar image failed to load:', e.currentTarget.src);
//   e.currentTarget.style.display = 'none';
// };

  return (
    <div className={commonClasses}>
      {/* {src && src.trim().length > 0 ? (
        <img
          src={src}
          alt={`${displayName}'s avatar`}
          className="h-full w-full object-cover"
          onError={handleImageError}
        />
      ) : ( */}
        <div className="h-full w-full bg-blue-500 text-white flex items-center justify-center font-medium">
          {firstLetter}
        </div>
      
    </div>
  );
};

export default Avatar;
