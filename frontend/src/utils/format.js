/**
 * Format a number to Vietnamese currency string
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return (amount || 0).toLocaleString('vi-VN') + '₫';
};

/**
 * Format product image URL
 * @param {string} image 
 * @returns {string}
 */
export const formatProductImage = (image) => {
  if (!image) return '/assets/images/products/defaultProduct.png';
  if (image.startsWith('http')) return image;
  return `/assets/images/products/${image}`;
};

/**
 * Format date to Vietnamese locale
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('vi-VN');
};
