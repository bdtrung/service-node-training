import React from 'react';
import {HorizontalGrid} from '@shopify/polaris';


function HorizontalGridWithVaryingGapExample() {
    return (
        <SpacingBackground>
            <HorizontalGrid gap="0" columns={3}>
                <Placeholder height="70px" />
                <Placeholder height="70px" />
                <Placeholder height="70px" />
            </HorizontalGrid>
        </SpacingBackground>
    );
}

const SpacingBackground = ({
                               children,
                               width = '100%',
                           }: {
    children: React.ReactNode;
    width?: string;
}) => {
    return (
        <div
            style={{
                background: 'var(--p-color-bg-success-subdued)',
                width,
                height: 'auto',
            }}
        >
            {children}
        </div>
    );
};

const Placeholder = ({height = 'auto', width = 'auto'}) => {
    return (
        <div
            style={{
                display: 'inherit',
                background: 'var(--p-color-text-info)',
                height: height ?? undefined,
                width: width ?? undefined,
            }}
        />
    );
};


export default HorizontalGridWithVaryingGapExample;