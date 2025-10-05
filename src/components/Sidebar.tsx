import React, { FC, useState, useEffect } from 'react'
import { useCustomers } from '../hooks/usePets'
import Logo from '/src/assets/logo.jpg'

interface SidebarProps {
  onSelectCustomer: (id: number) => void
  lode: string
}

const Sidebar: FC<SidebarProps> = ({ onSelectCustomer, lode }) => {
  const { customers } = useCustomers(lode)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [includeInactive, setIncludeInactive] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(handler)
  }, [query])

  // Auto-collapse sidebar under 1000px
  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth > 1000)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filtered = customers.filter(
    (c) =>
      (includeInactive ? true : c.status === 'Active') &&
      (c.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
       c.petsname.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
       c.clientEmail?.toLowerCase().includes(debouncedQuery.toLowerCase()))
  )

  const handleSelect = (id: number) => {
    setSelectedCustomerId(id)
    onSelectCustomer(id)
  }

  return (
    <aside
  className={`bg-gradient-to-b from-teal-600 via-teal-500 to-teal-400 text-white border-r shadow-lg flex flex-col h-screen overflow-hidden transition-all duration-300 ${
    isOpen ? 'w-auto px-3' : 'w-16'
  }`}
>
  {/* Toggle */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="p-2 m-2 bg-white/20 rounded-md hover:bg-white/30 text-white transition"
  >
    {isOpen ? '⬅' : '➡'}
  </button>

  {/* Logo */}
  {isOpen && (
    <div className="flex items-center gap-3 px-4 py-2 mb-4 border-b border-white/30">
      <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
      <h2 className="text-xl font-bold">Pet Portal</h2>
    </div>
  )}

  {/* Search */}
  {isOpen && (
    <div className="flex flex-col gap-2 px-4 mb-4">
      <input
        type="text"
        placeholder="Search name, email, pets"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-white/30 bg-white/20 placeholder-white/70 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
      />
      <label className="inline-flex items-center gap-2 text-sm text-white/80">
        <input
          type="checkbox"
          checked={includeInactive}
          onChange={(e) => setIncludeInactive(e.target.checked)}
          className="accent-teal-300"
        />
        Include Inactive
      </label>
    </div>
  )}

  {/* Customer List */}
  <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-3 scrollbar-hide">
    {filtered.map((c) => (
      <div
        key={c.id}
        onClick={() => handleSelect(c.id)}
        className={`flex items-center gap-3 p-3 mb-2 rounded-xl cursor-pointer transition shadow-sm
          ${selectedCustomerId === c.id ? 'bg-white/25 border border-white/40' : 'hover:bg-white/10'}`}
      >
        <div className="w-10 h-10 rounded-full bg-white text-teal-700 flex items-center justify-center font-bold text-lg">
          {c.name.charAt(0)}
        </div>

        {isOpen && (
          <div className="flex-1">
            <h3 className="font-semibold text-white">{c.name}</h3>
            <p className="text-white/80 text-sm">{c.petsname} ({c.petstype})</p>
            <p className="text-white/60 text-xs">{c.clientEmail}</p>
          </div>
        )}

        <span className={`text-xs px-2 py-1 rounded-full border ${
          c.status === 'Active'
            ? 'bg-green-100/20 border-green-200/50 text-green-200'
            : 'bg-gray-300/20 border-gray-400/40 text-gray-300'
        }`}>
          {c.status}
        </span>
      </div>
    ))}
  </div>
</aside>

  )
}

export default Sidebar
