import {Spin} from 'antd';
import React from 'react';
import {Component} from 'react-subx';
import {StoreType} from './store';

type PropsStore = {
  store: StoreType;
};

class App extends Component<PropsStore> {
  render() {
    return <Spin />;
  }
}

export default App;
