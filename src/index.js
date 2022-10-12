import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {CircularProgress, Box} from '@mui/material';
import './index.css';
import App from './App';
import {ThemeProvider} from '@mui/material';
import theme from '../src/theme/theme.js'
import { Provider } from "react-redux";
import {store} from "./store/store.js";
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import './i18n'

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
        <Suspense true fallback={<Box sx={{ display: 'flex' , justifyContent:'center', marginTop:'45vh'}}>
      <CircularProgress />
    </Box>}>
             <App />
        </Suspense>
        </ThemeProvider>
        </PersistGate>
    </Provider>
);

