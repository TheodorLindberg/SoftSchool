import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

//import theme from 'assets/theme/theme';

import HomeLayout from 'layouts/HomeLayout';
import 'moment/locale/sv';

const theme = createTheme({});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BrowserRouter>
            <Switch>
                <Route path="/home" render={() => <HomeLayout />} />
                <Redirect from="/" to="/home" />
            </Switch>
        </BrowserRouter>
    </ThemeProvider>,
    document.querySelector('#root')
);
