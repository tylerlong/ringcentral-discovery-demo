import {Spin} from 'antd';
import React from 'react';
import {Component} from 'react-subx';
import store, {StoreType} from './store';

type PropsStore = {
  store: StoreType;
};

class App extends Component<PropsStore> {
  render() {
    return (
      <>
        <h1>RingCentral Discovery Demo</h1>
        {store.ready ? <Main store={store} /> : <Spin />}
      </>
    );
  }
}

class Main extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return store.token ? (
      'You have logged in'
    ) : (
      <a href={store.authorizeUri}>Log in</a>
    );
  }
}

export default App;
