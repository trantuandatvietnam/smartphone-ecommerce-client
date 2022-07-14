import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import 'boxicons';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
