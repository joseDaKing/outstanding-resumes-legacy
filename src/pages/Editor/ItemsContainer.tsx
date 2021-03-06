import { Box, useIsDragging } from "components/layout";



type ItemsContainerProps = {
    items: any[];
}

export const ItemsContainer: React.FC<ItemsContainerProps> = props => {    

    const isDragging = useIsDragging();

    let marginBottom = "$6";

    let overflow = "initial";

    let height = "initial";

    let maskMode = "initial";

    let maskImage = "initial";

    if (isDragging) {

        overflow = "hidden";

        marginBottom = "initial";

        maskMode = "alpha";

        maskImage = "linear-gradient(black, transparent)";

        if (props.items.length !== 0) {

            height = "$16";
        }
    }

    return (
        <Box
        css={{
            marginBottom,
            overflow,
            height,
            maskMode,
            maskImage
        }}>
            {props.children}
        </Box>
    );
}