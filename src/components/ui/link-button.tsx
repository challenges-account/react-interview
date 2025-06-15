import { ElementType } from "react";
import { Link } from "react-router";

interface LinkButtonProps {
  to: string;
  icon: ElementType;
  label?: string;
  iconSize?: number;
  className?: string;
}

const LinkButton = ({
  to,
  icon: Icon,
  label,
  iconSize = 28,
  className = "",
}: LinkButtonProps) => {
  return (
    <Link
      to={to}
      className={`text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2 text-lg ${className}`}
      aria-label={label ? `Go to ${label}` : undefined}
    >
      {label && <span>{label}</span>}
      <Icon size={iconSize} weight="bold" />
    </Link>
  );
};

export default LinkButton;
