import { RootState } from "state";

import { 
    Document,
    Page,
    View
}
from "@react-pdf/renderer";

import { 
    Header, 
    ContactInformation,
    ProfessionalExperience,
    SortableSections
}
from "./sections";



export const MadridCVTemplate: React.FC<RootState> = state => {

    return (
        <Document>
            <Page
            style={{
                padding: "48pt"
            }}> 
                <Header
                {...state.contactInformation}/>

                <View
                style={{
                    top: "-48pt",
                }}>
                    <ContactInformation
                    {...state.contactInformation}/>

                    <ProfessionalExperience
                    {...state.professionalExperience}/>

                    <View>
                        {state.sections.items.map(section => (
                            <SortableSections
                            section={section}
                            state={state}/>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
}