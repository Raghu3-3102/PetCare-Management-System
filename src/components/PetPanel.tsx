import React, { FC } from 'react'
import type { Pet } from '../types/pet'

interface PetPanelProps {
  pet: Pet | null
  onAction?: () => void
  activeTab: string
  setActiveTab: (t: string) => void
}

const tabs = ['Pet Details', 'Photos', 'Vaccinations', 'Grooming', 'Bookings']

const PetPanel: FC<PetPanelProps> = ({ pet, onAction, activeTab, setActiveTab }) => {
  return (
    <div className="w-80 border-r bg-white p-6 flex flex-col relative">
      {/* Back chevron */}
      <button className="absolute -left-6 top-6 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
        <svg className="w-5 h-5 rotate-180 text-gray-500" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Avatar section */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-orange-300 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#fff"/>
              <path d="M8 14c1.333-1 2-2 4-2s2.667 1 4 2v2H8v-2z" fill="#E0E7FF"/>
              <circle cx="9.2" cy="10" r="1.1" fill="#374151"/>
              <circle cx="14.8" cy="10" r="1.1" fill="#374151"/>
            </svg>
          </div>
          <button className="absolute -right-1 -bottom-1 bg-white rounded-full border p-1 shadow">
            <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none">
              <path d="M3 21v-3.75L14.81 5.44a2 2 0 012.83 0l1.92 1.92a2 2 0 010 2.83L7.75 21H3z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-lg">{pet?.name ?? 'Dog 1'}</h4>
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{pet?.status ?? 'Active'}</span>
          </div>
          <button onClick={onAction} className="mt-1 px-3 py-1 border rounded-md text-sm bg-white flex items-center gap-1">
            Actions <span>▾</span>
          </button>
        </div>
      </div>

      {/* Date of Birth */}
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-600">Date of Birth</p>
        <p className="text-sm text-gray-800 font-semibold">{pet ? new Date(pet.dob).toLocaleDateString() : '29/07/2025'}</p>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Tabs - Vertical for desktop */}
      <nav className="w-full hidden md:block">
        <ul className="space-y-1">
          {tabs.map(t => (
            <li key={t}>
              <button 
                onClick={() => setActiveTab(t)}
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

      {/* Horizontal tabs for mobile */}
      <div className="w-full md:hidden">
        <div className="flex gap-1 overflow-x-auto pb-2">
          {tabs.map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
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
      </div>
    </div>
  )
}

export default PetPanel