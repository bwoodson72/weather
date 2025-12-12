import {createTheme} from '@mui/material/styles';

export const muiTheme = createTheme(
    {
        palette: {

            primary: {
                main: '#3f51b5',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#bbbcd0',
                paper: '#9c9daf',

            },
            text:{
                primary:'#c0c7f6',
                secondary:'#ffffff',

            }
        },
        shape:{
            borderRadius: 10,
        }
    }
);

