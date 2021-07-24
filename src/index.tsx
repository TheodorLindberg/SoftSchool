import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
    createTheme,
    ThemeOptions,
    ThemeProvider
} from '@material-ui/core/styles';

//import theme from 'assets/theme/theme';

import HomeLayout from 'layouts/HomeLayout';
import 'moment/locale/sv';
import TokenProvider from 'api/TokenProvider';

export const themeOptions: ThemeOptions = {
    palette: {
        type: 'light'
    }
};

export const themeOptionsDark: ThemeOptions = {
    palette: {
        type: 'dark',
        primary: {
            main: '#BB86FC',
            dark: '#3700B3'
        },
        secondary: {
            main: '#03DAC6'
        }
    }
};

const theme = createTheme(themeOptions);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <TokenProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <BrowserRouter>
                <Switch>
                    <Route path="/home" render={() => <HomeLayout />} />
                    <Redirect from="/" to="/home" />
                </Switch>
            </BrowserRouter>
        </TokenProvider>
    </ThemeProvider>,
    document.querySelector('#root')
);
