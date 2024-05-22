'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { searchClients } from '@/lib/data/user'
import { UserType } from '@/lib/types/user'

interface ClientSearchDropdownProps {
  orgName: string
  selectedClientID: number | null
  setSelectedClientID: (clientID: number) => void
}

export default function ClientSearchDropdown({
  orgName,
  selectedClientID,
  setSelectedClientID,
}: ClientSearchDropdownProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [clients, setClients] = useState<UserType[] | null>(null)
  const [isLoadingClients, setIsLoadingClients] = useState(true)

  console.log(clients)

  useEffect(() => {
    searchClients(orgName)
      .then((clients) => {
        setClients(clients)
      })
      .catch(() => {
        setClients(null)
      })
      .finally(() => setIsLoadingClients(false))
  }, [orgName, setClients, setIsLoadingClients])

  const filteredClients =
    searchTerm.trim() === ''
      ? clients
      : clients?.filter(
          (client) =>
            client.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(client.id).includes(searchTerm)
        )

  const handleSelectClient = (clientId: number) => {
    setSelectedClientID(clientId)
  }

  const selectedClient = clients?.find((client) => client.id === selectedClientID)

  if (isLoadingClients) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          id="client-name"
          name="clientName"
          className="w-full rounded-sm border border-n-400 px-[8px] py-[3px] text-[14px]  text-gray-700 focus:outline-none"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onFocus={() => {
            setIsSearching(true)
          }}
          onBlur={() => {
            setTimeout(() => setIsSearching(false), 200)
          }}
          disabled={selectedClientID !== 0}
        />
        {selectedClientID !== 0 && (
          <div className="absolute top-0 flex w-full items-center justify-between rounded-sm border border-n-400 bg-white px-[8px] py-[3px] text-[14px] text-gray-700">
            <div className="flex items-center gap-[4px]">
              {
                <Image
                  src={selectedClient?.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
                  alt="CLient Logo"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              }
              {selectedClient?.firstName} {selectedClient?.lastName}
            </div>
            <IoCloseOutline className="cursor-pointer" onClick={() => handleSelectClient(0)} />
          </div>
        )}
      </div>

      {(isSearching || searchTerm !== '') && (
        <div className="absolute z-10 max-h-[174px] w-full overflow-auto rounded-sm border border-n-400 bg-white text-[14px] shadow-2xl">
          {filteredClients === null || filteredClients?.length === 0 ? (
            <div className="py-[4px] text-center text-n-500">No clients found</div>
          ) : (
            filteredClients?.map((client) => (
              <div
                key={client.id}
                className="flex w-full items-center border-b border-n-400 px-[8px] py-[3px] text-left text-[14px] hover:bg-gray-100"
                onClick={() => {
                  handleSelectClient(client.id)
                  setSearchTerm('')
                  setIsSearching(false)
                }}
              >
                <Image
                  src={client.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
                  alt="CLient Logo"
                  width={25}
                  height={25}
                  className="rounded-full"
                />
                {client.firstName} {client.lastName}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
