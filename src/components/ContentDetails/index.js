import React, {Component}  from 'react';

import api from '../../services/api';

export default class ContentDetails extends Component {
  render() {

    return <h1>Hello, {this.props.name}</h1>;
  }
}