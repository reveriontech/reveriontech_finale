import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';
import '../../styles/ui/_dropdown.scss'

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
    <div className="dropdown-container">
        
        {/* Create New Item Form */}
        {isCreatingItem ? (
            <div className="task-create">
            <input
                type="text"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="Board title"
                className="request-design"
            />

            {/* For Select */}
            <div className="">
                <div className="">
                <IoEyeOutline size={16} />
                <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className=""
                >
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                </select>
                </div>
                <div className="flex gap-1">
                <button
                    onClick={() => setIsCreatingItem(false)}
                    className=""
                >
                    Cancel
                </button>
                <button
                    onClick={handleCreateItem}
                    className=""
                >
                    Create
                </button>
                </div>
            </div>
            </div>
        ) : (
        <button
          onClick={() => setIsCreatingItem(true)}
          className="board-design"
        >
          <AiOutlinePlus /> Create Task
        </button>
      )}
      
      {/* Items List */}
      <div className="space-y-1">
        {items.map((item, index) => (
          <Link
            key={index}
            to={linkPath}
            className=""
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