import { Theme } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';

const componentStyles: Styles<Theme, any, 'mainContent' | 'containerRoot'> = (
    theme: Theme
) => {
    return {
        mainContent: {
            [theme.breakpoints.up('md')]: {
                marginLeft: '250px'
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
