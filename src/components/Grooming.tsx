import  { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface GroomingProps {
  petId: number;
  Petgrooming: any[]; // array of grooming records
  // EditGroomingfunc: (id: number, data: any[]) => Promise<any>;
  addGrooming?: (grooming: any) => Promise<any>;
}

const Grooming: FC<GroomingProps> = ({
  petId,
  Petgrooming,
  // EditGroomingfunc,
  addGrooming,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    if (Petgrooming) setList([...Petgrooming]);
  }, [Petgrooming]);

  // handle input change
  const handleChange = (index: number, key: string, value: string) => {
    const updated = [...list];
    updated[index][key] = value;
    setList(updated);
  };

  // add new grooming row
  const handleAdd = () => {
    let newgroomId = list.length + 1;
    const newGrooming = {
      groomId: newgroomId, // unique per record
      id: petId, // client id
      petId: Number(petId) + 100, // pet id (example)
      service: "",
      date: "",
      notes: "",
    };
    setList(prev => [...prev, newGrooming]);
    setIsEditing(true);
  };

  // save all grooming changes
  const handleSave = async () => {
    if (addGrooming) {
      // send only the newly added last row (optional)
      
      await addGrooming(list[list.length - 1]);
      toast.success("Grooming added successfully");
    }
    // await EditGroomingfunc(petId, list);
    setIsEditing(false);
      // window.location.reload();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">✂️ Grooming Details</h2>
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
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Pet ID</th>
              <th className="px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {list.map((g, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={g.service || ""}
                      onChange={(e) => handleChange(i, "service", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                    />
                  ) : (
                    g.service
                  )}
                </td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="date"
                      value={g.date || ""}
                      onChange={(e) => handleChange(i, "date", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                    />
                  ) : (
                    g.date
                  )}
                </td>
                <td className="px-4 py-2">{g.petId}</td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={g.notes || ""}
                      onChange={(e) => handleChange(i, "notes", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                    />
                  ) : (
                    g.notes
                  )}
                </td>
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
              setList([...Petgrooming]);
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

export default Grooming;
