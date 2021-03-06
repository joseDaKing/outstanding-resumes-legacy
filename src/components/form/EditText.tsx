import { useValue, UseValueProps } from "helpers";

import { decode } from "html-entities";

import React, { forwardRef, useEffect, useRef } from "react";

import mergeRefs from "react-merge-refs";

import { stitches } from "stitches";

import { CSSProps } from "types";

import { IconButton } from "./IconButton";

import { Pencil1Icon, ResetIcon } from "@radix-ui/react-icons";

import { VariantProps } from "@stitches/react";

import { useIsDragging } from "../layout";



const EditTextInputIconContainer = stitches.styled("span", {
    position: "absolute",
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    width: 0,
    gap: "$1",
    variants: {
        side: {
            left: {
                left: 0,
                flexDirection: "row-reverse"
            },
            right: {
                right: 0,
            }
        }
    }
});

EditTextInputIconContainer.displayName = "EditTextInputIconContainer";

const EditTextContainer = stitches.styled("span", {
    all: "inherit",
    display: "inline-block",
    position: "relative",
    [`& ${EditTextInputIconContainer}`]: {
        opacity: 0
    },
    [`&:hover ${EditTextInputIconContainer}, &:focus-within ${EditTextInputIconContainer}`]: {
        opacity: 1
    },
    borderBottomWidth: "$2",
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    transition: "$200",
    transitionProperty: "color",
    padding: 0,
    margin: 0,
    variants: {
        color: {
            primary: {
                [`&:focus-within`]: {
                    borderBottomColor: "$primary9"
                }
            },
            secondary: {
                [`&:focus-within`]: {
                    borderBottomColor: "$secondary9"
                }
            },
            neutral: {
                [`&:focus-within`]: {
                    borderBottomColor: "$neutral9"
                }
            },
            action: {
                [`&:focus-within`]: {
                    borderBottomColor: "$action9"
                }
            },
            success: {
                [`&:focus-within`]: {
                    borderBottomColor: "$success9"
                }
            },
            warning: {
                [`&:focus-within`]: {
                    borderBottomColor: "$warning9"
                }
            },
            danger: {
                [`&:focus-within`]: {
                    borderBottomColor: "$danger9"
                }
            }
        }
    },
    defaultVariants: {
        color: "primary"
    }
});

EditTextContainer.displayName = "EditTextContainer";

const EditTextInput = stitches.styled("input", {
    all: "inherit",
    display: "inline-block",
});

EditTextInput.displayName = "EditTextInput";

const EditTextMeasureContainer = stitches.styled("span", {
    all: "inherit",
    width: 0,
    height: 0,
    display: "inline-block",
    overflow: "hidden",
    borderStyle: "none"
});

EditTextMeasureContainer.displayName = "EditTextMeasureContainer";

const EditTextMeasure = stitches.styled("span", {
    all: "inherit",
    display: "inline-block",
    size: "auto"
});

EditTextMeasure.displayName = "EditTextMeasure";

const EditTextInputContainer = stitches.styled("span", {
    all: "inherit",
    position: "relative",
    borderStyle: "none"
});

EditTextInputContainer.displayName = "EditTextInputContainer";



type EditTextProps = (
    UseValueProps<string> 
    & CSSProps 
    & Omit<
        JSX.IntrinsicElements["input"],
        "value"
        | "ref"
        | "defaultValue"
        | "onChange"
        | "color"
    >
    & VariantProps<typeof EditTextContainer>
    & {
        leftSlot?: React.ReactNode; 
        rightSlot?: React.ReactNode;
        resetable?: string;
    }
);

export const EditText = forwardRef<HTMLInputElement, EditTextProps>((props, ref) => {

    const {
        css,
        value,
        resetable,
        defaultValue,
        onValueChange,
        leftSlot,
        rightSlot,
        ...htmlProps
    } = props;

    const [ state, setState ] = useValue({
        initialValue: "",
        value,
        defaultValue,
        onValueChange
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        setState(event.currentTarget.value);
    }

    const measureRef = useRef<HTMLSpanElement|null>(null);

    const inputRef = useRef<HTMLInputElement|null>(null);

    useEffect(() => {

        if (!inputRef.current || !measureRef.current) {

            return;
        }

        inputRef.current.style.width = `${measureRef.current.clientWidth}px`;

    }, [state]);

    const onEditHandler = () => {

        if (!inputRef.current) {

            return;
        }

        inputRef.current.focus();
    }

    const editButtonRef = useRef<HTMLButtonElement|null>(null);

    const onResetHandler = () => {

        editButtonRef.current?.focus();

        if (resetable) {

            setState(resetable);
        }
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key === "Enter" || event.key === "Escape") {

            console.log(event.currentTarget.tabIndex)

            event.currentTarget.blur();
        }
    }

    const isDragging = useIsDragging();

    return (
        <EditTextContainer 
        css={{
            ...css,
            [`& ${EditTextInputIconContainer}`]: {
                opacity: isDragging ? "1 !important" : undefined
            },
        }}>
            <EditTextInputContainer>
                {!props.disabled && leftSlot &&
                <EditTextInputIconContainer
                side="left">
                    <div/>
                    {leftSlot}
                </EditTextInputIconContainer>}

                {/* @ts-ignore */}
                <EditTextInput
                {...htmlProps}
                ref={mergeRefs([
                    inputRef,
                    ref
                ])}
                value={state}
                onKeyDown={onKeyDownHandler}
                onChange={onChangeHandler}/>

                {!props.disabled &&
                <EditTextInputIconContainer
                side="right">

                    <div/>

                    <IconButton
                    ref={editButtonRef}
                    color={props.color}
                    round
                    variant="text"
                    Icon={Pencil1Icon}
                    onClick={onEditHandler}/>

                    {resetable && resetable !== state &&
                    <IconButton
                    color={props.color}
                    round
                    variant="text"
                    Icon={ResetIcon}
                    onClick={onResetHandler}/>}

                    {rightSlot}
                </EditTextInputIconContainer>}
            </EditTextInputContainer>
            
            <EditTextMeasureContainer aria-hidden>
                <EditTextMeasure 
                ref={measureRef}>
                    {decode(state.replaceAll(" ", "&nbsp;"))}
                </EditTextMeasure>
            </EditTextMeasureContainer>
        </EditTextContainer>
    );
});

EditText.displayName = "EditText";

EditText.toString = () => EditTextContainer.selector;