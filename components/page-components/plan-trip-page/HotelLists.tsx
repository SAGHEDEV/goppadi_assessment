"use client";

import HotelCard from '@/components/miscellaneous/HotelCard'
import { Button } from '@/components/ui/button'
import { House01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'
import { useHotelStore } from '@/lib/store/useHotelStore'
import EmptyState from '@/components/EmptyState';

function HotelLists({ onAddHotel }: { onAddHotel?: () => void }) {
    const { hotels, removeHotel } = useHotelStore();

    return (
        <div className='py-4 pb-12 px-4 md:px-6 rounded-lg bg-[#344054] flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <p className='flex gap-2.5 items-center text-white'>
                    <HugeiconsIcon
                        icon={House01Icon}
                        size={24}
                        color="currentColor"
                        strokeWidth={1.5}
                    />
                    <span className='text-lg font-semibold'>Hotels</span>
                </p>
                <Button
                    onClick={onAddHotel}
                    className='bg-white w-38.25 px-6 py-3 rounded-lg text-[#1D2433] hover:text-[#1D2433] hover:bg-[#eae8e8] cursor-pointer h-11.5'
                >
                    Add Hotels
                </Button>
            </div>
            <div className='flex flex-col gap-6'>
                {hotels.length === 0 ? (
                    <EmptyState
                        icon='/empty-hotel.svg'
                        buttonText='Add Hotel'
                        onButtonClick={onAddHotel}
                        iconSize={72}
                    />
                ) : (
                    hotels.map((hotel) => (
                        <HotelCard
                            key={hotel.id}
                            {...hotel}
                            onDelete={() => removeHotel(hotel.id)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default HotelLists