import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }

    componentDidMount() {
      importComponent()
        .then(component => {
          this.setState({component: component.default});
        });
    }

    render() {
      const LazyComponent = this.state.component;

      return LazyComponent ? <LazyComponent {...this.props} /> : null;
    }
  }
}

export default asyncComponent;