import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons components
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import EventNote from '@material-ui/icons/EventNote';
import LiveHelp from '@material-ui/icons/LiveHelp';
import Person from '@material-ui/icons/Person';
import Settings from '@material-ui/icons/Settings';

import componentStyles from 'assets/theme/components/home/home-navbar-dropdown';

const useStyles = makeStyles(componentStyles);
import avatar from 'assets/img/theme/avatar.jpeg'; // with import

function HomeNavbarDropdown() {
    const classes = useStyles({});
    const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
        null
    );

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget as HTMLAnchorElement);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    width="1.25rem!important"
                    height="1.25rem!important"
                    color="secondary!important"
                    marginRight="1rem"
                >
                    <Person color="primary" />
                </Box>
                <span>Profil</span>
            </Box>
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    width="1.25rem!important"
                    height="1.25rem!important"
                    color="secondary!important"
                    marginRight="1rem"
                >
                    <Settings color="primary" />
                </Box>
                <span>Inställningar</span>
            </Box>
            <Divider component="div" classes={{ root: classes.dividerRoot }} />
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    width="1.25rem!important"
                    height="1.25rem!important"
                    color="secondary!important"
                    marginRight="1rem"
                >
                    <DirectionsRun color="secondary" />
                </Box>
                <span>Logga ut</span>
            </Box>
        </Menu>
    );

    return (
        <>
            <Button
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                classes={{
                    label: classes.buttonLabel,
                    root: classes.buttonRoot
                }}
            >
                <Avatar
                    alt="..."
                    src={avatar}
                    classes={{
                        root: classes.avatarRoot
                    }}
                />
                <Hidden smDown>Jessica Jones</Hidden>
            </Button>
            {renderMenu}
        </>
    );
}

export default HomeNavbarDropdown;
