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
    EditText,
    Label,
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

import { LinkItem, links } from "state/slices";

import { ItemsContainer } from "../../ItemsContainer";

import { useDispatch } from "react-redux";

import { ItemContainer } from "../../ItemContainer";



const initialLinks = links.getInitialState();

const LinksListItem: React.FC<LinkItem> = props => {

    const dispatch = useDispatch();

    return (
        <ListItemContent
        removeable>
            <ItemContainer>
                <AccordionItem
                title={props.label || "(Not specified)"}
                value={props.id}>
                    <Stack
                    fullX
                    css={{
                        gap: "$6"
                    }}>
                        <Label
                        block
                        name="Label"
                        orientation="vertical">
                            <TextField
                            size="lg"
                            value={props.label}
                            onValueChange={value => dispatch(links.actions.updateItem([
                                props.id,
                                { label: value }
                            ]))}/>
                        </Label>

                        <Label
                        block
                        name="Link"
                        orientation="vertical">
                            <TextField
                            size="lg"
                            value={props.url}
                            onValueChange={value => dispatch(links.actions.updateItem([
                                props.id,
                                { url: value }
                            ]))}/>
                        </Label>
                    </Stack>
                </AccordionItem>
            </ItemContainer>
        </ListItemContent>
    )
}

const LinksList: React.FC = () => {

    const dispatch = useAppDispatch();

    const items = useAppSelector(store => store.links.items);
    
    return (
        <ItemsContainer
        items={items}>
            <List 
            space="$6"
            value={items}
            onValueChange={value => dispatch(links.actions.changeItems(value))}>
                {item => <LinksListItem key={item.id} {...item}/>}
            </List>
        </ItemsContainer>
    )
}

const LinksHead: React.FC = () => {

    const dispatch = useAppDispatch();

    const sectionTitle = useAppSelector(store => store.links.sectionTitle);

    return (
        <SubTitle
        css={{
            marginBottom: "$8"
        }}>
            <EditText
            leftSlot={<ListItemDragHandler/>}
            resetable={initialLinks.sectionTitle}
            value={sectionTitle}
            onValueChange={value => dispatch(links.actions.setSectionTitle(value))}/>
        </SubTitle>
    );
}

export const Links: React.FC = () => {

    const dispatch = useAppDispatch();

    return (
        <Box
        css={{
            backgroundColor: "$inverted",
            position: "relative"
        }}>
            <LinksHead/>

            <Text
            css={{
                marginBottom: "$6"
            }}>
                You can add links to websites that you want HR managers to see! You may want to add a link to your portfolio, LinkedIn profile or personal website.
            </Text>

            <LinksList/>

            <Button
            block
            size="lg"
            align="start"
            variant="ghost"
            onClick={() => dispatch(links.actions.addItem())}
            StartIcon={PlusIcon}>
                Add link
            </Button>
        </Box>
    );
}