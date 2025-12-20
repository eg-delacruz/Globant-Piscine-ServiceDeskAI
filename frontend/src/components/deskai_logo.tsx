type DeskAiLogoProps = {
  title_size?: 'small' | 'medium' | 'large';
};

const DeskAiLogo = ({ title_size = 'medium' }: DeskAiLogoProps) => {
  // Define size mappings
  const sizeClasses = {
    small: 'text-3xl',
    medium: 'text-5xl',
    large: 'text-7xl',
  };

  // Define tracking (letter spacing) based on size
  const trackingClasses = {
    small: 'tracking-normal',
    medium: 'tracking-tight',
    large: 'tracking-tighter',
  };

  return (
    <h1
      className={`${sizeClasses[title_size]} ${trackingClasses[title_size]} font-extrabold`}
    >
      <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-500 drop-shadow-sm'>
        deskai
      </span>
    </h1>
  );
};

export default DeskAiLogo;
