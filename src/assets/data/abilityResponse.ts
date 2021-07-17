export type level = 'none' | 'yellow' | 'green';

export interface AbilityField {
    content: string;
    level: level;
}

export interface Ability {
    name: string;
    E: AbilityField;
    C: AbilityField;
    A: AbilityField;
    comments: string;
}

export interface AbilityResponse {
    title: string;
    student: string;
    courseName: string;
    courseCode: string;
    courseId: number;
    lastChange: string;
    comment: string;
    requirments: Ability[];
}

const data: AbilityResponse = {
    title: 'Kursmatris i Samhällskunskap 1b för Theodor Lindberg (2021-07-17)',
    student: 'Theodor Lindberg',
    courseName: 'Samhällskunskap 1b',
    courseCode: 'SAMSAM01B',
    lastChange: '2021-06-04',
    courseId: 3657,
    comment:
        '31/5<br>Prognosbetyg: B<br><br>Om A-nivå på KK 4a &amp; B samt hög nivå på övriga KKn i rapporten = A i kursen.<br><br>22/4:<br>Prognosspann: C-A<br><br>16/3<br>Prognos: C-A<br><br>I prognosspannet får du en fingervisning om din utveckling, betygsmässigt, i kursen. Det är INTE ett betyg utan en indikation om vad som kan ske om din utveckling är stabil och, företrädelsevis, positiv. Boka stödtid med mig om du vill ha mer information kring detta alternativt kontakta under lektionstid!',
    requirments: [
        {
            name: '1 - Eleven kan... ',
            E: {
                content:
                    'Eleven kan <strong>översiktligt</strong> redogöra för och analysera olika samhällens organisation och samhällsförhållanden samt de bakomliggande idéerna.',
                level: 'green'
            },
            C: {
                content:
                    'Eleven kan <strong>utförligt</strong> redogöra för och analysera olika samhällens organisation och samhällsförhållanden samt de bakomliggande idéerna.',
                level: 'green'
            },
            A: {
                content:
                    'Eleven kan <strong>utförligt och nyanserat </strong>redogöra för och analysera olika samhällens organisation och samhällsförhållanden samt de bakomliggande idéerna.',
                level: 'green'
            },
            comments: ''
        },
        {
            name: '1 - Eleven kan också... ',
            E: {
                content:
                    'Eleven kan också <strong>översiktligt</strong> redogöra för de mänskliga rättigheterna.',
                level: 'green'
            },
            C: {
                content:
                    'Eleven kan också <strong>utförligt</strong> redogöra för de mänskliga rättigheterna.',
                level: 'green'
            },
            A: {
                content:
                    'Eleven kan också <strong>utförligt och nyanserat</strong> redogöra för de mänskliga rättigheterna.',
                level: 'none'
            },
            comments: ''
        },
        {
            name: '1 - I sin analys förklarar eleven... ',
            E: {
                content:
                    'I sin analys förklarar eleven <strong>enkla</strong> samband och drar <strong>enkla</strong> slutsatser om likheter och skillnader mellan olika samhällens organisation.',
                level: 'green'
            },
            C: {
                content:
                    'I sin analys förklarar eleven samband och drar <strong>välgrundade</strong> slutsatser om likheter och skillnader mellan olika samhällens organisation.',
                level: 'green'
            },
            A: {
                content:
                    'I sin analys förklarar eleven <strong>komplexa</strong> samband och drar <strong>välgrundade</strong> slutsatser om likheter och skillnader mellan olika samhällens organisation.',
                level: 'green'
            },
            comments: ''
        },
        {
            name: '1 - Dessutom kan eleven... ',
            E: {
                content:
                    '<p class="tinymce-p">Dessutom kan eleven <strong>översiktligt</strong> redogöra för de historiska förutsättningarnas betydelse och dra <strong>enkla</strong> slutsatser om hur nutida samhällsförhållanden påverkar och påverkas av individer, grupper och samhällsstrukturer.</p>',
                level: 'green'
            },
            C: {
                content:
                    '<p class="tinymce-p">Dessutom kan eleven <strong>utförligt</strong> redogöra för de historiska förutsättningarnas betydelse och dra <strong>välgrundade</strong> slutsatser om hur nutida samhällsförhållanden påverkar och påverkas av individer, grupper och samhällsstrukturer.</p>',
                level: 'green'
            },
            A: {
                content:
                    '<p class="tinymce-p">Dessutom kan eleven <strong>utförligt och nyanserat</strong> redogöra för de historiska förutsättningarnas betydelse och dra <strong>välgrundade och nyanserade</strong> slutsatser om hur nutida samhällsförhållanden påverkar och påverkas av individer, grupper och samhällsstrukturer.</p>',
                level: 'green'
            },
            comments: ''
        },
        {
            name: '2 - Eleven kan analysera samhällsfrågor och identifierar... ',
            E: {
                content:
                    'Eleven kan analysera samhällsfrågor och identifiera <strong>någon</strong> orsak och konsekvens.',
                level: 'green'
            },
            C: {
                content:
                    'Eleven kan analysera samhällsfrågor och identifiera <strong>några</strong> orsaker och konsekvenser.',
                level: 'green'
            },
            A: {
                content:
                    'Eleven kan analysera samhällsfrågor och identifierar <strong>flera</strong> orsaker och konsekvenser.',
                level: 'green'
            },
            comments: ''
        },
        {
            name: '2 - I analysen använder eleven... ',
            E: {
                content:
                    'I analysen använder eleven <strong>med viss säkerhet</strong> samhällsvetenskapliga begrepp, teorier, modeller och metoder.',
                level: 'green'
            },
            C: {
                content:
                    'I analysen använder eleven <strong>med viss säkerhet</strong> samhällsvetenskapliga begrepp, teorier, modeller och metoder <strong>samt värderar dem med enkla omdömen</strong>.',
                level: 'green'
            },
            A: {
                content:
                    'I analysen använder eleven <strong>med säkerhet</strong> samhällsvetenskapliga begrepp, teorier, modeller och metoder <strong>samt värderar dem med nyanserade omdömen</strong>.',
                level: 'none'
            },
            comments: ''
        },
        {
            name: '2 - Eleven diskuterar... ',
            E: {
                content:
                    'Eleven diskuterar <strong>översiktligt</strong> orsakerna och konsekvenserna samt möjliga lösningar på samhällsfrågorna.',
                level: 'green'
            },
            C: {
                content:
                    'Eleven diskuterar <strong>utförligt</strong> orsakerna och konsekvenserna samt möjliga lösningar på samhällsfrågorna.',
                level: 'green'
            },
            A: {
                content:
                    'Eleven diskuterar <strong>utförligt och nyanserat</strong> orsakerna och konsekvenserna samt möjliga lösningar på samhällsfrågorna.',
                level: 'none'
            },
            comments: ''
        },
        {
            name: '2 - Eleven kan ge... ',
            E: {
                content:
                    'Eleven kan ge <strong>enkla</strong> argument för sina ståndpunkter och värderar med <strong>enkla</strong> omdömen andras ståndpunkter.',
                level: 'green'
            },
            C: {
                content:
                    'Eleven kan ge <strong>välgrundade</strong> argument för sina ståndpunkter och värderar med <strong>enkla</strong> omdömen andras ståndpunkter.',
                level: 'green'
            },
            A: {
                content:
                    'Eleven kan ge <strong>nyanserade</strong> argument för sina ståndpunkter och värderar med <strong>nyanserade</strong> omdömen andras ståndpunkter.',
                level: 'none'
            },
            comments: ''
        },
        {
            name: '3 - Eleven kan... ',
            E: {
                content:
                    'Eleven kan <strong>översiktligt </strong>redogöra för individens rättigheter och skyldigheter i rollen som konsument, förhållandet mellan hushållets inkomster och utgifter, tillgångar och skulder samt för sambanden mellan den privata ekonomin och samhällsekonomin.',
                level: 'green'
            },
            C: {
                content:
                    'Eleven kan <strong>utförligt </strong>redogöra för individens rättigheter och skyldigheter i rollen som konsument, förhållandet mellan hushållets inkomster och utgifter, tillgångar och skulder samt för sambanden mellan den privata ekonomin och samhällsekonomin.',
                level: 'green'
            },
            A: {
                content:
                    'Eleven kan <strong>utförligt och nyanserat </strong>redogöra för individens rättigheter och skyldigheter i rollen som konsument, förhållandet mellan hushållets inkomster och utgifter, tillgångar och skulder samt för sambanden mellan den privata ekonomin och samhällsekonomin.',
                level: 'green'
            },
            comments: ''
        },
        {
            name: '4 - I arbetet med samhällsfrågor kan eleven... ',
            E: {
                content:
                    'I arbetet med samhällsfrågor kan eleven <strong>med viss säkerhet</strong> söka, granska och tolka information från olika källor, redovisa sina källor samt göra <strong>enkla</strong> reflektioner om deras relevans och trovärdighet.',
                level: 'green'
            },
            C: {
                content:
                    'I arbetet med samhällsfrågor kan eleven <strong>med viss säkerhet</strong> söka, granska och tolka information från olika källor, redovisa sina källor samt göra <strong>välgrundade</strong> reflektioner om deras relevans och trovärdighet utifrån syftet.',
                level: 'green'
            },
            A: {
                content:
                    'I arbetet med samhällsfrågor kan eleven <strong>med säkerhet</strong> söka, granska och tolka information från olika källor, redovisa sina källor samt göra <strong>välgrundade och nyanserade</strong> reflektioner om deras relevans och trovärdighet utifrån syftet.',
                level: 'none'
            },
            comments: ''
        },
        {
            name: '4 - Eleven kan,... ',
            E: {
                content:
                    'Eleven kan, <strong>med viss säkerhet</strong> och på ett strukturerat sätt, uttrycka sina kunskaper i samhällskunskap i olika presentationsformer.',
                level: 'green'
            },
            C: {
                content:
                    'Eleven kan, <strong>med viss säkerhet</strong> och på ett strukturerat sätt, uttrycka sina kunskaper i samhällskunskap i olika presentationsformer <strong>samt formulera sig självständigt i förhållande till källorna</strong>.',
                level: 'green'
            },
            A: {
                content:
                    'Eleven kan, <strong>med säkerhet</strong> och på ett strukturerat sätt, uttrycka sina kunskaper i samhällskunskap i olika presentationsformer <strong>samt formulera sig självständigt i förhållande till källorna</strong>.',
                level: 'green'
            },
            comments: ''
        }
    ]
};

export interface CommentHistoryData {
    date: string;
    author: string;
    comment: string;
}

export const commentHistoryRespons: { history: CommentHistoryData[] } = {
    history: [
        {
            date: '2021-05-31 13:14:11',
            author: 'Christian Castenskiold',
            comment:
                '31/5\nPrognosbetyg: B\n\nOm A-nivå på KK 4a & B samt hög nivå på övriga KKn i rapporten = A i kursen.\n\n22/4:\nPrognosspann: C-A\n\n16/3\nPrognos: C-A\n\nI prognosspannet får du en fingervisning om din utveckling, betygsmässigt, i kursen. Det är INTE ett betyg utan en indikation om vad som kan ske om din utveckling är stabil och, företrädelsevis, positiv. Boka stödtid med mig om du vill ha mer information kring detta alternativt kontakta under lektionstid!'
        },
        {
            date: '2021-05-06 10:10:52',
            author: 'Christian Castenskiold',
            comment:
                'Om A-nivå på KK 4a & B samt hög nivå på övriga KKn i rapporten = A i kursen.\n\n22/4:\nPrognosspann: C-A\n\n16/3\nPrognos: C-A\n\nI prognosspannet får du en fingervisning om din utveckling, betygsmässigt, i kursen. Det är INTE ett betyg utan en indikation om vad som kan ske om din utveckling är stabil och, företrädelsevis, positiv. Boka stödtid med mig om du vill ha mer information kring detta alternativt kontakta under lektionstid!'
        },
        {
            date: '2021-04-22 16:15:32',
            author: 'Christian Castenskiold',
            comment:
                '22/4:\nPrognosspann: C-A\n\n16/3\nPrognos: C-A\n\nI prognosspannet får du en fingervisning om din utveckling, betygsmässigt, i kursen. Det är INTE ett betyg utan en indikation om vad som kan ske om din utveckling är stabil och, företrädelsevis, positiv. Boka stödtid med mig om du vill ha mer information kring detta alternativt kontakta under lektionstid!'
        },
        {
            date: '2021-03-16 10:30:43',
            author: 'Christian Castenskiold',
            comment:
                '16/3\nPrognos: C-A\n\nI prognosspannet får du en fingervisning om din utveckling, betygsmässigt, i kursen. Det är INTE ett betyg utan en indikation om vad som kan ske om din utveckling är stabil och, företrädelsevis, positiv. Boka stödtid med mig om du vill ha mer information kring detta alternativt kontakta under lektionstid!'
        }
    ]
};

export interface AbilityHistoryData extends Ability {
    index: number;
    abilityId: number;
    date: string;
    author: string;
}
export const abilityHistoryResponse: { history: AbilityHistoryData[] } = {
    history: [
        {
            name: '',
            index: 0,
            abilityId: 10596,
            date: '2021-06-09 21:44:16',
            author: 'Maria Åslund',
            E: {
                content:
                    'I sitt arbete värderar och granskar eleven <strong>med viss säkerhet</strong> källor kritiskt samt tillämpar grundläggande regler för citat- och referatteknik.',
                level: 'green'
            },
            C: {
                content:
                    'I sitt arbete värderar och granskar eleven <strong>med viss säkerhet</strong> källor kritiskt samt tillämpar grundläggande regler för citat- och referatteknik.',
                level: 'green'
            },
            A: {
                content:
                    'I sitt arbete värderar och granskar eleven <strong>med säkerhet</strong> källor kritiskt samt tillämpar grundläggande regler för citat- och referatteknik.',
                level: 'yellow'
            },
            comments: ''
        },
        {
            name: '',
            index: 1,
            abilityId: 10596,
            date: '2021-06-09 15:27:44',
            author: 'Maria Åslund',
            E: {
                content:
                    'I sitt arbete värderar och granskar eleven <strong>med viss säkerhet</strong> källor kritiskt samt tillämpar grundläggande regler för citat- och referatteknik.',
                level: 'green'
            },
            C: {
                content:
                    'I sitt arbete värderar och granskar eleven <strong>med viss säkerhet</strong> källor kritiskt samt tillämpar grundläggande regler för citat- och referatteknik.',
                level: 'green'
            },
            A: {
                content:
                    'I sitt arbete värderar och granskar eleven <strong>med säkerhet</strong> källor kritiskt samt tillämpar grundläggande regler för citat- och referatteknik.',
                level: 'green'
            },
            comments:
                'This is a really long comment and i do not know why im typing this and i can type colo'
        }
    ]
};

export default data;
