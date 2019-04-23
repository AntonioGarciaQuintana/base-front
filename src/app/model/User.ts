import { Role } from './Role';

export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    roles: Role[];
}
