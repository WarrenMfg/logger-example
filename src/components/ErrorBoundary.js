import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { logError } from '../utils';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      stack: null
    };
  }

  componentDidCatch(message, { componentStack: stack }) {
    this.setState({ message, stack });
    // log error messages to an error reporting service here
    logError({ message, stack });
    // dispatch to global error state management to update UI
  }

  render() {
    // if (this.state.stack) {
    //   return <p>Something went wrong...</p>;
    // }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default ErrorBoundary;
