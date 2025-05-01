/**
 * Format a date to a human-readable string
 * @param {string|Date} date - The date to format
 * @param {string} format - The format to use (default: 'short')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
    if (!date) return '';
    
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) return '';
    
    const options = {
      short: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
      time: { hour: '2-digit', minute: '2-digit' },
      full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    };
    
    return dateObj.toLocaleDateString(undefined, options[format] || options.short);
  };
  
  /**
   * Check if a date is in the past
   * @param {string|Date} date - The date to check
   * @returns {boolean} True if the date is in the past
   */
  export const isPastDue = (date) => {
    if (!date) return false;
    
    const dateObj = date instanceof Date ? date : new Date(date);
    const today = new Date();
    
    // Strip time portion for date comparison
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(dateObj);
    compareDate.setHours(0, 0, 0, 0);
    
    return compareDate < today;
  };