/* eslint-disable no-console */

import React from 'react';

import ErrorBoundary from './ErrorBoundary';
import ButtonsAndTimeline from './ButtonsAndTimeline';

/**
 * App - functional component
 */
function App() {
  return (
    <ErrorBoundary>
      <ButtonsAndTimeline />
    </ErrorBoundary>
  );
}

export default App;
