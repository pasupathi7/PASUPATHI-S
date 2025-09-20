
export interface Hotel {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  imageUrl: string;
  description: string;
}

export enum FilterSort {
    PRICE_ASC = 'PRICE_ASC',
    PRICE_DESC = 'PRICE_DESC',
    RATING_DESC = 'RATING_DESC',
}
