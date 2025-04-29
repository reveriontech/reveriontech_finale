import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
  onClick,
  bgColor,
  href, 
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 cursor-pointer',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 cursor-pointer',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 cursor-pointer',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 cursor-pointer',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 cursor-pointer',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-blue-500 cursor-pointer',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 cursor-pointer'
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-2.5',
    xl: 'text-xl px-6 py-3'
  };
  
  const disabledClasses = 'opacity-60 cursor-not-allowed';
  const widthClasses = fullWidth ? 'w-full' : '';
  const bgColorClass = bgColor ? `bg-${bgColor} hover:bg-${bgColor}/90` : '';

  const buttonClasses = [
    baseClasses,
    bgColorClass || variantClasses[variant],
    sizeClasses[size],
    disabled ? disabledClasses : '',
    widthClasses,
    className
  ].join(' ');

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  bgColor: PropTypes.string,
  href: PropTypes.string 
};

export default Button;