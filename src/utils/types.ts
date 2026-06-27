// Login types.
export type Login = {
  email: string;
  password: string;
}

// Booking types.
type GuestData = {
  fullName: string;
  email: string;
}

type GuestDataFull = GuestData & {
  country: string;
  countryFlag: string;
  nationalID: string;
}

type CabinData = {
  name: string;
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
  guests: GuestData;
  cabins: CabinData;
}

export type BookingFull = {
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  guests: GuestDataFull;
  cabins: CabinData;
}

export type StatusToTagName = {
  unconfirmed: 'blue',
  'checked-in': 'green',
  'checked-out': 'silver',
}

// Cabin types.
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

// Setting types.
export type Setting = {
  minBookingLength?: string;
  maxBookingLength?: string;
  maxGuestsPerBooking?: string;
  breakfastPrice?: string;
}
