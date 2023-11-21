interface SvgProps {
  className?: string;
}

export const Clock: React.FC<SvgProps> = ({className}) => {
  return (
    <svg viewBox="0 0 24 24" 
         className={`w-3.5 h-3.5 inline-block -mt-0.5 dark:text-gray-400 ${className || ''}`} >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="icon-tabler"
      >
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M12 7v5l3 3"></path>
      </g>
    </svg>
  );
};
