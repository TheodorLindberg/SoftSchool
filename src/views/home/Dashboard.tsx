import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles, styled, Theme } from '@material-ui/core/styles';
import componentStyles from 'assets/theme/views/dashboard';
import React from 'react';

const layout = [
    ['schedule', 'schedule', 'schedule', 'schedule', 'messages', 'messages'],
    ['schedule', 'schedule', 'schedule', 'schedule', 'messages', 'messages'],
    ['schedule', 'schedule', 'schedule', 'schedule', 'messages', 'messages'],
    ['schedule', 'schedule', 'schedule', 'schedule', 'messages', 'messages'],
    ['subjects', 'subjects', 'subjects', 'subjects', 'messages', 'messages'],
    ['subjects', 'subjects', 'subjects', 'subjects', 'test', 'test']
];

function getTemplateAreas(layout: string[][]): string {
    let area = '';

    layout.forEach((row: string[]) => {
        area +=
            '"' +
            row.reduce((prev: string, curr: string) => {
                return prev + ' ' + curr;
            }) +
            '"\n';
    });
    return area;
}

const WidgetGrid = styled('div')(
    ({ theme, layout }: { theme: Theme; layout: string[][] }) => ({
        display: 'grid',
        gridGap: '10px',
        padding: '10px',
        backgroundColor: 'blue',
        gridTemplateAreas: getTemplateAreas(layout)
    })
);

const WidgetItemContent = styled('div')(
    ({
        theme,
        area,
        aspectRatio
    }: {
        theme: Theme;
        area: string;
        aspectRatio: number;
    }) => ({
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontSize: '30px',
        gridArea: area,
        position: 'relative',
        width: '100%',
        paddingTop: `${100 * aspectRatio}%`
    })
);

function WidgetItem({ children, area }: { area: string; children: any }) {
    const areaDimensions = getAreaDimensions(area, layout);
    return (
        <WidgetItemContent area={area} aspectRatio={areaDimensions.aspect}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'grid',
                    justifyItems: 'start',
                    alignItems: 'end'
                }}
            >
                {children}
            </div>
        </WidgetItemContent>
    );
}

function getAreaDimensions(
    area: string,
    layout: string[][]
): { x: number; y: number; w: number; h: number; aspect: number } {
    let posX = -1;
    let posY = -1;
    let w = 0;
    let h = 0;

    (function () {
        for (let y = 0; y < layout.length; y++) {
            const row = layout[y];
            for (let x = 0; x < row.length; x++) {
                if (row[x] == area) {
                    posX = x;
                    posY = y;

                    return;
                }
            }
        }
    })();

    //Calculate width
    const row = layout[posY];
    for (let x = posX; x < row.length; x++) {
        if (row[x] == area) w++;
        else if (w > 0) break;
    }
    //Calculate height

    for (let y = posY; y < layout.length; y++) {
        if (layout[y][posX] == area) h++;
        else if (h > 0) break;
    }
    return { x: posX, y: posY, w: w, h: h, aspect: h / w };
}

const useStyles = makeStyles(componentStyles);
function Dashboard() {
    const classes = useStyles({});

    return (
        <>
            <Container
                component={Box}
                maxWidth={false as const}
                classes={{ root: classes.containerRoot }}
            >
                <WidgetGrid layout={layout}>
                    <WidgetItem area="schedule">1</WidgetItem>
                    <WidgetItem area="messages">2</WidgetItem>
                    <WidgetItem area="subjects">3</WidgetItem>
                    <WidgetItem area="test">4</WidgetItem>
                </WidgetGrid>
            </Container>
        </>
    );
}

export default Dashboard;
