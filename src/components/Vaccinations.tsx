import React, { FC, useEffect, useState } from "react";
import { PetVaccination } from "../types/pet";
import toast from "react-hot-toast";

interface VaccinationDetailsProps {
  petId: number;
  petVaccinations: PetVaccination[];
  // editVactinationfunc: (id: number, data: PetVaccination[]) => Promise<any>;
  addVaccination: (vaccination: PetVaccination) => Promise<PetVaccination | null>;
}

const Vaccinations: FC<VaccinationDetailsProps> = ({
  petId,
  petVaccinations,
  // editVactinationfunc,
  addVaccination,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [list, setList] = useState<PetVaccination[]>([]);

  // load initial data
  useEffect(() => {
    if (petVaccinations) setList([...petVaccinations]);
  }, [petVaccinations]);

  // field change handler
  const handleChange = (index: number, key: keyof PetVaccination, value: string) => {
    const updated = [...list];
    if (key === "petId" || key === "id" || key === "vacId") {
      updated[index][key] = Number(value);
    } else {
      updated[index][key] = value;
    }
    setList(updated);
  };


  // inside handleAdd
const handleAdd = async () => {
  // filter vaccinations for this pet only
  const petVaccines = list.filter(v => v.id === petId);

  // assign vacId starting from 1 for each pet
  let newVacId = list.length + 1;
  let newPetId = Number(petId) + 100;
  const newVac: PetVaccination = {
    vacId: newVacId,  // 👈 restart per pet
    id: petId,        // client id
    petId:newPetId,            // pet id
    vaccine: " ",
    date: " ",
    due: " ",
  };

  

    setList(prev => [...prev, newVac]);
    setIsEditing(true);
    toast.success("Vaccination added successfully");
  
};




  // save changes
  const handleSave = async () => {

    const savedVac = await addVaccination(list[list.length - 1]);
      toast.success("Vaccination added successfully");
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">💉 Vaccination Details</h2>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          Add
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Vac ID</th>
              <th className="px-4 py-2">Vaccine</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Due</th>
              <th className="px-4 py-2">Pet ID</th>
            </tr>
          </thead>
          <tbody>
            {list.map((v, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{v.vacId}</td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={v.vaccine}
                      onChange={(e) => handleChange(i, "vaccine", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                    />
                  ) : v.vaccine}
                </td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="date"
                      value={v.date}
                      onChange={(e) => handleChange(i, "date", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                    />
                  ) : v.date}
                </td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="date"
                      value={v.due}
                      onChange={(e) => handleChange(i, "due", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                    />
                  ) : v.due}
                </td>
                <td className="px-4 py-2">{v.petId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Save
          </button>
          <button
            onClick={() => {
              setList([...petVaccinations]);
              setIsEditing(false);
            }}
            className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Vaccinations;
