import React from "react";

import { OrderableProps, useResumeTemplateContext} from "./shared";

import { View } from "@react-pdf/renderer";

import { itemsContainers } from "./itemsContainers";

import { HobbiesWrapper } from "./HobbiesWrapper";

export const Orderable: React.FC<OrderableProps> = ({ sections, sectionStyle, containerStyle }) => {

    const { state } = useResumeTemplateContext();

    const sectionOrder = state["section-order"].items;

    if (!sections) {

        sections = sectionOrder;
    }

    const sectionsToRender = sections.filter(section => sectionOrder.includes(section));

    return (
        <>
            {sectionsToRender.length &&
            <View style={containerStyle}>
                {sectionsToRender.map((section, index) => {

                    if (typeof sectionStyle === "function") {

                        sectionStyle = sectionStyle(index);
                    }

                    if (section === "hobbies") {

                        return (
                            <View style={sectionStyle}>
                                <HobbiesWrapper/>
                            </View>
                        );
                    }

                    const ItemsContainerWrapper = itemsContainers[section];

                    return (
                        <View style={sectionStyle}>
                            <ItemsContainerWrapper/>
                        </View>
                    );
                })}
            </View>}
        </>
    );
}