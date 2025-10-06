import React, { FC, useEffect, useState } from "react";
import {
  usePet,
  usePetvaccinations,
  usePetgrooming,
  usePetbookings,
  useEditPet,
  useEditClient,
  useEditVactinatio,
  useEditGrooming,
  useAddVaccination,
  useAddGrooming,
  useAddBooking
} from "../hooks/usePets";
import Vaccinations from "./Vaccinations";
import Grooming from "./Grooming";
import Bookings from "./Booking";
import Photos from "./Photos";
import PetInfo from "./PetInfo";

interface PetDetailsProps {
  petId: number | null;
  activeTab: string;
  OnLode?: (lode: string) => void;
  lode?: string;
}

const Details: FC<PetDetailsProps> = ({ activeTab, petId, OnLode }) => {
  const id = petId || 1;

  const { pet, refetch: refetchPet } = usePet(id);
  const { petVaccinations } = usePetvaccinations(id);
  const { petGroomings } = usePetgrooming(id);
  const { PetBooking } = usePetbookings(id);
  const { editPet } = useEditPet();
  const { editClient } = useEditClient();
  const { editVactinationfunc } = useEditVactinatio();
  const { EditGroomingfunc } = useEditGrooming();
  const { addVaccination } = useAddVaccination();
  const { addGrooming } = useAddGrooming();
  const { addBooking } = useAddBooking();

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (pet) setFormData(pet);
  }, [pet]);

  if (!formData)
    return <div className="p-6 text-center text-gray-500">⏳ Loading pet data...</div>;

    return (
    <div>
      {activeTab === "Pet Details" && (
        <PetInfo
          id={id}
          pet={pet}
          editPet={editPet}
          editClient={editClient}
          refetchPet={refetchPet}
          OnLode={OnLode}
        />
      )}
      {activeTab === "Photos" && (
        <Photos
          id={id}
          pet={pet}
          editPet={editPet}
          refetchPet={refetchPet}
        />
      )}
      {activeTab === "Vaccinations" && (
        <Vaccinations
          petId={id}
          petVaccinations={Array.isArray(petVaccinations) ? petVaccinations : petVaccinations ? [petVaccinations] : []}
          addVaccination={addVaccination}
        />
      )}
      {activeTab === "Grooming" && (
        <Grooming
          petId={id}
          Petgrooming={petGroomings || []}
          addGrooming={addGrooming}
        />
      )}
      {activeTab === "Bookings" && (
        <Bookings
          petId={id}
          PetBooking={PetBooking}
          addBooking={addBooking}
        />
      )}
    </div>
  );
  
};

export default Details;
