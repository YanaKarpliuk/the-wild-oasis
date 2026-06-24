export type Login = {
  email: string;
  password: string;
}

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  guests: {
    fullName: string;
    email: string;
  };
  cabins: {
    name: string;
  };
}

export type Cabin = {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export type NewCabin = {
  description: string,
  discount: number,
  image: File | string,
  maxCapacity: number,
  name: string,
  regularPrice: number
}

export type Setting = {
  minBookingLength?: string;
  maxBookingLength?: string;
  maxGuestsPerBooking?: string;
  breakfastPrice?: string;
}
