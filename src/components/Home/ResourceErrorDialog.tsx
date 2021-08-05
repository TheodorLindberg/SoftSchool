import React from 'react';
import ErrorDialog from './ErrorDialog';

function ResourceErrorDialog({
    resourceName,
    retry
}: {
    resourceName: string;
    retry: () => void;
}) {
    return (
        <ErrorDialog
            title={`Kunde inte hämta ${resourceName}`}
            content={`Kom tillbaka senare och försök igen`}
            retry={retry}
        />
    );
}

export default ResourceErrorDialog;
