import { Theme } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';

const componentStyles: Styles<Theme, any, 'class'> = (theme: Theme) => {
    return {
        class: {
            marginTop: '2rem',
            height: '100%'
        }
    };
};

export default componentStyles;
