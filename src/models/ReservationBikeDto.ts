export interface ReservationBikeDto {
  bikeId: number;
  quantity: number;
  bike: {
    description: string;
    price: number;
    
  };
}