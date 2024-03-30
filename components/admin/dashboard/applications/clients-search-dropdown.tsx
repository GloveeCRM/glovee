'use client'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { fetchClientsByOrgName } from '@/lib/data/user'
import { User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { IoCloseOutline } from 'react-icons/io5'

interface ClientSearchDropdownProps {
  orgName: string
  selectedClientId: string | null
  setSelectedClientId: (clientId: string) => void
}

export default function ClientSearchDropdown({
  orgName,
  selectedClientId,
  setSelectedClientId,
}: ClientSearchDropdownProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [clients, setClients] = useState<User[] | null>(null)
  const [isLoadingClients, setIsLoadingClients] = useState(true)

  useEffect(() => {
    fetchClientsByOrgName(orgName)
      .then((clients) => {
        setClients(clients)
      })
      .catch(() => setClients(null))
      .finally(() => setIsLoadingClients(false))
  }, [orgName, setClients, setIsLoadingClients])

  const filteredClients =
    searchTerm.trim() === ''
      ? clients
      : clients?.filter(
          (client) =>
            client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.id.includes(searchTerm)
        )

  console.log(filteredClients)

  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId)
  }

  if (isLoadingClients) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <label htmlFor="clientName" className="mb-[4px] block text-[14px] text-n-700">
        Client Name
      </label>
      <div className="relative">
        <input
          type="text"
          id="client-name"
          name="clientName"
          className="mb-[14px] w-full rounded border border-n-400 px-[8px] py-[3px] text-[14px]  text-gray-700"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onFocus={() => {
            setIsSearching(true)
          }}
          onBlur={() => {
            setTimeout(() => setIsSearching(false), 200)
          }}
          disabled={selectedClientId !== ''}
        />
        {selectedClientId !== '' && (
          <div className="absolute top-[.25px] flex w-full items-center justify-between rounded border border-n-400 bg-white px-[8px] py-[3px] text-[14px] text-gray-700">
            {clients?.find((client) => client.id === selectedClientId)?.name}
            {selectedClientId !== '' && <IoCloseOutline onClick={() => handleSelectClient('')} />}
          </div>
        )}
      </div>

      {(isSearching || searchTerm !== '') && (
        <div className="absolute z-10 mt-[4px] max-h-[100px] w-[85vw] max-w-[570px] origin-top-right overflow-auto border bg-white py-[3px] text-[14px] shadow focus:outline-none">
          {filteredClients?.map((client) => (
            <div
              key={client.id}
              className="flex w-full items-center border-b border-n-400 px-[8px] py-[3px] text-left text-[14px] hover:bg-gray-100"
              onClick={() => {
                handleSelectClient(client.id)
                setSearchTerm('')
                setIsSearching(false)
              }}
            >
              {client.image === null ? (
                <Image
                  src={DEFAULT_MALE_CLIENT_LOGO_URL}
                  alt="CLient Logo"
                  width={25}
                  height={25}
                  className="rounded-full"
                />
              ) : (
                client.image
              )}
              {client.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
