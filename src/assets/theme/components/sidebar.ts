import { makeStyles, Theme } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';

const componentStyles: Styles<
    Theme,
    any,
    | 'listRoot'
    | 'listItemRoot'
    | 'drawer'
    | 'listItemSelected'
    | 'text'
    | 'logoLinkClasses'
    | 'menuPaper'
    | 'outlineNone'
    | 'navLogoLinkClass'
    | 'popupListRoot'
> = (theme: Theme) => {
    return {
        listRoot: {
            marginTop: '2rem',
            height: '100%'
        },
        popupListRoot: {
            height: '100%'
        },
        listItemRoot: {
            display: 'flex',
            fontSize: '.9rem',
            color: theme.palette.primary.light,
            padding: '.65rem 1.5rem !important',
            '&:hover': {
                color: theme.palette.primary.main
            }
        },
        drawer: {
            width: '250px',
            paddingTop: '1rem',
            paddingBottom: '1rem'
        },
        logoLinkClasses: {
            fontSize: '1.25rem',
            lineHeight: 'inherit',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            display: 'block',
            textAlign: 'center'
        },
        navLogoLinkClass: {
            fontSize: '1.25rem',
            color: theme.palette.primary.contrastText,
            textDecoration: 'none',
            display: 'block',
            textAlign: 'center'
        },
        listItemSelected: {
            color: theme.palette.primary.dark,
            '&$listItemRoot,&$listItemRoot:hover': {
                backgroundColor: 'unset'
            },
            '&:before': {
                top: '.25rem',
                bottom: '.25rem',
                left: 0,
                right: 'auto',
                borderLeft: '2px solid ' + theme.palette.secondary.main,
                borderBottom: 0,
                content: '""',
                position: 'absolute'
            }
        },
        text: {
            color: theme.palette.primary.main
        },
        menuPaper: {
            width: 'calc(100% - 2rem)'
        },
        outlineNone: {
            outline: 'none!important'
        }
    };
};

export default componentStyles;
