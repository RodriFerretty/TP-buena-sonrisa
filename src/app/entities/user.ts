import { UserInfo } from 'firebase';

export class User implements UserInfo {
    //User attributes
    role: string; //admin/client/specialist/recepcionist
    specialty?: string //Only specialist
    //UserInfo implementation
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    uid: string;
}