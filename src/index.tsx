import './index.css';
import ReactDOM from 'react-dom';
import {Spin} from 'antd';
import React from 'react';

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<Spin />, container);
