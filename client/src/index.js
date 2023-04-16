import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Layout from './components/layout';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { makeSore } from './store/store';
import { socket, WebSocketProvider } from './context/WebSocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WebSocketProvider value={socket}>
      <BrowserRouter>
        <Provider store={makeSore()}>
          <Layout>
            <App />
          </Layout>
        </Provider>
      </BrowserRouter>
    </WebSocketProvider>
);
