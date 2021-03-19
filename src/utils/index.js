/* eslint-disable no-console */

// debounce delay for logger
const LOGGER_DEBOUNCE_DELAY = 500;

/**
 * If user repeatedly triggers errors/analytics,
 * we only want to capture the last one in a series
 *
 * @param func The functionality to invoke after being debounced
 * @param delay The time to wait before invoking `func`
 */
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const effect = () => {
      timeout = null;
      return func.apply(null, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(effect, delay);
  };
}

/**
 * Handles fetch API errors
 *
 * @param res The response from the fetch request
 */
export const handleErrors = async res => {
  if (!res.ok) {
    throw await res.json();
  } else {
    return res.json();
  }
};

/**
 * Helper for consistent headers
 */
export const getHeaders = () => ({
  'Content-Type': 'application/json'
  // auth goes here
});

/**
 * Debounced error logger
 *
 * @param error The error object
 */
export const logError = debounce(async error => {
  try {
    const date = new Date(Date.now());

    const response = await fetch('/logger/error', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        time: `${date.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} ${date.toLocaleTimeString('en-US')}`,
        message: error.message,
        stack: error.stack.split('\n').reduce((acc, cur) => {
          if (cur.trim()) {
            acc.push(cur.trim());
          }
          return acc;
        }, [])
      })
    });
    await handleErrors(response);
  } catch ({ message, stack }) {
    // server error
    console.error(message, stack);
  }
}, LOGGER_DEBOUNCE_DELAY);

/**
 * Debounced analytics logger
 *
 * @param analytics The thing(s) to track
 */
export const logAnalytics = debounce(async analytics => {
  try {
    const date = new Date(Date.now());

    const response = await fetch('/logger/analytics', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        time: `${date.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} ${date.toLocaleTimeString('en-US')}`,
        analytics
      })
    });
    await handleErrors(response);
  } catch ({ message, stack }) {
    // server error
    console.error(message, stack);
  }
}, LOGGER_DEBOUNCE_DELAY);
