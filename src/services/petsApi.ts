// Simple API service: replace BASE_URL with your backend.
import type { Client,Pet,PetVaccination , Petgrooming,PetBooking,Avatar} from '../types/pet'


// apiService.ts
const BASE_URL = 'http://localhost:4000'; // replace with your JSON Server URL



// Fetch all clients
export async function fetchClients(): Promise<Client[]> {
  try {
    const response = await fetch(`${BASE_URL}/clients`);
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    const data: Client[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
}


export async function fetchPet(petId: number): Promise<Pet | null> {
  try {
    const response = await fetch(`${BASE_URL}/pets/${petId}`)
    if (!response.ok) throw new Error('Failed to fetch pet')

    const pet: Pet = await response.json()
    return pet
  } catch (error) {
    console.error('Error fetching pet:', error)
    return null
  }
}


export async function fetchPetvaccinations(petId: number): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/vaccinations`); // fetch all vaccinations
    if (!response.ok) throw new Error('Failed to fetch vaccinations');

    const data: PetVaccination[] = await response.json();

    // Filter for the current pet's vaccinations
    const petVaccinations = data.filter(p => p.id == petId);

    // Sort by date ascending
    petVaccinations.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    return petVaccinations; // always returns an array
  } catch (error) {
    console.error('Error fetching pet vaccinations:', error);
    return []; // return empty array on error
  }
}



export async function fetchPetgrooming(petId: number): Promise<any> {
// placeholder: replace with real endpoint
  try {
    const response = await fetch(`${BASE_URL}/grooming`) // fetch all pets
    if (!response.ok) throw new Error('Failed to fetch pets')

    const data: Petgrooming[] = await response.json()
    const Petgroomings = data.filter(p => p.id == petId) || null
    return Petgroomings
  } catch (error) {
     console.error('Error fetching pet vaccinations:', error)
    return [] // return empty array on error
  }
}

export async function fetchPetbookings(petId: number): Promise<any> {
// placeholder: replace with real endpoint
  try {
    const response = await fetch(`${BASE_URL}/bookings`) // fetch all pets
    if (!response.ok) throw new Error('Failed to fetch pets')

    const data: PetBooking[] = await response.json()
    const PetBooking = data.filter(p => p.id == petId) || null
    return PetBooking
  } catch (error) {
    console.error('Error fetching pet:', error)
    return []
  }
}

//Edit pate 
export async function EditPet(
  petId: number,
  updates: Partial<Pet> // allows multiple fields
): Promise<Pet | null> {
  try {
    // Send PATCH request with all updated fields
    const response = await fetch(`${BASE_URL}/pets/${petId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error("Failed to update pet");

    const data: Pet = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing pet:", error);
    return null;
  }
}

export async function EditClient(
  petId: number,
  updates: Partial<Client> // allows multiple fields
): Promise<Client | null> {
  try {
    // Send PATCH request with all updated fields
    const response = await fetch(`${BASE_URL}/clients/${petId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error("Failed to update pet");

    const data: Client = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing pet:", error);
    return null;
  }
}

export async function EditVactination(
  petId: number,
  updates: PetVaccination[] // array of vaccinations
): Promise<PetVaccination[] | null> {
  try {

    // Assuming your backend supports batch update
    const response = await fetch(`${BASE_URL}vaccinations/${petId}`, {
      method: "PUT", // or PATCH depending on your API
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error("Failed to update vaccinations");

    const data: PetVaccination[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing vaccinations:", error);
    return null;
  }
}


export async function EditGrooming(
  petId: number,
  updates: Partial<Petgrooming>
): Promise<Petgrooming | null> {
  try {

    const response = await fetch(`${BASE_URL}/grooming/${petId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error("Failed to update grooming");

    const data: Petgrooming = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing grooming:", error);
    return null;
  }
}

export async function EditBooking(
  petId: number,
  updates: Partial<PetBooking>
): Promise<PetBooking | null> {
  try {

    const response = await fetch(`${BASE_URL}/bookings/${petId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error("Failed to update grooming");

    const data: PetBooking = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing grooming:", error);
    return null;
  }
}


// ✅ Get all avatars
export async function fetchAvatars(): Promise<Avatar[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch avatars");
  return res.json();
}

// ✅ Get avatar by id
// ---- Avatar Fetcher (API) ----
export async function fetchAvatarById(petId: number): Promise<Avatar | null> {
  try {
    const response = await fetch(`${BASE_URL}/avatars`) // fetch all avatars
    if (!response.ok) throw new Error('Failed to fetch avatars')

    const data: Avatar[] = await response.json()
    const avatar = data.find(a => a.id == petId) || null



    return avatar // ✅ just return null if not found
  } catch (error: any) {
    console.error('Error fetching avatar:', error)
    return null
  }
}




// ✅ Update avatar by id
export async function updateAvatar(id: any, updatedData: Partial<Avatar>): Promise<Avatar> {
  const res = await fetch(`${BASE_URL}/avatars/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error(`Failed to update avatar with id ${id}`);
  return res.json();
}

// ✅ Delete avatar by id
export async function deleteAvatar(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete avatar with id ${id}`);
}

export async function fetchPetPhoto(petId: number): Promise<Pet | null> {
  try {
    const response = await fetch(`${BASE_URL}/pets/${petId}`)
    if (!response.ok) throw new Error('Failed to fetch pet')

    const pet: Pet = await response.json()
    return pet.photos ? pet : null
  } catch (error) {
    console.error('Error fetching pet:', error)
    return null
  }
}


// ✅ Add vaccination
export async function AddVaccination(newVaccination: Partial<PetVaccination>): Promise<PetVaccination> {
  try {
    const response = await fetch(`${BASE_URL}/vaccinations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVaccination),
    });
    if (!response.ok) throw new Error("Failed to add vaccination");
    return await response.json();
  } catch (error) {
    console.error("Error adding vaccination:", error);
    throw error;
  }
}




// Add new grooming details for a pet
export async function AddGrooming(newGrooming: Partial<Petgrooming>): Promise<Petgrooming | null> {
  try {
    const response = await fetch(`${BASE_URL}/grooming`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGrooming),
    });
    if (!response.ok) throw new Error("Failed to add grooming details");
    const data: Petgrooming = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding grooming details:", error);
    return null;
  }
}

// Add new booking for a pet
export async function AddBooking(newBooking: Partial<PetBooking>): Promise<PetBooking | null> {
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    });
    if (!response.ok) throw new Error("Failed to add booking");
    const data: PetBooking = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding booking:", error);
    return null;
  }
}







