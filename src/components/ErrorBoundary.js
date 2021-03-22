import { Component } from 'react';
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
  }

  render() {
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
};

export default ErrorBoundary;
