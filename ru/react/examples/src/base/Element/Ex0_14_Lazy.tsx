import React from 'react';

const OtherComponent = React.lazy(() => import('./Ex0_14_OtherComponent'))

export function Lazy() {
    return(
        <div>
            <OtherComponent />
        </div>
    )
}