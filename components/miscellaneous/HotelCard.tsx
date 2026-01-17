import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Location01Icon,
    ArrowRight01Icon,
    ArrowLeft01Icon,
    Cancel01Icon,
    Calendar03Icon,
    SwimmingIcon,
    BedIcon,
    StarIcon,
    DrinkIcon
} from '@hugeicons/core-free-icons';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import Image from 'next/image';

interface HotelCardProps {
    name?: string;
    address?: string;
    rating?: number;
    totalReviews?: number;
    roomType?: string;
    totalPrice?: string;
    pricePerNight?: string;
    nights?: number;
    rooms?: number;
    checkIn?: string;
    checkOut?: string;
    facilities?: Array<{
        icon: 'pool' | 'bar' | 'bed';
        label: string;
    }>;
    images?: string[];
    onDelete?: () => void;
}

export default function HotelCard({
    name = "Riviera Resort, Lekki",
    address = "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1",
    rating = 8.5,
    totalReviews = 436,
    roomType = "King size room",
    totalPrice = "₦ 123,450.00",
    pricePerNight = "₦ 560,000",
    nights = 10,
    rooms = 1,
    checkIn = "20-04-2024",
    checkOut = "29-04-2024",
    facilities = [
        { icon: 'pool' as const, label: 'Pool' },
        { icon: 'bar' as const, label: 'Bar' }
    ],
    images = [
        '/assets/hotel-image.png',
        '/assets/hotel-image.png',
        '/assets/hotel-image.png',
    ],
    onDelete
}: HotelCardProps) {
    const getFacilityIcon = (iconType: 'pool' | 'bar' | 'bed') => {
        switch (iconType) {
            case 'pool':
                return SwimmingIcon;
            case 'bar':
                return DrinkIcon;
            case 'bed':
                return BedIcon;
            default:
                return SwimmingIcon;
        }
    };

    return (
        <div className="relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow bg-white flex flex-col md:flex-row">
            <div className="flex flex-col md:flex-row w-full py-4 md:py-6 pl-4 pr-11 md:pr-0">
                {/* Image Carousel Section */}
                <div className="relative w-full md:w-58 h-48 md:h-56 shrink-0 bg-white rounded-lg overflow-hidden mb-4 md:mb-0">
                    <Carousel className="w-full h-full">
                        <CarouselContent className="h-full">
                            {images.map((image, index) => (
                                <CarouselItem key={index} className="h-full">
                                    {!image ? <div className="relative h-48 md:h-58 w-full bg-linear-to-br from-blue-400 to-green-400">
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-xs md:text-sm">
                                            Hotel Image {index + 1}
                                        </div>
                                    </div> :
                                        <Image src={image} alt={`${name} - ${index + 1}`} className="w-full h-full object-cover" width={400} height={400} />}
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white border-0 shadow-md">
                            <HugeiconsIcon
                                icon={ArrowLeft01Icon}
                                size={16}
                                strokeWidth={2}
                            />
                        </CarouselPrevious>
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white border-0 shadow-md">
                            <HugeiconsIcon
                                icon={ArrowRight01Icon}
                                size={16}
                                strokeWidth={2}
                            />
                        </CarouselNext>
                    </Carousel>
                </div>

                <div className='flex flex-col w-full'>
                    <div className='flex justify-between w-full px-0 md:px-4 pb-4.5 pr-0 md:pr-11'>
                        {/* Hotel Details Section */}
                        <div className="flex-1">
                            {/* Hotel Name and Address */}
                            <div className='flex flex-col xl:flex-row justify-between gap-4'>
                                <div className="flex flex-col gap-2">
                                    <div className='flex flex-col gap-0.5 max-w-full xl:max-w-111.25'>
                                        <h3 className="text-lg md:text-xl font-bold text-black">{name}</h3>
                                        <p className="text-sm md:font-medium text-[#1D2433]">{address}</p>
                                    </div>

                                    {/* Rating and Room Type */}
                                    <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                                        <button className="flex items-center gap-1 text-[#0D6EFD] hover:underline text-sm md:text-base">
                                            <HugeiconsIcon
                                                icon={Location01Icon}
                                                size={14}
                                                strokeWidth={2}
                                            />
                                            <span className='font-medium'>Show in map</span>
                                        </button>

                                        <div className="flex items-center gap-2 text-sm md:text-base">
                                            <div className="flex items-center gap-1 rounded font-medium">
                                                <HugeiconsIcon
                                                    icon={StarIcon}
                                                    size={14}
                                                    className="text-[#F59E0B]"
                                                    strokeWidth={2}
                                                />
                                                <span className=" text-[#676E7E]">{rating}</span>
                                                <span className="text-[#676E7E]">({totalReviews})</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 font-medium text-[#676E7E] text-sm md:text-base">
                                            <HugeiconsIcon
                                                icon={BedIcon}
                                                size={14}
                                                strokeWidth={2}
                                            />
                                            <span>{roomType}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left xl:text-right flex flex-col gap-1 border-t border-dashed xl:border-0 pt-4 xl:pt-0">
                                    <p className="text-2xl md:text-[28px] font-semibold text-[#1D2433]">{totalPrice}</p>
                                    <p className="text-sm md:font-medium text-[#1D2433]">Total Price: {pricePerNight}</p>
                                    <p className="text-xs md:font-medium text-[#676E7E]">{rooms} room x {nights} nights incl. taxes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full border-t border-[#E4E7EC] flex flex-col lg:flex-row lg:items-center justify-between p-4 pr-0 md:pr-11 gap-4">
                        {/* Facilities */}
                        <div className="flex items-center gap-3 text-sm md:text-lg overflow-x-auto whitespace-nowrap">
                            <span className="font-medium text-[#647995]">Facilities:</span>
                            <div className="flex items-center gap-3">
                                {facilities.map((facility, index) => (
                                    <div key={index} className="flex items-center gap-1 text-[#647995]">
                                        <HugeiconsIcon
                                            icon={getFacilityIcon(facility.icon)}
                                            size={20}
                                            color='#475367'
                                            strokeWidth={2}
                                        />
                                        <span>{facility.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6">
                            <div className="flex items-center gap-2 text-sm md:text-lg font-medium text-[#647995]">
                                <HugeiconsIcon
                                    icon={Calendar03Icon}
                                    size={16}
                                    strokeWidth={2}
                                />
                                <span>Check In: {checkIn}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm md:text-lg font-medium text-[#647995]">
                                <HugeiconsIcon
                                    icon={Calendar03Icon}
                                    size={16}
                                    strokeWidth={2}
                                />
                                <span>Check Out: {checkOut}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 pb-0 pr-0 md:pr-12 border-t border-[#E4E7EC] gap-4">
                        <div className="flex items-center gap-4">
                            <button className="text-sm md:text-lg cursor-pointer font-medium text-[#0D6EFD] hover:underline">
                                Hotel details
                            </button>
                            <button className="text-sm md:text-lg cursor-pointer font-medium text-[#0D6EFD] hover:underline">
                                Price details
                            </button>
                        </div>
                        <button className="text-sm md:text-lg cursor-pointer font-medium text-[#0D6EFD] hover:underline text-left sm:text-right">
                            Edit details
                        </button>
                    </div>
                </div>

            </div>
            <div
                className='w-full max-w-11.5 self-stretch bg-[#FBEAE9] flex justify-center items-center text-[#9E0A05] cursor-pointer rounded-r-lg'
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