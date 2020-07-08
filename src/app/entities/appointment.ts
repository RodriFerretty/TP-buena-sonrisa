export class Appointment {
    public uid: string;
    public client: string;
    public specialist: string; //specialist uid
    public date: any; //date as string ? 
    public time: string; //time as string ?
    public status: string; //active, cancelled, attended
    public clientReview?: string; 
    public specialistReview?: string;
    public attended: boolean
}
