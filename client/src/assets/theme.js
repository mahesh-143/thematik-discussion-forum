import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles : {
        global : {
            body: {
                bg : 'neutral.100',
            }
        }
    },
    colors : {
        brand : {
            100  : "#49A078",
        },
        neutral : {
            100 : "#F9F9F9",
        }
    },
    fonts: {
        body: `'roboto', sans-serif`,
      },

    components : {
        Heading : {
            baseStyle : {
                fontFamily : 'Playfair Display'
            }
        }
    }

})


