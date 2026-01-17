"use client";

import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft02Icon,
    Calendar03Icon,
    Location01Icon,
    MoreHorizontalIcon,
    Settings01Icon,
    UserAdd02Icon,
    AirplaneTakeOff01Icon
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useFlightStore } from '@/lib/store/useFlightStore';

function TripDetails({ onAddFlight, onAddActivity, onAddHotel }: { onAddFlight?: () => void, onAddActivity?: () => void, onAddHotel?: () => void }) {
    const flights = useFlightStore((state) => state.flights);

    return (
        <div className="flex flex-col gap-5">
            <div className='w-full h-full max-h-50 rounded-lg relative overflow-hidden'>
                <div className='bg-[#FFFFFF33] rounded-lg p-3 text-[#344054] absolute top-5 left-5 flex items-center gap-2 cursor-pointer hover:bg-[#FFFFFF55] transition-colors'>
                    <HugeiconsIcon
                        icon={ArrowLeft02Icon}
                        size={24}
                        color="currentColor"
                        strokeWidth={2}
                    />
                </div>
                <Image src={"/assets/banner.svg"} alt="Banner" className="w-full h-full object-cover rounded-lg" width={1412} height={200} />
            </div>

            <div className='flex flex-col md:flex-row justify-between gap-4'>
                <div className="flex flex-col items-start gap-1">
                    <div className="w-fit py-1 px-2 rounded-lg flex items-center gap-2 text-[#7A4504] bg-[#FEF4E6] mb-2">
                        <HugeiconsIcon
                            icon={Calendar03Icon}
                            size={16}
                            strokeWidth={2}
                        />
                        <span className="text-sm font-medium">21 March 2024 → 21 April 2024</span>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#101828]">Bahamas Family Trip</h1>

                        <div className="flex items-center gap-2 text-[#667085]">
                            <HugeiconsIcon
                                icon={Location01Icon}
                                size={16}
                                strokeWidth={2}
                            />
                            <span className="text-sm">New York, United States of America | Solo Trip</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row md:flex-col items-center justify-between gap-4">
                    <div className='flex items-center gap-2'>
                        <Button
                            variant="outline"
                            className="h-11.5 text-[#0D6EFD] hover:text-[#0D6EFD] px-4 md:w-40 rounded-lg bg-[#E7F0FF] hover:bg-[#d3e2fc] border-none! outline-none shadow-none cursor-pointer"
                        >
                            <HugeiconsIcon
                                icon={UserAdd02Icon}
                                size={18}
                                className="mr-2"
                                strokeWidth={2}
                            />
                        </Button>

                        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                            <HugeiconsIcon
                                icon={MoreHorizontalIcon}
                                size={28}
                                className="text-[#344054]"
                                strokeWidth={2}
                            />
                        </button>

                    </div>

                    <div className='flex items-center'>
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src="/assets/second-profile.png" alt="User" className='object-cover' />
                            <AvatarFallback className="bg-[#0D6EFD] text-white text-sm">JD</AvatarFallback>
                        </Avatar>

                        <div className='h-0.5 w-7 bg-[#E7F0FF]'></div>

                        <div className='rounded-full border-2 border-[#E7F0FF] p-3 flex justify-center items-center text-[#344054]'>
                            <HugeiconsIcon
                                icon={Settings01Icon}
                                size={14}
                                color="currentColor"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <Card className="p-3.5 bg-[#000031] text-white rounded-lg border-0 hover:shadow-xs transition-shadow flex flex-col gap-8 justify-between">
                    <div className='flex flex-col gap-2'>
                        <h3 className="font-semibold ">Activities</h3>
                        <p className="text-sm text-gray-300">
                            Build, personalize, and optimize your itineraries with our trip planner.
                        </p>
                    </div>

                    <Button
                        onClick={onAddActivity}
                        className="w-full bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white h-11 rounded-lg font-medium"
                    >
                        Add Activities
                    </Button>
                </Card>

                <Card className="p-3.5 bg-[#E7F0FF] text-[#1D2433] rounded-lg border-0 hover:shadow-xs transition-shadow flex flex-col gap-8 justify-between">
                    <div className='flex flex-col gap-2'>
                        <h3 className="font-semibold mb-2">Hotels</h3>
                        <p className="text-sm text-[#1D2433] mb-6">
                            Build, personalize, and optimize your itineraries with our trip planner.
                        </p>
                    </div>

                    <Button
                        onClick={onAddHotel}
                        className="w-full bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white h-11 rounded-lg font-medium"
                    >
                        Add Hotels
                    </Button>
                </Card>

                <Card className="p-3.5 bg-[#0D6EFD] text-white rounded-lg border-0 hover:shadow-xs transition-shadow flex flex-col gap-8 justify-between">
                    <div className='flex flex-col gap-2'>
                        <h3 className="font-semibold mb-2">Flights</h3>
                        <p className="text-sm text-blue-100 mb-6">
                            {flights.length > 0 ? (
                                <span className="flex items-center gap-1 font-bold text-lg">
                                    <HugeiconsIcon icon={AirplaneTakeOff01Icon} size={18} />
                                    {flights.length} {flights.length === 1 ? 'Flight' : 'Flights'} added
                                </span>
                            ) : (
                                "Build, personalize, and optimize your itineraries with our trip planner."
                            )}
                        </p>
                    </div>

                    <Button
                        onClick={onAddFlight}
                        className="w-full bg-white hover:bg-gray-100 text-[#0D6EFD] h-11 rounded-lg font-medium"
                    >
                        {flights.length > 0 ? 'Add More' : 'Add Flights'}
                    </Button>
                </Card>
            </div>
        </div>
    )
}

export default TripDetails