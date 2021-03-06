import React from "react";

import { RootState } from "state";

import { mergeText } from "helpers";

import { 
    View, 
    Image
}
from "@react-pdf/renderer";

import { 
    Display, 
    Title, 
    Text,
    Link
}
from "../components";



export const Header: React.FC<RootState["contactInformation"]> = state => {
    
    const space = (
        <View
        style={{
            marginTop: "2pt"
        }}/>
    );

    return (
        <>
            {(
                !!state.firstName
                || !!state.lastName
                || !!state.address
                || !!state.zipCode
                || !!state.city
                || !!state.country
                || !!state.jobTitle
                || !!state.email
                || !!state.mobileNumber
            ) &&
            <View
            wrap={false}
            style={{
                position: "relative",
                left: "-48pt",
                top: "-48pt",
                width: "100vw",
                height: "15vh",
                backgroundColor: "#f9ee54",
            }}>
                <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "stretch",
                    overflow: "hidden"
                }}>
                    {!!state.imageUrl
                    &&
                    <View
                    style={{
                        display: "flex",
                        width: "25vw",
                        height: "100%",
                        overflow: "hidden"
                    }}>
                        <Image
                        style={{
                            flexGrow: 1,
                            flexShrink: 0,
                            objectFit: "cover",
                            objectPosition: "center"
                        }}
                        src={state.imageUrl}/>
                    </View>}

                    <View
                    style={{
                        width: !!state.imageUrl ? "75vw" : undefined,
                        display: "flex",
                        flexDirection: "row",
                        paddingVertical: "34pt",
                        paddingHorizontal: "48pt",
                        paddingLeft: !!state.imageUrl ? "16pt" : undefined,
                    }}>
                        {(
                            !!state.firstName
                            || !!state.lastName
                        ) && 
                        <View>
                            {!!state.firstName && 
                            <Display>
                                {state.firstName.toUpperCase()}
                            </Display>}
                            
                            {!!state.lastName && 
                            <Display>
                                {state.lastName.toUpperCase()}
                            </Display>}
                        </View>}

                        {(
                            !!state.address
                            || !!state.zipCode
                            || !!state.city
                            || !!state.country
                            || !!state.jobTitle
                            || !!state.email
                            || !!state.mobileNumber
                        ) &&
                        <>
                            <View
                            style={{
                                width: "80pt"
                            }}/>
                            
                            <View>
                                {!!state.jobTitle &&
                                <Title>
                                    {state.jobTitle}
                                </Title>}

                                {(
                                    !!state.address
                                    || !!state.zipCode
                                    || !!state.city
                                    || !!state.country
                                ) &&
                                <>
                                    {space}
                                    <View>
                                        <Text>
                                            {!!state.imageUrl ? 
                                                mergeText(
                                                    ", ",
                                                    state.address,
                                                    state.zipCode,
                                                )
                                            : 
                                                mergeText(
                                                    ", ",
                                                    state.address,
                                                    state.zipCode,
                                                    state.city,
                                                    state.country
                                                )}
                                        </Text>
                                        
                                        {space}

                                        {!!state.imageUrl &&
                                        <Text>
                                            {mergeText(
                                                ", ",
                                                state.city,
                                                state.country
                                            )}
                                        </Text>}
                                    </View>
                                </>}

                                {!!state.email &&
                                <>
                                    {space}
                                    <Link
                                    url={`mailto:${state.email}`}>
                                        {state.email}
                                    </Link>
                                </>}

                                {!!state.mobileNumber &&
                                <>
                                    {space}
                                    <Text>
                                        {state.mobileNumber}
                                    </Text>
                                </>}
                            </View>
                        </>}
                    </View>
                </View>
            </View>}
        </>
    );
}