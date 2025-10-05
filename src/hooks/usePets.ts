import { useCallback, useEffect, useState } from 'react'
import { fetchClients, fetchPet,fetchPetvaccinations,fetchPetgrooming,fetchPetbookings,EditPet , EditClient,EditVactination,EditGrooming,EditBooking,fetchAvatarById,updateAvatar,
  fetchPetPhoto,
  AddBooking,
  AddGrooming,
  AddVaccination
} from '../services/petsApi'
import type {Client, Pet,PetVaccination,Petgrooming,PetBooking, Avatar } from '../types/pet'



export function useCustomers(lode?: string) {
const [customers, setCustomers] = useState<Client[]>([])
useEffect(()=>{
let mounted = true
fetchClients().then(data=>{ if(mounted) setCustomers(data) })
return ()=>{ mounted = false }
},[lode])
return { customers }
}


export function usePet(petId: number) {
  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)

  const loadPet = useCallback(async () => {
    setLoading(true)
    const data = await fetchPet(petId)
    setPet(data)
    setLoading(false)
  }, [petId])

  useEffect(() => {
    let mounted = true
    loadPet()
    return () => {
      mounted = false
    }
  }, [loadPet])

  return { pet, loading, refetch: loadPet }
}



export function usePetvaccinations(petId: number) {
  const [petVaccinations, setPetVaccinations] = useState<PetVaccination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchPetvaccinations(petId).then((data) => {
      if (mounted) {
        setPetVaccinations(data ? [data].flat() : []); // ensure array
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [petId]);

  return { petVaccinations, loading };
}



export function usePetgrooming(petId: number) {
  const [petGroomings, setPetGroomings] = useState<Petgrooming[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchPetgrooming(petId).then((data) => {
      if (mounted) {
        setPetGroomings(data ? [data].flat() : []); // ensure array
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [petId]);

  return { petGroomings, loading };
}


export function usePetbookings(petId: number) {
  const [PetBooking , setPetBooking ] = useState<PetBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchPetbookings(petId).then((data) => {
      if (mounted) {
        setPetBooking(data ? [data].flat() : []); // ensure array
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [petId]);

  return { PetBooking, loading };
}



export function useEditPet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedPet, setUpdatedPet] = useState<Pet | null>(null);

  async function editPet(petId: number, updates: Partial<Pet>) {
    setLoading(true);
    setError(null);
    try {
      const data = await EditPet(petId, updates);
      setUpdatedPet(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to edit pet");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { editPet, updatedPet, loading, error };
}

export function useEditClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedClient, setUpdatedClient] = useState<Client | null>(null);

  async function editClient(petId: number, updates: Partial<Client>) {
    setLoading(true);
    setError(null);
    try {
      const data = await  EditClient(petId, updates);
      setUpdatedClient(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to edit pet");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { editClient, updatedClient, loading, error };
}

export function useEditVactinatio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedVaccinations, setUpdatedVaccinations] = useState<PetVaccination[] | null>(null);

  async function editVactinationfunc(petId: number, updates: PetVaccination[]) {
    setLoading(true);
    setError(null);
    try {
      const data = await EditVactination(petId, updates); // updated function
      setUpdatedVaccinations(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to edit vaccinations");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { editVactinationfunc, updatedVaccinations, loading, error };
}


export function useEditGrooming() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedGrooming, setUpdatedGrooming] = useState<Petgrooming | null>(null);

  async function EditGroomingfunc(petId: number, updates: Partial<Petgrooming>) {
    setLoading(true);
    setError(null);
    try {
      const data = await  EditGrooming(petId, updates);
      setUpdatedGrooming(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to edit pet");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { EditGroomingfunc, updatedGrooming, loading, error };
}

export function useEditBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedBooking, setUpdatedBooking] = useState<PetBooking | null>(null);

  async function EditGBookingfunc(petId: number, updates: Partial<PetBooking>) {
    setLoading(true);
    setError(null);
    try {
      const data = await  EditBooking(petId, updates);
      setUpdatedBooking(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to edit pet");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { EditGBookingfunc, updatedBooking, loading, error };
}

export function useAvatar(petId: number) {
  const [avatar, setAvatar] = useState<Avatar | null>(null)
  const [loading, setLoading] = useState(true)

  const loadAvatar = useCallback(async () => {
    setLoading(true)
    const data = await fetchAvatarById(petId)
    setAvatar(data)
    setLoading(false)
  }, [petId])

  useEffect(() => {
    if (!petId) return
    loadAvatar()
  }, [loadAvatar, petId])

  return { avatar, loading, refetch: loadAvatar }
}

export function useEditImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedAvtar, setUpdatedAvtar] = useState<Avatar | null>(null);

  async function EditGAvtarfunc(petId: number, updates: Partial<Avatar>) {
    setLoading(true);
    setError(null);
    try {
      const data = await  updateAvatar(petId, updates);
      setUpdatedAvtar(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to edit pet");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { EditGAvtarfunc, updatedAvtar, loading, error };
}

export function usePhoto(petId: number) {
  const [petPhoto, setPetPhoto] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)

  const loadPet = useCallback(async () => {
    setLoading(true)
    const data = await fetchPetPhoto(petId)
    setPetPhoto(data)
    setLoading(false)
  }, [petId])

  useEffect(() => {
    let mounted = true
    loadPet()
    return () => {
      mounted = false
    }
  }, [loadPet])

  return { petPhoto, loading, refetchPetPhoto: loadPet }
}



export function useAddVaccination() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newVaccination, setNewVaccination] = useState<PetVaccination | null>(null);

  async function addVaccination(vaccination: PetVaccination) {
    setLoading(true);
    setError(null);
    try {
      const data = await AddVaccination(vaccination);
      setNewVaccination(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to add vaccination");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { addVaccination, newVaccination, loading, error };
}


// Hook to add new Grooming details
export function useAddGrooming() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newGrooming, setNewGrooming] = useState<Petgrooming | null>(null);

  async function addGrooming(grooming: Partial<Petgrooming>) {
    setLoading(true);
    setError(null);
    try {
      const data = await AddGrooming(grooming);
      setNewGrooming(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to add grooming");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { addGrooming, newGrooming, loading, error };
}

// Hook to add new Booking
export function useAddBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newBooking, setNewBooking] = useState<PetBooking | null>(null);

  async function addBooking(booking: Partial<PetBooking>) {
    setLoading(true);
    setError(null);
    try {
      const data = await AddBooking(booking);
      setNewBooking(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to add booking");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { addBooking, newBooking, loading, error };
}
