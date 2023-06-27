import {
    AppProvider,
    IndexTable,
    LegacyCard,
    useIndexResourceState,
    Text,
    Badge,
    Button
} from '@shopify/polaris';

import React from 'react';

function SimpleIndexTableExample({todos}) {

    const resourceName = {
        singular: 'todo',
        plural: 'todos',
    };

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
        useIndexResourceState(todos);

    const rowMarkup = todos.map(
        (todo, index) => (
            <IndexTable.Row
                id={todo.id}
                key={todo.id}
                selected={selectedResources.includes(todo.id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {todo.name}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{todo.price}</IndexTable.Cell>
                <IndexTable.Cell>{todo.description}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Badge>test</Badge>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Button destructive>Delete theme</Button>
                </IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    return (
        <AppProvider>
            <LegacyCard>
                <IndexTable
                    resourceName={resourceName}
                    itemCount={todos.length}
                    selectedItemsCount={
                        allResourcesSelected ? 'All' : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        {title: 'Name'},
                        {title: 'Price'},
                        {title: 'Description'},
                        {title: 'Status'}
                    ]}
                >
                    {rowMarkup}
                </IndexTable>
            </LegacyCard>
        </AppProvider>
    );
}

export default SimpleIndexTableExample;