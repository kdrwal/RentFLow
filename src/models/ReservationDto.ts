import { ReservationBikeDto } from "./ReservationBikeDto";


export interface ReservationDto {
  reservationId: number;
  userId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  reservationBikes: ReservationBikeDto[];
}