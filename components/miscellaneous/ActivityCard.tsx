import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Location01Icon,
    StarIcon,
    ArrowRight01Icon,
    ArrowLeft01Icon,
    Cancel01Icon,
    Clock01Icon,
} from '@hugeicons/core-free-icons';
import { Badge } from '../ui/badge';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import Image from 'next/image';

interface ActivityCardProps {
    name?: string;
    description?: string;
    rating?: number;
    totalReviews?: number;
    duration?: string;
    price?: string;
    dateTime?: string;
    whatsIncluded?: string;
    seeMoreLink?: boolean;
    images?: string[];
    day?: number;
    onDelete?: () => void;
}

export default function ActivityCard({
    name = "The Museum of Modern Art",
    description = "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant",
    rating = 4.5,
    totalReviews = 436,
    duration = "1 Hour",
    price = "₦ 123,450.00",
    dateTime = "10:30 AM on Mar 19",
    whatsIncluded = "Admission to the Empire State Building",
    seeMoreLink = true,
    images = [
        '/assets/museum.png',
        '/assets/museum.png',
        '/assets/museum.png',
    ],
    day = 1,
    onDelete
}: ActivityCardProps) {
    return (
        <div className="relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow bg-white flex">
            <div className="flex w-full py-6 pl-4">
                {/* Image Carousel Section */}
                <div className="relative w-61 h-61 shrink-0 bg-white rounded-lg overflow-hidden">
                    <Carousel className="w-full h-auto">
                        <CarouselContent>
                            {images.map((image, index) => (
                                <CarouselItem key={index}>
                                    {!image ? (
                                        <div className="relative h-61 w-full bg-linear-to-br from-gray-800 to-gray-900">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-white text-xs mb-2">🎨</div>
                                                    <div className="text-white/70 text-xs">Activity Image {index + 1}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Image src={image} alt={`${name} - ${index + 1}`} className="w-full h-61 object-cover" width={400} height={400} />
                                    )}
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
                    <div className='flex justify-between w-full px-4 pb-4.5 pr-11'>
                        {/* Activity Details Section */}
                        <div className="flex-1">
                            {/* Activity Name and Description */}
                            <div className='flex justify-between'>
                                <div className="flex flex-col gap-2">
                                    <div className='flex flex-col gap-0.5 max-w-111.25'>
                                        <h3 className="text-xl font-bold text-black">{name}</h3>
                                        <p className="font-medium text-[#1D2433]">{description}</p>
                                    </div>

                                    {/* Rating, Duration, and Directions */}
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <button className="flex items-center gap-1 text-[#0D6EFD] hover:underline">
                                            <HugeiconsIcon
                                                icon={Location01Icon}
                                                size={14}
                                                strokeWidth={2}
                                            />
                                            <span className='font-medium'>Directions</span>
                                        </button>

                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 rounded font-medium">
                                                <HugeiconsIcon
                                                    icon={StarIcon}
                                                    size={14}
                                                    className="text-[#F59E0B]"
                                                    strokeWidth={2}
                                                />
                                                <span className="text-[#676E7E]">{rating}</span>
                                                <span className="text-[#676E7E]">({totalReviews})</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 font-medium text-[#676E7E]">
                                            <HugeiconsIcon
                                                icon={Clock01Icon}
                                                size={14}
                                                strokeWidth={2}
                                            />
                                            <span>{duration}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col gap-1">
                                    <p className="text-[28px] font-semibold text-[#1D2433]">{price}</p>
                                    <p className="font-medium text-[#1D2433]">{dateTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full border-t border-[#E4E7EC] flex items-center justify-between p-4 pr-11">
                        {/* What's Included */}
                        <div className="flex items-center gap-3 text-lg">
                            <span className="font-medium text-[#647995]">What&apos;s Included:</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[#647995]">{whatsIncluded}</span>
                                {seeMoreLink && (
                                    <button className="text-[#0D6EFD] hover:underline font-medium">
                                        See more
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end mt-2">
                            <Badge className="bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white px-3 py-1 rounded-lg text-sm font-medium">
                                Day {day}
                            </Badge>
                        </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center justify-between p-4 pb-0 pr-12 border-t border-[#E4E7EC]">
                        <div className="flex items-center gap-4">
                            <button className="text-lg cursor-pointer font-medium text-[#0D6EFD] hover:underline">
                                Activity details
                            </button>
                            <button className="text-lg cursor-pointer font-medium text-[#0D6EFD] hover:underline">
                                Price details
                            </button>
                        </div>
                        <button className="text-lg cursor-pointer font-medium text-[#0D6EFD] hover:underline">
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