import { 
    Box, 
    List, 
    Stack,
    ListItemContent,
    AccordionItem,
    ListItemDragHandler
} 
from "components/layout";

import {  
    Button,
    DatePickerRange,
    EditText,
    Label,
    TextArea,
    TextField
} 
from "components/form";

import {
    Text,
    SubTitle
}
from "components/typography";

import { PlusIcon } from "@radix-ui/react-icons";

import {
    useAppDispatch,
    useAppSelector
} 
from "state";

import { education, EducationItem } from "state/slices";

import { ItemsContainer } from "../../ItemsContainer";

import { ItemContainer } from "../../ItemContainer";



const initialEducation = education.getInitialState();

const EducationListItem: React.FC<EducationItem> = props => {
    
    const dispatch = useAppDispatch();
    
    let title = "(Not specified)";

    if (props.school && props.exam) {

        title = `${props.school}, ${props.exam}`;
    }
    else if (props.school) {

        title = props.school;
    }
    else if (props.exam) {

        title = props.exam;
    }

    return (
        <ListItemContent
        removeable>
            <ItemContainer>
                <AccordionItem
                title={title}
                value={props.id}>
                    <Box 
                    css={{
                        spaceY: "$6"
                    }}>
                        <Stack
                        fullX
                        css={{
                            gap: "$6"
                        }}>
                            <Label
                            block
                            name="Exam"
                            orientation="vertical">
                                <TextField
                                size="lg"
                                value={props.exam}
                                onValueChange={value => dispatch(education.actions.updateItem([
                                    props.id,
                                    { exam: value }
                                ]))}/>
                            </Label>
                            
                            <Label
                            block
                            name="School"
                            orientation="vertical">
                                <TextField
                                size="lg"
                                value={props.school}
                                onValueChange={value => dispatch(education.actions.updateItem([
                                    props.id,
                                    { school: value }
                                ]))}/>
                            </Label>
                        </Stack>

                        <Stack
                        fullX
                        css={{
                            gap: "$6"
                        }}>
                            <Label
                            block
                            name="Date"
                            orientation="vertical">
                                <DatePickerRange
                                size="lg"
                                value={props.date}
                                onValueChange={value => dispatch(education.actions.updateItem([
                                    props.id,
                                    { date: value }
                                ]))}/>
                            </Label>

                            <Label
                            block
                            name="City"
                            orientation="vertical">
                                <TextField
                                size="lg"
                                value={props.city}
                                onValueChange={value => dispatch(education.actions.updateItem([
                                    props.id,
                                    { city: value }
                                ]))}/>
                            </Label>
                        </Stack>

                        <Label
                        block
                        name="Description"
                        orientation="vertical">
                            <TextArea
                            size="lg"
                            value={props.description}
                            onValueChange={value => dispatch(education.actions.updateItem([
                                props.id,
                                { description: value }
                            ]))}/>
                        </Label>
                    </Box>
                </AccordionItem>
            </ItemContainer>
        </ListItemContent>
    );
}

const EducationList: React.FC = () => {
    
    const dispatch = useAppDispatch();

    const items = useAppSelector(store => store.education.items);

    return (
        <ItemsContainer
        items={items}>
            <List
            space="$6"
            value={items}
            onValueChange={items => dispatch(education.actions.changeItems(items))}>
                {item => <EducationListItem key={item.id} {...item}/>}
            </List>
        </ItemsContainer>
    );
}

const EducationHead: React.FC = () => {

    const dispatch = useAppDispatch();

    const sectionTitle = useAppSelector(store => store.education.sectionTitle);

    return (
        <SubTitle
        css={{
            marginBottom: "$8"
        }}>
            <EditText
            leftSlot={<ListItemDragHandler/>}
            resetable={initialEducation.sectionTitle}
            value={sectionTitle}
            onValueChange={value => dispatch(education.actions.setSectionTitle(value))}/>
        </SubTitle>
    );
}

export const Education: React.FC = () => {

    const dispatch = useAppDispatch();
    
    return (
        <Box
        css={{
            backgroundColor: "$inverted",
            position: "relative"
        }}>
            <EducationHead/>

            <Text
            css={{
                marginBottom: "$6"
            }}>
                If relevant, add your latest educational results and dates here
            </Text>

            <EducationList/>
            
            <Button
            block
            size="lg"
            align="start"
            variant="ghost"
            onClick={() => dispatch(education.actions.addItem())}
            StartIcon={PlusIcon}>
                Add education
            </Button>
        </Box>
    );
}