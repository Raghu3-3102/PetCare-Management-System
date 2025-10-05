import React, { useState } from "react"
import toast from "react-hot-toast"

interface PhotosProps {
  id: number
  pet: any
  editPet: (id: number, data: any) => Promise<any>
  refetchPet: () => Promise<void>
}

const Photos: React.FC<PhotosProps> = ({ id, pet, editPet, refetchPet }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [formData, setFormData] = useState<any>(pet)

  // Reset photos if pet changes
  React.useEffect(() => {
    if (pet) {
      setFormData(pet)
      setPhotoIndex(0)
    }
  }, [pet])

  const handleSave = async () => {
    const updated = await editPet(id, { ...formData, photos: formData.photos })
    if (updated) {
      setFormData(updated)
      await refetchPet()
    }
    setIsEditing(false)
    toast.success("Photos updated successfully")
  }

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-bold text-gray-800">📸 Pet Photos</h2>

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
                  setFormData(pet)
                  setIsEditing(false)
                }}
                className="bg-gray-400 text-white text-sm px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {formData?.photos && formData.photos.length > 0 ? (
          <div className="flex flex-col items-center">
            {/* main preview */}
            <img
              src={formData.photos[photoIndex]}
              alt="Pet"
              className="w-64 h-64 object-cover rounded-lg mb-4"
            />

            {/* thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
              {formData.photos.map((photo: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setPhotoIndex(index)}
                  className={`border rounded p-1 ${
                    photoIndex === index ? "border-blue-500" : ""
                  }`}
                >
                  <img
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                </button>
              ))}
            </div>

            {/* editing mode - file upload */}
            {isEditing && (
              <div className="mt-4 flex flex-col gap-3 w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        const base64 = reader.result as string
                        setFormData((prev: any) => ({
                          ...prev,
                          photos: [...(prev.photos || []), base64],
                        }))
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="border px-2 py-1 text-sm rounded"
                />

                {/* list uploaded photos with remove option */}
                {formData.photos.map((photo: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <img
                      src={photo}
                      alt={`Uploaded ${idx + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      onClick={() => {
                        if (
                          window.confirm("Are you sure you want to remove this photo?")
                        ) {
                          const updatedPhotos = formData.photos.filter(
                            (_: any, i: number) => i !== idx
                          )
                          setFormData((prev: any) => ({
                            ...prev,
                            photos: updatedPhotos,
                          }))
                          setPhotoIndex(0)
                        }
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500">
            {isEditing ? (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      const base64 = reader.result as string
                      setFormData((prev: any) => ({
                        ...prev,
                        photos: [base64],
                      }))
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="border px-2 py-1 text-sm rounded"
              />
            ) : (
              "No photos available"
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Photos
