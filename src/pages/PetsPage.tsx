import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import PetDetails from '../components/PetDetails'
import Details from '../components/Details'
import { motion } from "framer-motion";

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
          <motion.div
  className="relative flex flex-col items-center justify-center flex-1 overflow-hidden 
             bg-gradient-to-br from-[#ff9a9e] via-[#fad0c4] to-[#fbc2eb]"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  {/* Floating paw prints */}
  {[...Array(6)].map((_, i) => (
    <motion.span
      key={i}
      className="absolute text-3xl opacity-20"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -15, 0],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.5,
      }}
    >
      🐾
    </motion.span>
  ))}

  {/* Glowing backdrop behind dog */}
  <motion.div
    className="absolute w-72 h-72 bg-white/30 blur-3xl rounded-full"
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ repeat: Infinity, duration: 3 }}
  />

  {/* Animated Dog */}
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="180"
    height="180"
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 1.6 }}
  >
    <circle cx="50" cy="50" r="45" fill="#fffaf0" stroke="#fb923c" strokeWidth="2" />
    <path
      d="M60 60c0 6-5 11-10 11s-10-5-10-11c0-3 2-6 4-8l-2-5 5-1 3 4 3-4 5 1-2 5c2 2 4 5 4 8z"
      fill="#fb923c"
    />
    <circle cx="45" cy="45" r="2" fill="#000" />
    <circle cx="55" cy="45" r="2" fill="#000" />
  </motion.svg>

  {/* Text */}
  <motion.p
    className="text-2xl font-semibold mt-6 text-gray-800 drop-shadow-lg"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
  >
    Select a customer to view details 🐶
  </motion.p>

  <motion.span
    className="text-base text-gray-700 mt-2 italic"
    animate={{ opacity: [0.4, 1, 0.4] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    (Your furry friend is wagging its tail 🐾)
  </motion.span>
</motion.div>

        )}
      </div>
    </div>
  )
}

export default PetsPage
