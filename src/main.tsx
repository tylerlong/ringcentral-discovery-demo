import {Spin} from 'antd';
import React from 'react';
import {Component} from 'react-subx';
import store, {StoreType} from './store';

type PropsStore = {
  store: StoreType;
};

class App extends Component<PropsStore> {
  render() {
    return store.ready ? 'I am ready' : <Spin />;
  }
}

export default App;
