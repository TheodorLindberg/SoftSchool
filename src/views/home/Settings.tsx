import { Typography } from '@material-ui/core';
import { selectConfig } from 'api/configSlice';
import HomeContainer from 'components/Home/HomeContainer';
import React from 'react';
import { useAppSelector } from 'store';

function Settings() {
    const config = useAppSelector(selectConfig);

    return (
        <HomeContainer>
            <Typography>
                SoftSchool använder en configurationsfil för att spara dina
                inställningar, exempelvis meddelanden du gömt och senaste
                inloggning för att möjliggöra notifieringarna
            </Typography>
            <p>
                Här kan du se din konfigurationsfil som sparas lokalt på
                SoftSchools server, all annan data som visas på den här hemsidan
                hämtas direkt från SchoolSoft genom "web scraping"
            </p>
            <code style={{ whiteSpace: 'pre' }}>
                {JSON.stringify(config, null, 4)}
            </code>
        </HomeContainer>
    );
}

export default Settings;
