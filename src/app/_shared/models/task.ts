import * as moment from 'moment';

export enum TaskStatus {
    WIP = 0,
    DONE = 1,
    LEFT = 2,
    DEVIDED = 3
}

export interface Task {
    id: string;
    name: string;
    status: TaskStatus;

    createdAt: moment.Moment;
    updatedAt: moment.Moment;
}