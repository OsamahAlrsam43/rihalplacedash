import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import reducer,{initialState} from './reducer/Reducer';
import { StateProvider } from './reducer/StateProvider';

ReactDOM.render(
  <React.StrictMode>
  <StateProvider  initialState={initialState} reducer={reducer}>
    <ConfigProvider direction="rtl">
        <App dir="rtl" lang="ar" />

</ConfigProvider>
  </StateProvider>
  </React.StrictMode>

  ,
  document.getElementById('root')
);

