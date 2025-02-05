import React, { ReactNode } from 'react';
import { MdMoreVert } from 'react-icons/md';

interface ButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

// Primary button
export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  className = '',
  type = 'button',
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`transition-all uppercase font-semibold text-xs rounded-xl px-8 py-[17px] text-black bg-primary hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

// Primary outline button
export const PrimaryOutlineButton: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  className = '',
  type = 'button',
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`transition-all uppercase font-semibold text-xs rounded-xl px-8 py-4 border border-secondary text-secondary bg-white hover:bg-secondary hover:text-black disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon?: ReactNode;
  size?: 'sm';
}

// Icon outline button
export const IconOutlineButton: React.FC<IconButtonProps> = ({
  disabled = false,
  className = '',
  type = 'button',
  icon = null,
  size,
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`transition-all rounded-full border border-secondary text-secondary bg-white hover:bg-secondary hover:text-black disabled:opacity-50 disabled:cursor-not-allowed ${
        size && size === 'sm' ? 'p-1.5' : 'p-3'
      } ${className}`}
    >
      {icon || <MdMoreVert size={24} />}
    </button>
  );
};
