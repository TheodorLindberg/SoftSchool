import { makeStyles } from '@material-ui/core/styles';
import componentStyles from 'assets/theme/components/home/home-footer';
import React from 'react';

const useStyles = makeStyles(componentStyles);
function HomeHeader() {
    const classes = useStyles({});
    return <div></div>;
}

export default HomeHeader;
