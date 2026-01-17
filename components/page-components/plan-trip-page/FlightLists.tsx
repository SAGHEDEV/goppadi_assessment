"use client";

import FlightCard from '@/components/miscellaneous/FlightCard'
import { Button } from '@/components/ui/button'
import { AirplaneTakeOff01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'
import { useFlightStore } from '@/lib/store/useFlightStore'
import EmptyState from '@/components/EmptyState';

function FlightLists({ onAddFlight }: { onAddFlight?: () => void }) {
    const { flights, removeFlight } = useFlightStore();

    const handleDelete = (id: string) => {
        removeFlight(id);
    };

    return (
        <div className='py-4 pb-12 px-4 md:px-6 rounded-lg bg-[#F0F2F5] flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <p className='flex gap-2.5 items-center'>
                    <HugeiconsIcon
                        icon={AirplaneTakeOff01Icon}
                        size={24}
                        color="currentColor"
                        strokeWidth={1.5}
                    />
                    <span className='text-lg font-semibold text-[#1D2433]'>Flights</span>
                </p>
                <Button
                    onClick={onAddFlight}
                    className='bg-white w-38.25 px-6 py-3 rounded-lg text-[#0D6EFD] hover:text-[#0D6EFD] hover:bg-[#eae8e8] cursor-pointer h-11.5'
                >
                    Add Flights
                </Button>
            </div>
            <div className='flex flex-col gap-6'>
                {flights.length === 0 ? (
                    <EmptyState
                        icon='/empty-flight.svg' buttonText='Add Flights' onButtonClick={onAddFlight} iconSize={72} />

                ) : (
                    flights.map((flight) => (
                        <FlightCard
                            key={flight.id}
                            {...flight}
                            onDelete={() => handleDelete(flight.id)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default FlightLists