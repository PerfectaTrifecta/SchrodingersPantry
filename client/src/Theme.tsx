import createTheme from "@mui/material/styles/createTheme";
import blue  from "@mui/material/colors/blue";
import lightBlue from "@mui/material/colors/lightBlue";
import green from "@mui/material/colors/green";
import red from "@mui/material/colors/red";
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
        },
        secondary: {
            main: blue[500]
        }
    }
}

const dark = {
    palette: {
        primary: {
            main: blue[500]
        },
        secondary: {
            main: blue[600]
        }
    }
}

const veggie = {
    palette: {
        primary: {
            main: green[400]
        },
        secondary: {
            main: green[600]
        }
    }
}

const meat = {
    palette: {
        primary: {
            main: red[200]
        },
        secondary: {
            main: red[500]
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