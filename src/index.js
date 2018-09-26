import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import Root from './App';
import { initializeFirebase } from './components/push-notification';
import registerServiceWorker from './registerServiceWorker';


// import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#0b263e',
            contrastText: '#ffffff',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#ffffff',
            main: '#ff4400',
            contrastText: '#fff'
            // // dark: will be calculated from palette.secondary.main,
            // contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
});

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Root />
        </MuiThemeProvider>
    );
};

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
initializeFirebase();