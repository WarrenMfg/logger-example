/* eslint-disable no-console */

import React from 'react';
import { Toaster } from 'react-hot-toast';

import Logger from './Logger';
// import ErrorBoundary from './ErrorBoundary';
// import ButtonsAndTimeline from './ButtonsAndTimeline';

/**
 * App - functional component
 */
function App() {
  return (
    <div className='container mx-auto py-8 flex flex-col items-center min-h-screen'>
      <Logger />
      <Toaster />
    </div>
  );
}

export default App;
