import Tv from "@material-ui/icons/Tv";
import Schedule from "@material-ui/icons/Schedule";
import School from "@material-ui/icons/School";
import Message from "@material-ui/icons/Message";
import Announcement from "@material-ui/icons/Announcement";
import AssessmentIcon from "@material-ui/icons/Assessment";
// import Dashboard from "views/home/Dashboard";
// import Messages from "views/home/Messages";
// import News from "views/home/News";
// import ScheduleView from "views/home/Schedule";
// import Ability from "views/home/Ability";
// import Courses from "views/home/Courses";
// import Settings from "views/home/Settings";

export interface Route {
  path: string;
  name: string;
  layout: string;
  icon?: any;
  iconColor?: string;
  component?: any;
  sidebar?: boolean;
}

const routes: Route[] = [
  {
    path: "/dashboard",
    name: "Startsida",
    icon: Tv,
    iconColor: "Primary",
    layout: "/home",
    sidebar: true,
  },
  {
    path: "/messages",
    name: "Meddelanden",
    icon: Message,
    iconColor: "Primary",
    layout: "/home",
    sidebar: true,
  },
  {
    path: "/news",
    name: "Nyheter",
    icon: Announcement,
    iconColor: "Primary",
    layout: "/home",
    sidebar: true,
  },
  {
    path: "/schedule",
    name: "Schema",
    icon: Schedule,
    iconColor: "Primary",
    layout: "/home",
    sidebar: true,
  },
  {
    path: "/courses",
    name: "Kurser",
    icon: AssessmentIcon,
    iconColor: "Primary",
    layout: "/home",
    sidebar: true,
  },
  {
    path: "/ability",
    name: "Matriser",
    icon: School,
    iconColor: "Primary",
    layout: "/home",
    sidebar: true,
  },
  {
    path: "/settings",
    name: "Inställningar",
    layout: "/home",
  },
];

export default routes;
