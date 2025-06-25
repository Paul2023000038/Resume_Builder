/**
 * Generates a unique ID for use in array items
 */
export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

/**
 * Format a date string to a more readable format
 * @param dateString - Date string in YYYY-MM format
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const [year, month] = dateString.split('-');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return `${months[parseInt(month) - 1]} ${year}`;
};

/**
 * Debounce function to limit the rate at which a function can fire
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => func(...args), waitFor);
  };
};