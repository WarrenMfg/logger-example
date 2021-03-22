import React, { useRef } from 'react';

import ErrorBoundary from './ErrorBoundary';
import Buttons from './Buttons';
import Timeline from './Timeline';

function Logger() {
  // track container for outputting logs
  const timelineRef = useRef(null);

  return (
    <ErrorBoundary>
      <Buttons timelineRef={timelineRef} />
      <Timeline timelineRef={timelineRef} />
    </ErrorBoundary>
  );
}

export default Logger;
