import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}> { }
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
