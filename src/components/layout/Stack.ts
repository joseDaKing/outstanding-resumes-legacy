import { stitches } from "stitches";

import { Box } from "./Box";



export const Stack = stitches.styled(Box, {
    display: "flex",
    "& > *": {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: "auto"
    },
    variants: {
        reverse: {
            true: {}
        },
        orientation: {
            horizontal: {
                flexDirection: "row"
            },
            vertical: {
                flexDirection: "column"
            }
        },
        alignMain: {
            start: {
                justifyContent: "flex-start"
            },
            center: {
                justifyContent: "center"
            },
            end: {
                justifyContent: "end"
            },
        },
        alignCross: {
            start: {
                alignItems: "flex-start"
            },
            center: {
                alignItems: "center"
            },
            end: {
                alignItems: "flex-end"
            },
        },
        wrap: {
            true: {
                flexWrap: "wrap"
            }
        }
    },
    compoundVariants: [
        {
            orientation: "horizontal",
            reverse: true,
            css: {
                flexDirection: "row-reverse"
            }
        },
        {
            orientation: "vertical",
            reverse: true,
            css: {
                flexDirection: "column-reverse"
            }
        }
    ],
    defaultVariants: {
        orientation: "horizontal",
        alignMain: "center",
        alignCross: "center"
    }
});

Stack.displayName = "Stack";