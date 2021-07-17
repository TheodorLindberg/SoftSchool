import { Theme } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';

const componentStyles: Styles<
    Theme,
    any,
    'appBarRoot' | 'brandTitle' | 'containerRoot'
> = (theme: Theme) => {
    return {
        appBarRoot: {
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        },
        brandTitle: {
            textTransform: 'uppercase',
            margin: '0',
            color: theme.palette.primary.main,
            [theme.breakpoints.down('md')]: {
                display: 'none'
            }
        },
        containerRoot: {
            [theme.breakpoints.up('md')]: {
                paddingLeft: '39px',
                paddingRight: '39px'
            }
        }
    };
};

export default componentStyles;
