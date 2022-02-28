import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {

    interface ThemeOptions {
        palette?: PaletteOptions
    }

}

const theme = createTheme({
    palette: {
        primary: {
            main: purple[500]
        }
    }
});

export default theme;