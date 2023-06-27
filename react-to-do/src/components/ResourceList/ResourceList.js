import {
    LegacyCard,
    ResourceList,
    ResourceItem,
    Text,
    Badge,
    Button
} from '@shopify/polaris';
import {useState} from 'react';
import HorizontalGridWithVaryingGapExample from "../LayoutGrid/LayoutGrid";

function ResourceListWithSelectionExample({todos}) {
    const [selectedItems, setSelectedItems] = useState([]);

    const resourceName = {
        singular: 'todo',
        plural: 'todos',
    };

    return (
        <LegacyCard>
            <ResourceList
                resourceName={resourceName}
                items={todos}
                renderItem={renderItem}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                selectable
            />
        </LegacyCard>
    );

    function renderItem(item: typeof items[number]) {
        const {id, name} = item;

        return (
            <ResourceItem id={id}>
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {name}
                </Text>
            </ResourceItem>
        );
    }
}

export default ResourceListWithSelectionExample;