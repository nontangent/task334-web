import * as moment from 'moment';
import { Timestamp, FieldValue } from './timestamp';

export enum TaskStatus {
    WIP = 0,
    DONE = 1,
    LEFT = 2,
    DIVIDED = 3
}

export interface Task {
    id: string;
    ownerId: string;

    name: string;
    status: TaskStatus;

    createdAt: moment.Moment | Timestamp | FieldValue;
    updatedAt: moment.Moment | Timestamp | FieldValue;
}