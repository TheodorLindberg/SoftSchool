import { Theme } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';

const componentStyles: Styles<
    Theme,
    any,
    | 'listItemRoot'
    | 'copyrightWrapper'
    | 'copyrightLink'
    | 'justifyContentCenter'
    | 'flexDirectionColumn'
> = (theme: Theme) => {
    return {
        listItemRoot: {
            width: 'auto',
            color: theme.palette.primary.light,
            fontSize: '.875rem'
        },
        copyrightWrapper: {
            color: theme.palette.primary.light,
            fontSize: '.875rem',
            textAlign: 'center',
            [theme.breakpoints.up('md')]: {
                textAlign: 'left'
            }
        },
        copyrightLink: {
            fontWeight: 600,
            marginLeft: '.25rem',
            color: theme.palette.primary.main,
            backgroundColor: 'initial',
            textDecoration: 'none',
            '&:hover': {
                color: theme.palette.primary.dark
            }
        },
        justifyContentCenter: {
            [theme.breakpoints.down('lg')]: {
                justifyContent: 'center!important'
            }
        },
        flexDirectionColumn: {
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column!important'
            }
        }
    };
};

export default componentStyles;
