import * as PrimitiveSwitch from "@radix-ui/react-switch";

import { VariantProps } from "@stitches/react";

import { colorStyles } from "helpers";

import { round } from "mixins";

import { stitches } from "stitches";

import { CSSProps } from "types";

import { ElementRef, forwardRef } from "react";



const StyledThumb = stitches.styled(PrimitiveSwitch.Thumb, {
    display: "block",
    borderRadius: "inherit"
});

StyledThumb.displayName = "StyledSwitchThumb";

const StyledRoot = stitches.styled(PrimitiveSwitch.Root, round, {
    padding: "$0_5",
    transition: "$200",
    transitionProperty: "color",
    [`& ${StyledThumb}`]: {
        size: "$$switchSize",
        marginRight: "$$switchSize",
        transition: "inherit",
        transitionProperty: "transform",
        stateToggled: {
            transformTranslateX: "$full",
        }
    },
    variants: {
        size: {
            sm: {
                [`& ${StyledThumb}`]: {
                    $$switchSize: "$size$3_5",
                }
            },
            md: {
                [`& ${StyledThumb}`]: {
                    $$switchSize: "$size$4",
                }
            },
            lg: {
                [`& ${StyledThumb}`]: {
                    $$switchSize: "$size$4_5",
                }
            }
        },
        color: {
            primary: {},
            secondary: {},
            neutral: {},
            action: {},
            success: {},
            warning: {},
            danger: {}
        },
        variant: {
            filled: {
                stateDisabled: {
                    [`& ${StyledThumb}`]: {
                        backgroundColor: "$inverted"
                    },
                    backgroundColor: "$washed8"
                }
            },
            inverted: {
                [`& ${StyledThumb}`]: {
                    backgroundColor: "$inverted"
                },
                stateDisabled: {
                    backgroundColor: "$washed12",
                    opacity: "$50"
                },
                stateUndisabled: {
                    focus: {
                        outlineStyle: "solid",
                        outlineWidth: "$2",
                        outlineColor: "$neutral12"
                    },
                    hover: {
                        opacity: "$90"
                    },
                    active: {
                        opacity: "$90"
                    },
                    stateUntoggled: {
                        backgroundColor: "$neutralA8",
                    },
                    stateToggled: {
                        backgroundColor: "$neutralA11",
                    }
                }
            }
        }
    },
    defaultVariants: {
        size: "md",
        color: "primary",
        variant: "filled"
    },
    compoundVariants: colorStyles({
        variant: "filled",
        styles: (getColor, colorName) => ({
            [`& ${StyledThumb}`]: {
                backgroundColor: getColor("1")
            },
            focus: {
                outlineStyle: "solid",
                outlineWidth: "$2",
                outlineColor: colorName === "neutral" ? "$primary8" : "$neutral12"
            },
            stateUndisabled: {
                stateUntoggled: {
                    backgroundColor: colorName === "neutral" ? getColor("8") : getColor("7"),
                    hover: {
                        opacity: "$85"
                    },
                    active: {
                        opacity: "$85"
                    }
                },
                stateToggled: {
                    backgroundColor: colorName === "neutral" ? getColor("12") : getColor("10"),
                    hover: {
                        backgroundColor: colorName === "neutral" ? getColor("12") : getColor("9"),
                        opacity: colorName === "neutral" ? "$90" : "1"
                    },
                    active: {
                        backgroundColor: colorName === "neutral" ? getColor("12") : getColor("9"),
                        opacity: colorName === "neutral" ? "$90" : "1"
                    }
                }
            }
        })
    })
});

StyledRoot.displayName = "StyledSwitchRoot";

export type SwithProps = Omit<PrimitiveSwitch.SwitchProps, "asChild"> & VariantProps<typeof StyledRoot> & CSSProps;

export const Switch = forwardRef<ElementRef<typeof PrimitiveSwitch.Root>, SwithProps>((props, ref) => {
    
    const { 
        css,
        size,
        color,
        variant,
        ...htmlProps
    } = props;

    const variantProps = {
        size,
        color,
        variant,
    }

    return (
        <StyledRoot
        ref={ref}
        {...htmlProps}
        {...variantProps}>
            <StyledThumb/>
        </StyledRoot>
    );
});

Switch.displayName = "Switch";

Switch.toString = () => StyledRoot.selector;