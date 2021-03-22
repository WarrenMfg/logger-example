import { Component } from 'react';
import PropTypes from 'prop-types';

import { logError } from '../utils';

/**
 * ErrorBoundary - stateful class component
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      stack: null
    };
  }

  /**
   * Catch uncaught errors in children and trigger rerender
   */
  static getDerivedStateFromError({ message, stack }) {
    return { message, stack };
  }

  /**
   * Catch uncaught errors in children and invoke side effects
   */
  componentDidCatch(message, { componentStack: stack }) {
    // log error messages to an error reporting service here
    logError({ message, stack });
  }

  /**
   * Render children
   */
  render() {
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
};

export default ErrorBoundary;
