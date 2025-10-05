import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import PetDetails from '../components/PetDetails'
import Details from '../components/Details'

const PetsPage: React.FC = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('Pet Details')
  const [lode, relode] = useState('Raghu')

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className="h-full shrink-0">
        <Sidebar
          onSelectCustomer={(id: number) => setSelectedCustomerId(id)}
          lode={lode}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedCustomerId ? (
          <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
            {/* PetDetails Section */}
            <div className="border-r bg-white w-full md:w-[40%] lg:w-[30%] overflow-y-auto overflow-x-hidden shadow-sm">
              <div className="min-w-0"> {/* prevents child width overflow */}
                <PetDetails
                  petId={selectedCustomerId}
                  onSalectActiveTab={setActiveTab}
                  lode={lode}
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4">
              <div className="min-w-0">
                <Details
                  activeTab={activeTab}
                  petId={selectedCustomerId}
                  OnLode={relode}
                  lode={lode}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a customer to view details
          </div>
        )}
      </div>
    </div>
  )
}

export default PetsPage
