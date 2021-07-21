//Abilities
export type abilityLevel = 'none' | 'yellow' | 'green';

export interface AbilityField {
    text: string;
    level: abilityLevel;
    abilityId: number;
}

export interface AbilityFields {
    E: AbilityField;
    C: AbilityField;
    A: AbilityField;
    comment: string;
}

export interface AbilityHistory extends AbilityFields {
    index: number;
    date: string;
    author: string;
}

export interface Ability extends AbilityFields {
    name: string;
    history?: AbilityHistory;
}

export interface MatrixCommentHistory {
    author: string;
    date: string;
    comment: string;
}

export interface Matrix {
    lastChange: string;
    commentAbilityId: number;
    comment: string;
    commentHistory?: MatrixCommentHistory[];

    abilities: Ability[];
}

export interface CourseMatrix extends Matrix {
    courseName: string;
    courseCode: string;
    courseId: number;
}

//Courses
export type courseStatus = 'compleated' | 'started' | 'notstarted';

export interface Course {
    name: string;
    code: string;
    id: number;
    category: string;
    points: number;
    start: string;
    end: string;
    teacher: string;
    grade: string;
    ur: string;
    matrix?: Matrix;
}

//Messages
export interface Message {
    title: string;
    date: string;
    author: string;
    content: string;
}

//News
export interface News {
    title: string;
    date: string;
    author: string;
    content: string;
}

//Profile
export interface Mentour {
    name: string;
    phone: string;
    email: string;
    img: string;
}

export interface UserInfo {
    firstname: string;
    lastname: string;
    socialnumber: string;
    class: string;
}

export interface ContactInfo {
    adress: string;
    postcode: string;
    phoneHouse: string;
    phoneOther: string;
    mail: string;
    classroomMail: string;
    phone: string;
}

export interface UserSettings {
    platform: string;
    guardians: string;
}

export interface Profile {
    user: UserInfo;
    contact: ContactInfo;
    mentours: Mentour[];
    settings: UserSettings;
}

//Schedule
export interface LessonEvent {
    courseName: string;
    courseCode: string;
    teacherName: string;
    courseId: number;
}

export interface TestEvent {
    courseName: string;
    courseCode: string;
    courseId: number;
}

export interface OtherEvent {
    text: string;
}

export type eventType = 'lesson' | 'test' | 'other';

export interface Event {
    startDate: string;
    endDate: string;
    location: string;
    type: eventType;

    lessonEvent?: LessonEvent;
    testEvent?: TestEvent;
    otherEvent?: OtherEvent;
}

export interface WeekSchedule {
    week: number;
    events: Event[];
}

export interface Schedule {
    weeks: WeekSchedule[];
}

//Responses

export interface Response {
    error?: string;
}

//Messages
export interface MessagesResponse extends Response {
    messages: Message[];
    startIndex: number;
    endIndex: number;
    totalMessages: number;
}

//Ability
export interface CourseMatrixResponse extends Response {
    courseMatrix: CourseMatrix;
}

export interface AbilityHistoryResponse extends Response {
    history: AbilityHistory;
}

export interface MatrixCommentHistoryResponse extends Response {
    history: MatrixCommentHistory;
}

//Profile
export interface ProfileResponse extends Response {
    profile: Profile;
}

//Course response

export interface CoursesResponse extends Response {
    compleated: Course[];
    started: Course[];
    notstarted: Course[];
}
