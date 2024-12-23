export interface TourPackage {
  [x: string]: any;
  _id?: string;
  title: string;
  description: string;
  price: number;
  availableDates: string[];
  images: string[];
  location: string;
  duration: string;
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  included: string[];
  excluded: string[];
}

export interface Booking {
  [x: string]: ReactNode;
  _id: string;
  packageId: string;
  packageTitle: string;
  customerName: string;
  email: string;
  phone: string;
  travelers: number;
  specialRequests?: string;
  totalPrice: number;
  createdAt: string;
}
