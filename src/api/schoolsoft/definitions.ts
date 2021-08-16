//Abilities
export type abilityLevel = "none" | "yellow" | "green";

export interface AbilityField {
  text: string;
  level: abilityLevel;
}

export interface AbilityFields {
  E: AbilityField;
  C: AbilityField;
  A: AbilityField;
  abilityId: number;
  comment: string;
}

export interface AbilityHistoryField extends AbilityFields {
  index: number;
  date: string;
  author: string;
}

export type AbilityHistory = AbilityHistoryField[];

export interface Ability extends AbilityFields {
  name: string;
  history?: AbilityHistory;
}

export interface MatrixCommentHistoryField {
  author: string;
  date: string;
  comment: string;
}

export type MatrixCommentHistory = MatrixCommentHistoryField[];

export interface Matrix {
  lastChange: string;
  commentAbilityId: number;
  comment: string;
  commentHistory?: MatrixCommentHistory;

  abilities: Ability[];
}

export interface CourseMatrix extends Matrix {
  courseName: string;
  courseCode: string;
  courseId: number;
}

//Courses
export type courseStatus = "compleated" | "started" | "notstarted";

export interface Course {
  name: string;
  code: string;
  id: number;
  category: string;
  points: number;
  year: number;
  start: string;
  end: string;
  teacher: string;
  grade: string;
  ur: string;
  status: courseStatus;
  matrix?: Matrix;
}

export interface ActiveCourse {
  name: string;
  id: number;
}

export interface CourseList {
  list: Course[];
  active: ActiveCourse[];
}

//Messages
export interface Message {
  title: string;
  date: string;
  author: string;
  content: string;
  id: number;
}

export interface MessageList {
  messages: Message[];
  offset: number;
  total: number;
}

export interface Attatchment {
  name: string;
  id: string;
  link: string;
  size: string;
}

export interface News {
  title: string;
  recipients: string;
  group: number;
  published: string;
  showUntil: string;
  content: string;
  sender: string;
  senderInstance: string;
  attatchments: [];
}

export type NewsList = News[];

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
  period: string;
}

export interface TestEvent {
  courseName: string;
  courseCode: string;
  courseId: number;
}

export interface OtherEvent {
  text: string;
}

export type eventType = "lesson" | "test" | "other";

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
// Schdesules list

export interface SchedulesList {
  teachers: { [id: number]: string };
  classes: { [id: number]: string };
  studentId: number;
  name: string;
}

//Responses

export interface Response {
  error?: string;
}

//Messages
export interface MessagesResponse extends Response {
  data: MessageList;
}

//Ability
export interface CourseMatrixResponse extends Response {
  data: Matrix;
}

export interface AbilityHistoryResponse extends Response {
  data: AbilityHistory;
}

export interface MatrixCommentHistoryResponse extends Response {
  data: MatrixCommentHistory;
}

//Profile
export interface ProfileResponse extends Response {
  data: Profile;
}

//Course response

export interface CoursesResponse extends Response {
  data: CourseList;
}
export interface WeekScheduleResponse extends Response {
  data: WeekSchedule;
}

export interface SchedulesListResponse extends Response {
  data: SchedulesList;
}
