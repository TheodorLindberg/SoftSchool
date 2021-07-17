import { Theme } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';

const componentStyles: Styles<Theme, any, 'containerRoot'> = (theme: Theme) => {
    return {
        containerRoot: {
            [theme.breakpoints.up('md')]: {
                paddingLeft: '39px',
                paddingRight: '39px'
            }
        }
    };
};

export default componentStyles;
