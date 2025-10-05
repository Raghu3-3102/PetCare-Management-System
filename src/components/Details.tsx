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
  useEditBooking,
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
  const { EditGBookingfunc } = useEditBooking();
  const { addVaccination } = useAddVaccination();
  const { addGrooming } = useAddGrooming();
  const { addBooking } = useAddBooking();

  const [formData, setFormData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (pet) setFormData(pet);
  }, [pet]);

  const [vaccinationForm, setVaccinationForm] = useState<any>(null);
  const [isEditingVaccination, setIsEditingVaccination] = useState(false);
  useEffect(() => {
    if (petVaccinations) setVaccinationForm(petVaccinations);
  }, [petVaccinations]);

  const [groomingForm, setGroomingForm] = useState<any>(null);
  const [isEditingGrooming, setIsEditingGrooming] = useState(false);
  useEffect(() => {
    if (petGroomings) setGroomingForm(petGroomings);
  }, [petGroomings]);

  const [bookingForm, setBookingForm] = useState<any>(null);
  const [isEditingBooking, setIsEditingBooking] = useState(false);
  useEffect(() => {
    if (PetBooking) setBookingForm(PetBooking);
  }, [PetBooking]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleVaccinationChange = (key: string, value: string) => {
    setVaccinationForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleGroomingChange = (key: string, value: string) => {
    setGroomingForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!formData) return;
    const updated = await editPet(id, formData);
    await editClient(id, {
      status: formData.status,
      clientEmail: formData.clientEmail,
      petsname: formData.name,
      petstype: formData.type,
      petsbreed: formData.breed,
      petImage: formData.photos?.[0] || "",
    });
    if (updated) {
      setFormData(updated);
      await refetchPet();
    }
    setIsEditing(false);
    OnLode?.(formData.name);
  };

  const handleSaveVaccination = async () => {
    if (!vaccinationForm) return;
    const updated = await editVactinationfunc(id, vaccinationForm);
    if (updated) setVaccinationForm(updated);
    setIsEditingVaccination(false);
  };

  const handleSaveGrooming = async () => {
    if (!groomingForm) return;
    const updated = await EditGroomingfunc(id, groomingForm);
    if (updated) setGroomingForm(updated);
    setIsEditingGrooming(false);
  };

  if (!formData) return <div className="p-6 text-center text-gray-500">⏳ Loading pet data...</div>;

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
