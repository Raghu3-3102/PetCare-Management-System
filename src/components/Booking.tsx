import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface BookingsProps {
  petId: number;
  PetBooking: any[]; // always an array
  // EditGBookingfunc: (id: number, data: any[]) => Promise<any>;
  addBooking?: (booking: any) => Promise<any>;
}

const Bookings: FC<BookingsProps> = ({
  petId,
  PetBooking,
  // EditGBookingfunc,
  addBooking,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // ✅ loading state

  useEffect(() => {
    if (PetBooking) setList([...PetBooking]);
  }, [PetBooking]);

  const handleChange = (index: number, key: string, value: string) => {
    const updated = [...list];
    updated[index][key] = value;
    setList(updated);
  };

  const handleAdd = () => {
    const newBooking = {
      id: petId, 
      petId: Number(petId) + 100, 
      type: "",
      status: "",
      start: "",
      end: "",
    };
    setList(prev => [...prev, newBooking]);
    setIsEditing(true);
    
  };

  const handleSave = async () => {
    setLoading(true); // start loading
    try {
      if (addBooking && list.length) {
        await addBooking(list[list.length - 1]); 
      }
      toast.success("Booking row added successfully");
      // await EditGBookingfunc(petId, list);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">🏨 Booking Details</h2>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
          disabled={loading} // disable while loading
        >
          Add
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Pet ID</th>
            </tr>
          </thead>
          <tbody>
            {list.map((b, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={b.type || ""}
                      onChange={(e) => handleChange(i, "type", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                      disabled={loading} // disable input while loading
                    />
                  ) : (
                    b.type
                  )}
                </td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={b.status || ""}
                      onChange={(e) => handleChange(i, "status", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                      disabled={loading}
                    />
                  ) : (
                    b.status
                  )}
                </td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="date"
                      value={b.start || ""}
                      onChange={(e) => handleChange(i, "start", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                      disabled={loading}
                    />
                  ) : (
                    b.start
                  )}
                </td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="date"
                      value={b.end || ""}
                      onChange={(e) => handleChange(i, "end", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                      disabled={loading}
                    />
                  ) : (
                    b.end
                  )}
                </td>
                <td className="px-4 py-2">{b.petId}</td>
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
            disabled={loading} // disable while saving
          >
            {loading ? "Saving..." : "Save"} {/* show loader text */}
          </button>
          <button
            onClick={() => {
              setList([...PetBooking]);
              setIsEditing(false);
            }}
            className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookings;
