import { createTheme } from "@mui/material/styles";
import { blue, lightBlue, green, red } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material";


declare module "@mui/material/styles" {

    interface ThemeOptions {
        palette?: PaletteOptions
    }

}

const light = {
    palette: {
        primary: {
            main: blue[100]
        }
    }
}

const dark = {
    palette: {
        primary: {
            main: blue[500]
        }
    }
}

const veggie = {
    palette: {
        primary: {
            main: green[400]
        }
    }
}

const meat = {
    palette: {
        primary: {
            main: red[200]
        }
    }
}

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: purple[500]
//         }
//     }
// });

export { light, dark, veggie, meat };