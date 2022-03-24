export interface BusinessProps {
  removeBusinessFromDashboard: (id: string) => void;

  saved: boolean;
  dashboard: boolean;
  landing: boolean;
  businessId: string;
  name: string;
  image: string;
  rating: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
  };
  type: [string];
  website: string;
  phone: string;
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
  location: {
    lat: number;
    lng: number;
  };
}
