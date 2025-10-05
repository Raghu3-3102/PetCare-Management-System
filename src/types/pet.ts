export interface Client {
  id: number;
  name: string;
  status: string;
  clientEmail?:string,
  petsname: string;
  petstype: string;
  petsbreed: string;
  petImage?: string[];
}


export interface Pet {
id: number;
name: string;
dob: string; // ISO date
status: 'Active' | 'Inactive';
type: string;
breed: string;
size: string;
attributes: string;
temper: string;
color: string;
gender: string;
weightKg: string;
notes?: string;
customerNotes?: string;
clientEmail?: string;
photos?: string; // array of photo URLs
}

export interface PetVaccination {
vacId:number;
id: number;
petId: number;
vaccine: string;
date: string; // ISO date
due: string; // ISO date
}

export interface Petgrooming {
groomId:number;
id: number;
petId: number;
date: string; // ISO date
service: string; // e.g., "Bath, Haircut"
notes?: string;
}

export interface PetBooking {
  bookingId:number
  id: number;
  petId: number;
  type: string;       // e.g., "Boarding", "Daycare", "Grooming"
  start: string;      // ISO date string
  end: string;        // ISO date string
  status: string;     // e.g., "Confirmed", "Pending"
}


export interface Avatar {
  id: number;         // pet's main id
  petId: number;      // clientId linked to that pet
  petAvatar: string;  // path of avatar image
}
