import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';

const Dropdown = ({ isOpen, items, onCreateItem, linkPath }) => {
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [itemTitle, setItemTitle] = useState('');
  const [visibility, setVisibility] = useState('Private');

  const handleCreateItem = () => {
    if (itemTitle.trim()) {
      onCreateItem({ title: itemTitle, visibility: visibility });
      setItemTitle('');
      setIsCreatingItem(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="mt-1 pl-10 pr-4 py-2 bg-gray-800 rounded-lg">
      {/* Create New Item Form */}
      {isCreatingItem ? (
        <div className="mb-3 space-y-2">
          <input
            type="text"
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            placeholder="Board title"
            className="w-full px-3 py-2 bg-gray-700 rounded text-sm"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoEyeOutline size={16} />
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="bg-gray-700 rounded text-xs py-1 px-2"
              >
                <option value="Private">Private</option>
                <option value="Public">Public</option>
              </select>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setIsCreatingItem(false)}
                className="px-2 py-1 text-xs bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateItem}
                className="px-2 py-1 text-xs bg-blue-600 rounded hover:bg-blue-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsCreatingItem(true)}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-2"
        >
          <AiOutlinePlus size={16} /> Create board
        </button>
      )}
      
      {/* Items List */}
      <div className="space-y-1">
        {items.map((item, index) => (
          <Link
            key={index}
            to={linkPath}
            className="flex items-center justify-between text-sm py-2 px-2 text-gray-300 hover:bg-gray-700 rounded transition-colors"
          >
            <span>{item.title}</span>
            <span className="text-xs text-gray-400">{item.visibility}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      visibility: PropTypes.string.isRequired
    })
  ).isRequired,
  onCreateItem: PropTypes.func.isRequired,
  linkPath: PropTypes.string.isRequired
};

export default Dropdown;