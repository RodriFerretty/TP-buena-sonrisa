export class Appointment {
    public uid: string;
    public client: string;
    public specialist: string;
    public date: any;
    public time: number;
    public status: string;
    public clientReview?: string;
    public specialistReview?: number;
    public attended: boolean
}
