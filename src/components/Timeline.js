import React from 'react';
import PropTypes from 'prop-types';

function Timeline({ timelineRef }) {
  return <pre ref={timelineRef}></pre>;
}

Timeline.propTypes = {
  timelineRef: PropTypes.object.isRequired
};

export default Timeline;
