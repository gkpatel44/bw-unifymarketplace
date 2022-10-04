import ReactDOM from 'react-dom/client'
import "./styles/tailwind.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import '@fontsource/inter/index.css'
import "@fontsource/manrope";
import './theme/global.scss'
import { HMSRoomProvider } from "@100mslive/react-sdk";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <HMSRoomProvider>
      <App />
    </HMSRoomProvider>
  </Router>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
