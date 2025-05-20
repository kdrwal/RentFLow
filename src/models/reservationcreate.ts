import { ReservationItem } from "./reservation";


export interface ReservationCreate {
    startDate: string;
    endDate?: string;
    items: ReservationItem[];
}