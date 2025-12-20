type BtnBlueGreenDegProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BtnBlueGreenDeg = ({
  children,
  className = '',
  ...props
}: BtnBlueGreenDegProps) => {
  const baseClasses =
    'py-4 px-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white text-lg font-bold rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-out focus:ring-4 focus:ring-blue-300/50';

  return (
    <button {...props} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
};

export default BtnBlueGreenDeg;
