import Container from '@material-ui/core/Container';
import React from 'react';

function HomeContainer({ children }: { children: any }) {
    return (
        <Container maxWidth="xl" style={{ paddingTop: 24 }}>
            {children}
        </Container>
    );
}

export default HomeContainer;
