'use client'
import {Theme,ThemeProvider} from '@mui/material';
import {muiTheme} from "@/theme/theme";
import {CssBaseline} from "@mui/material";

const theme:Theme = muiTheme;

export function ClientThemeProvider({children}: {children: React.ReactNode}) {

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
}
