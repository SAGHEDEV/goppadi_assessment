import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Cancel01Icon,
    Luggage02Icon,
    FlimSlateIcon,
    SpoonAndKnifeIcon,
    TabletConnectedUsbIcon,
    AirplaneTakeOff01Icon,
    AirplaneLanding01Icon
} from '@hugeicons/core-free-icons';
import { Badge } from '../ui/badge';

interface FlightCardProps {
    id?: string;
    airline?: string;
    flightNumber?: string;
    departureTime?: string;
    departureDate?: string;
    departureAirport?: string;
    arrivalTime?: string;
    arrivalDate?: string;
    arrivalAirport?: string;
    duration?: string;
    flightType?: string;
    price?: string;
    facilities?: {
        baggage?: string;
        cabinBaggage?: string;
        entertainment?: boolean;
        meal?: boolean;
        usb?: boolean;
    };
    onDelete?: () => void;
}

export default function FlightCard({
    airline = "American Airlines",
    flightNumber = "AA-829",
    departureTime = "08:35",
    departureDate = "Sun 30 Aug",
    departureAirport = "LOS",
    arrivalTime = "09:55",
    arrivalDate = "Sun 30 Aug",
    arrivalAirport = "SIN",
    duration = "1h 45m",
    flightType = "Direct",
    price = "₦ 123,450.00",
    facilities = {
        baggage: "20kg",
        cabinBaggage: "Cabin Baggage 8kg",
        entertainment: true,
        meal: true,
        usb: true
    },
    onDelete
}: FlightCardProps) {
    return (
        <div className='relative rounded-lg hover:shadow-sm transition-shadow bg-white flex items-center h-full'>
            <div className='w-full'>
                {/* Main Flight Info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 md:p-6 gap-6">
                    {/* Airline Info */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-red-600 font-bold text-sm md:text-lg">{airline.substring(0, 2).toUpperCase()}</span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#1D2433] text-lg md:text-xl">{airline}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[#676E7E] text-sm">{flightNumber}</span>
                                <Badge variant="secondary" className="bg-[#0A369D] font-medium text-white text-[10px] md:text-xs px-2 py-0.5 md:py-1 rounded">
                                    {airline === 'American Airlines' ? 'First Class' : 'Economy'}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Flight Route and Timeline */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-10 flex-1 w-full lg:max-w-xl">
                        {/* Departure */}
                        <div className='flex flex-row md:flex-col gap-2 md:gap-0.5 items-center md:items-end w-full sm:w-auto justify-between sm:justify-start'>
                            <p className="text-xl md:text-2xl font-semibold text-[#101828] order-2 md:order-1">{departureTime}</p>
                            <p className="text-sm text-[#676E7E] order-1 md:order-2">{departureDate}</p>
                        </div>

                        {/* Duration and Flight Path */}
                        <div className="w-full flex-1 flex flex-col gap-3">
                            <div className="text-center flex items-center justify-between gap-4">
                                <HugeiconsIcon
                                    icon={AirplaneTakeOff01Icon}
                                    size={18}
                                    className="text-[#475367]"
                                    strokeWidth={2}
                                />
                                <p className="font-medium text-[#676E7E] text-xs md:text-sm">Duration: {duration}</p>
                                <HugeiconsIcon
                                    icon={AirplaneLanding01Icon}
                                    size={18}
                                    className="text-[#475367]"
                                    strokeWidth={2}
                                />
                            </div>
                            <div className="relative w-full h-1.5 md:h-2 rounded-full bg-[#E7F0FF] flex justify-center items-center">
                                <div className="h-full w-[40%] bg-[#0D6EFD] rounded-full"></div>
                            </div>
                            <div className="flex justify-between items-center whitespace-nowrap text-sm md:text-base">
                                <span className="font-semibold text-[#1D2433]">{departureAirport}</span>
                                <p className="font-medium text-[#676E7E] mx-2 md:mx-4">{flightType}</p>
                                <span className="font-semibold text-[#1D2433]">{arrivalAirport}</span>
                            </div>
                        </div>

                        {/* Arrival */}
                        <div className='flex flex-row md:flex-col gap-2 md:gap-0.5 items-center md:items-end w-full sm:w-auto justify-between sm:justify-start'>
                            <p className="text-xl md:text-2xl font-semibold text-[#101828] order-2 md:order-1">{arrivalTime}</p>
                            <p className="text-sm text-[#676E7E] order-1 md:order-2">{arrivalDate}</p>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="w-full lg:w-auto text-left lg:text-right border-t border-dashed lg:border-0 pt-4 lg:pt-0">
                        <p className="text-xl md:text-2xl font-bold text-[#1D2433]">{price}</p>
                    </div>
                </div>

                {/* Facilities */}
                <div className="border-t border-[#E4E7EC] p-6">
                    <p className="text-sm font-medium text-[#647995] mb-3">Facilities:</p>
                    <div className="flex items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2 text-lg font-medium text-[#647995]">
                            <HugeiconsIcon
                                icon={Luggage02Icon}
                                size={20}
                                className="text-[#475367]"
                                strokeWidth={2}
                            />
                            <span>Baggage: {facilities.baggage}, {facilities.cabinBaggage}</span>
                        </div>
                        {facilities.entertainment && (
                            <div className="flex items-center gap-2 text-lg font-medium text-[#647995]">
                                <HugeiconsIcon
                                    icon={FlimSlateIcon}
                                    size={20}
                                    className="text-[#475367]"
                                    strokeWidth={2}
                                />
                                <span>In flight entertainment</span>
                            </div>
                        )}
                        {facilities.meal && (
                            <div className="flex items-center gap-2 text-lg font-medium text-[#647995]">
                                <HugeiconsIcon
                                    icon={SpoonAndKnifeIcon}
                                    size={20}
                                    className="text-[#475367]"
                                    strokeWidth={2}
                                />
                                <span>In flight meal</span>
                            </div>
                        )}
                        {facilities.usb && (
                            <div className="flex items-center gap-2 text-lg font-medium text-[#647995]">
                                <HugeiconsIcon
                                    icon={TabletConnectedUsbIcon}
                                    size={20}
                                    className="text-[#475367]"
                                    strokeWidth={2}
                                />
                                <span>USB Port</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-[#E4E7EC] p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="text-lg font-medium text-[#0D6EFD] hover:underline cursor-pointer">
                            Flight details
                        </button>
                        <button className="text-lg font-medium text-[#0D6EFD] hover:underline cursor-pointer">
                            Price details
                        </button>
                    </div>
                    <button className="text-lg font-medium text-[#0D6EFD] hover:underline cursor-pointer">
                        Edit details
                    </button>
                </div>
            </div>
            <div
                className='w-full max-w-11.5 self-stretch bg-[#FBEAE9] flex justify-center items-center text-[#9E0A05] cursor-pointer rounded-r-lg hover:bg-[#f8d7d5] transition-colors'
                onClick={onDelete}
            >
                <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                />
            </div>
        </div>
    );
}