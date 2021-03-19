/* eslint-disable no-console */

import React, { useRef } from 'react';
import { logAnalytics, logError, handleErrors } from '../utils';

/**
 * App - stateful functional component
 */
function App() {
  // track container for outputting logs
  const healthAndAnalyticsRef = useRef(null);

  /**
   * Throws simulated error and logs from catch block
   */
  const handleDoSomethingBad = () => {
    try {
      // in reality this would be a click handler doing normal stuff...
      // but instead, clear healthAndAnalyticsRef
      healthAndAnalyticsRef.current.innerText = '';
      // simulate error
      throw new Error('Action that throws error was triggered.');
    } catch (error) {
      // may want to debounce this
      logError(error);
    }
  };

  /**
   * Wrapper to log analytics
   */
  const handleTrackUser = () => {
    // in reality this would be a click handler doing normal stuff...
    // but instead, clear healthAndAnalyticsRef
    healthAndAnalyticsRef.current.innerText = '';
    // invoke analytics logger
    logAnalytics('User did something we want to track.');
  };

  /**
   * Gets logged errors to print to screen (e.g. to a dashboard)
   */
  const handleGetErrors = async () => {
    try {
      const response = await fetch('/logger/errors');
      const { data } = await handleErrors(response);
      healthAndAnalyticsRef.current.innerText = JSON.stringify(
        data.reverse(),
        null,
        2
      );
    } catch (error) {
      logError(error);
    }
  };

  /**
   * Gets logged analytics to print to screen (e.g. to a dashboard)
   */
  const handleGetAnalytics = async () => {
    try {
      const response = await fetch('/logger/analytics');
      const { data } = await handleErrors(response);
      healthAndAnalyticsRef.current.innerText = JSON.stringify(
        data.reverse(),
        null,
        2
      );
    } catch (error) {
      logError(error);
    }
  };

  return (
    <div className='container mx-auto py-8 flex flex-col items-center min-h-screen'>
      <h1 className='text-3xl mb-4'>Logger R&amp;D</h1>
      <div className='flex justify-center space-x-16 mb-4'>
        <div className='w-min'>
          <button
            onClick={handleDoSomethingBad}
            className='w-80 mb-4 p-4 bg-red-300 hover:bg-red-500 transition-all rounded-full'
          >
            Action that throws error
          </button>
          <button
            onClick={handleTrackUser}
            className='w-80 p-4 bg-green-300 hover:bg-green-500 transition-all rounded-full'
          >
            Action that logs analytics
          </button>
        </div>
        <div className='w-min'>
          <button
            onClick={handleGetErrors}
            className='w-80 mb-4 p-4 bg-blue-300 hover:bg-blue-500 transition-all rounded-full'
          >
            Get errors
          </button>
          <button
            onClick={handleGetAnalytics}
            className='w-80 p-4 bg-purple-300 hover:bg-purple-500 transition-all rounded-full'
          >
            Get analytics
          </button>
        </div>
      </div>
      <pre ref={healthAndAnalyticsRef}></pre>
    </div>
  );
}

export default App;
