import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface PetInfoProps {
  id: number;
  pet: any;
  editPet: (id: number, data: any) => Promise<any>;
  editClient: (id: number, data: any) => Promise<any>;
  refetchPet: () => Promise<void>;
  OnLode?: (name: string) => void;
}

const PetInfo: React.FC<PetInfoProps> = ({ id, pet, editPet, editClient, refetchPet, OnLode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(pet);

  useEffect(() => {
    if (pet) setFormData(pet);
  }, [pet]);

  const handleChange = (key: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const validateFields = () => {
    const requiredFields = ["name", "type", "breed", "gender", "size"];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }

    if (new Date(formData.dob) > new Date()) {
      toast.error("DOB cannot be greater than today");
      return false;
    }

    const weight = parseFloat(formData.weightKg);
    if (isNaN(weight) || weight < 0 || weight > 200) {
      toast.error("Weight must be a number between 0 and 200");
      return false;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(formData.weightKg.toString())) {
      toast.error("Weight can have max 2 decimal places");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    const oldData = { ...formData };
    try {
      const updated = await editPet(id, formData);
      await editClient(id, {
        status: formData.status,
        clientEmail: formData.clientEmail,
        petsname: formData.name,
        petstype: formData.type,
        petsbreed: formData.breed,
        petImage: formData.photos?.[0] || "",
      });

      if (updated) setFormData(updated);
      await refetchPet();
      setIsEditing(false);
      OnLode?.(formData.name);
      toast.success("Pet info updated successfully");
    } catch (error) {
      setFormData(oldData);
      toast.error("Failed to save. Changes reverted.");
    }
  };

  const renderField = (label: string, key: keyof typeof formData, type: string = "text") => {
    if ((key === "gender" || key === "status") && isEditing) {
      const options = key === "gender" ? ["Male", "Female"] : ["Active", "Inactive"];
      return (
        <div className="text-left">
          <div className="text-gray-500 font-semibold text-xs mb-0.5">{label}</div>
          <div className="flex gap-4">
            {options.map((opt) => (
              <label key={opt} className="text-sm">
                <input
                  type="radio"
                  name={key}
                  value={opt}
                  checked={formData[key] === opt}
                  onChange={() => handleChange(key, opt)}
                    className="focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="text-left">
        <div className="text-gray-500 font-semibold text-xs mb-0.5">{label}</div>
        {isEditing ? (
          <input
            type={type}
            value={formData?.[key] ?? ""}
            onChange={(e) => handleChange(key, e.target.value)}
            className="border rounded px-2 py-1 text-sm w-full
            focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <div className="text-gray-900 font-medium text-sm">{formData?.[key]}</div>
        )}
      </div>
    );
  };

  if (!formData) return <div className="p-6 text-center text-gray-500">⏳ Loading pet data...</div>;

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-bold text-gray-800">🐾 Pet Details</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white text-sm px-3 py-1 rounded"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white text-sm px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setFormData(pet);
                  setIsEditing(false);
                }}
                className="bg-gray-400 text-white text-sm px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField("Name", "name")}
          {renderField("Status", "status")}
          {renderField("Type", "type")}
          {renderField("Breed", "breed")}
          {renderField("Size", "size")}
          {renderField("Temper", "temper")}
          {renderField("Color", "color")}
          {renderField("Gender", "gender")}
          {renderField("Weight (Kg)", "weightKg", "number")}
          {renderField("DOB", "dob", "date")}
          {renderField("Attributes", "attributes")}
          {renderField("Customer Notes", "customerNotes")}
          {renderField("Client Email", "clientEmail")}
        </div>
      </div>
    </div>
  );
};

export default PetInfo;
