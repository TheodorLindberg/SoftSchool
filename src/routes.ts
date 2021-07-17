import Tv from '@material-ui/icons/Tv';
import Schedule from '@material-ui/icons/Schedule';
import School from '@material-ui/icons/School';
import Message from '@material-ui/icons/Message';
import Announcement from '@material-ui/icons/Announcement';
import Dashboard from 'views/home/Dashboard';
import Messages from 'views/home/Messages';
import News from 'views/home/News';
import ScheduleView from 'views/home/Schedule';
import Ability from 'views/home/Ability';

export interface Route {
    path: string;
    name: string;
    icon: any;
    iconColor: string;
    layout: string;
    component?: any;
}

const routes: Route[] = [
    {
        path: '/dashboard',
        name: 'Startsida',
        icon: Tv,
        iconColor: 'Primary',
        layout: '/home',
        component: Dashboard
    },
    {
        path: '/messages',
        name: 'Meddelanden',
        icon: Message,
        iconColor: 'Primary',
        layout: '/home',
        component: Messages
    },
    {
        path: '/news',
        name: 'Nyheter',
        icon: Announcement,
        iconColor: 'Primary',
        layout: '/home',
        component: News
    },
    {
        path: '/schedule',
        name: 'Schema',
        icon: Schedule,
        iconColor: 'Primary',
        layout: '/home',
        component: ScheduleView
    },
    {
        path: '/ability',
        name: 'Matriser',
        icon: School,
        iconColor: 'Primary',
        layout: '/home',
        component: Ability
    }
];

export default routes;
