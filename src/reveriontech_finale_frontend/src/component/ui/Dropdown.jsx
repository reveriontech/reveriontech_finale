import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

const Dropdown = ({ 
  trigger, 
  children, 
  title = '', 
  onClose = null, 
  isOpen = false,
  position = 'bottom',
  width = 'w-full max-w-md'
}) => {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Handle controlled component
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open && 
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [open, onClose]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  // Determine position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2';
      case 'right':
        return 'left-full ml-2';
      case 'left':
        return 'right-full mr-2';
      case 'bottom':
      default:
        return 'top-full mt-2';
    }
  };

  return (
    <div className="relative inline-block">
      {/* Trigger element */}
      <div 
        ref={triggerRef}
        className="cursor-pointer" 
        onClick={handleToggle}
      >
        {trigger}
      </div>

      {/* Dropdown content */}
      {open && (
        <div 
          ref={dropdownRef}
          className={`absolute z-50 ${getPositionStyles()} ${width} bg-white rounded-lg shadow-xl border border-gray-200`}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-500 rounded-lg p-1.5"
                onClick={handleClose}
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="p-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
// Prop types for the Dropdown component
Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  width: PropTypes.string
};

// Default props
Dropdown.defaultProps = {
  title: '',
  onClose: null,
  isOpen: false,
  position: 'bottom',
  width: 'w-full max-w-md'
};

export default Dropdown;