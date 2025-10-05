import React, { FC, useState, useEffect, ChangeEvent, useRef } from 'react'
import { Camera } from 'lucide-react' // icon (from lucide-react)
import { usePet, useAvatar, useEditImage } from '../hooks/usePets'

interface PetDetailsProps {
  petId: number | null
  onSalectActiveTab?: (t: string) => void
  lode?: string
}

const tabs = ['Pet Details', 'Photos', 'Vaccinations', 'Grooming', 'Bookings']

const PetDetails: FC<PetDetailsProps> = ({ petId, onSalectActiveTab, lode }) => {
  const id = petId || 1
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [formData, setFormData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<string>(tabs[0])
  const [preview, setPreview] = useState<string | null>(null)

  // hooks
  const { avatar, refetch: refetchAvatar } = useAvatar(id)
  const { pet, refetch: refetchPet } = usePet(id)
  const { EditGAvtarfunc, updatedAvtar } = useEditImage()

  useEffect(() => {
    if (lode) {
      refetchPet()
      refetchAvatar()
    }
  }, [lode, refetchPet, refetchAvatar,petId])

  useEffect(() => {
    if (pet) setFormData(pet)
  }, [pet])

  useEffect(() => {
    if (updatedAvtar) setPreview(updatedAvtar.petAvatar)
  }, [updatedAvtar])

  /** Handle file selection */
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) return
  const file = e.target.files[0]

  // Preview image immediately
  const reader = new FileReader()
  reader.onloadend = () => setPreview(reader.result as string)
  reader.readAsDataURL(file)

  // Simulate saving URL to JSON-server
  const fakeUrl = `src/assets/${file.name}`
  await EditGAvtarfunc(id, { petAvatar: fakeUrl })

  refetchAvatar()

  // Reload the browser to reflect the new image
 
}


  return (
    <div className="border p-4 m-4 bg-white rounded-lg shadow w-max max-w-full">
      <div className="flex flex-col relative p-4">
        {/* Avatar & Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full bg-orange-300 flex items-center justify-center overflow-hidden">
            <img
              src={preview || avatar?.petAvatar || undefined}
              alt="Pet Avatar"
              className="w-full h-full object-cover"
            />

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Camera/Edit icon button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
            >
              <Camera size={16} className="text-gray-600" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-lg">{formData?.name || 'Dog 1'}</h4>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                {formData?.status || 'Active'}
              </span>
            </div>
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Tabs for desktop */}
        <nav className="w-full hidden md:block mb-4">
          <ul className="space-y-1">
            {tabs.map((t) => (
              <li key={t}>
                <button
                  onClick={() => {
                    setActiveTab(t)
                    onSalectActiveTab?.(t)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === t
                      ? 'bg-purple-50 text-[#e44b6a] font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tabs for mobile */}
        <div className="w-full md:hidden flex gap-1 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => {
                setActiveTab(t)
                onSalectActiveTab?.(t)
              }}
              className={`px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                activeTab === t
                  ? 'bg-purple-50 text-[#e44b6a] font-semibold'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="mt-4">
          <p>
            Showing content for: <strong>{activeTab}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PetDetails
