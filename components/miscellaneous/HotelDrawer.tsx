/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Cancel01Icon,
    Location01Icon,
    Calendar03Icon,
    ArrowRight02Icon,
    Loading03Icon,
    StarIcon,
    Search01Icon,
    UserGroupIcon
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axiosInstance from '@/lib/axios';
import { useHotelStore } from '@/lib/store/useHotelStore';
import { useToast } from '@/hooks/use-toast';
import EmptyState from '../EmptyState';
import Image from 'next/image';

interface HotelDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HotelDrawer({ isOpen, onClose }: HotelDrawerProps) {
    const { toast } = useToast();
    const addHotel = useHotelStore((state) => state.addHotel);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [step, setStep] = useState<'form' | 'results'>('form');

    const [formData, setFormData] = useState({
        location: 'New York',
        arrivalDate: '2025-05-20',
        departureDate: '2025-05-25',
        adults: 1,
        roomQty: 1
    });

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            // First search for location ID
            const locationRes = await axiosInstance.get('/hotels/searchDestination', {
                params: { query: formData.location }
            });

            const destId = locationRes.data.data?.[0]?.dest_id;

            if (!destId) {
                toast({
                    title: "Not Found",
                    description: "Location not found. Please try another city.",
                    variant: "destructive"
                });
                return;
            }

            // Then search for hotels using destId
            const response = await axiosInstance.get('/hotels/searchHotels', {
                params: {
                    dest_id: destId,
                    search_type: 'CITY',
                    arrival_date: formData.arrivalDate,
                    departure_date: formData.departureDate,
                    adults_number: formData.adults,
                    room_number: formData.roomQty,
                    units: 'metric',
                    order_by: 'popularity',
                    filter_by: 'none',
                    locale: 'en-gb'
                }
            });

            setSearchResults(response?.data?.data?.hotels || []);
            setStep('results');
        } catch (error) {
            console.error('Error searching hotels:', error);
            toast({
                title: "Error",
                description: "Failed to search hotels. Please check your API key and parameters.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectHotel = (hotel: any) => {
        const arrival = new Date(formData.arrivalDate);
        const departure = new Date(formData.departureDate);
        const diffDays = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));

        const newHotel = {
            id: hotel.hotel_id,
            name: hotel.hotel_name,
            address: hotel.address || "Address not available",
            rating: hotel.review_score || 8.0,
            totalReviews: hotel.review_nr || 0,
            roomType: "Standard Room",
            totalPrice: `₦ ${(hotel.price_breakdown?.all_inclusive_price || 120000).toLocaleString()}`,
            pricePerNight: `₦ ${(hotel.price_breakdown?.gross_price || 12000).toLocaleString()}`,
            nights: diffDays,
            rooms: formData.roomQty,
            checkIn: formData.arrivalDate,
            checkOut: formData.departureDate,
            facilities: [
                { icon: 'pool' as const, label: 'Pool' },
                { icon: 'bar' as const, label: 'Bar' }
            ],
            images: [hotel.main_photo_url || '/assets/hotel-image.png']
        };

        addHotel(newHotel);
        onClose();
        setStep('form');
        setSearchResults([]);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-101 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="p-6 border-b border-[#E4E7EC] flex justify-between items-center whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#E7F0FF] rounded-lg flex items-center justify-center">
                            <HugeiconsIcon icon={Location01Icon} size={24} className="text-[#0D6EFD]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-[#1D2433]">
                                {step === 'form' ? 'Add Hotel' : 'Select Hotel'}
                            </h2>
                            <p className="text-sm text-[#647995]">
                                {step === 'form' ? 'Find accommodation for your trip' : `${searchResults.length} hotels found`}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#F0F2F5] rounded-lg transition-colors cursor-pointer"
                    >
                        <HugeiconsIcon icon={Cancel01Icon} size={24} className="text-[#647995]" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    {step === 'form' ? (
                        <>
                            {/* Location */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#344054]">Location</label>
                                <div className="relative">
                                    <HugeiconsIcon
                                        icon={Search01Icon}
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                                    />
                                    <Input
                                        placeholder="City (e.g. New York)"
                                        className="pl-10 h-12"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#344054]">Check In</label>
                                    <div className="relative">
                                        <HugeiconsIcon
                                            icon={Calendar03Icon}
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                                        />
                                        <Input
                                            type="date"
                                            className="pl-10 h-12"
                                            value={formData.arrivalDate}
                                            onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#344054]">Check Out</label>
                                    <div className="relative">
                                        <HugeiconsIcon
                                            icon={Calendar03Icon}
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                                        />
                                        <Input
                                            type="date"
                                            className="pl-10 h-12"
                                            value={formData.departureDate}
                                            onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Guests */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#344054]">Adults</label>
                                    <div className="relative">
                                        <HugeiconsIcon
                                            icon={UserGroupIcon}
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                                        />
                                        <Input
                                            type="number"
                                            min="1"
                                            className="pl-10 h-12"
                                            value={formData.adults}
                                            onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#344054]">Rooms</label>
                                    <Input
                                        type="number"
                                        min="1"
                                        className="h-12"
                                        value={formData.roomQty}
                                        onChange={(e) => setFormData({ ...formData, roomQty: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => setStep('form')}
                                className="text-sm font-medium text-[#0D6EFD] hover:underline flex items-center gap-1 mb-2"
                            >
                                <HugeiconsIcon icon={ArrowRight02Icon} size={16} className="rotate-180" />
                                Back to search
                            </button>
                            {searchResults.length === 0 ? (
                                <EmptyState
                                    icon='/assets/empty-hotel.svg'
                                    message="No hotel was found"
                                    buttonText="Search again"
                                    onButtonClick={() => setStep('form')}
                                    iconSize={120}
                                />
                            ) : (
                                searchResults.map((hotel) => (
                                    <div
                                        key={hotel.hotel_id}
                                        className="p-4 border border-[#E4E7EC] rounded-xl hover:border-[#0D6EFD] transition-colors cursor-pointer group flex gap-4"
                                        onClick={() => handleSelectHotel(hotel)}
                                    >
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                            {hotel.main_photo_url ? (
                                                <Image
                                                    src={hotel.main_photo_url}
                                                    alt={hotel.hotel_name}
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <HugeiconsIcon icon={Location01Icon} size={24} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-[#1D2433] truncate">{hotel.hotel_name}</h4>
                                            <div className="flex items-center gap-1 mt-1 text-xs text-[#647995]">
                                                <HugeiconsIcon icon={StarIcon} size={12} className="text-[#F59E0B]" />
                                                <span>{hotel.review_score?.toFixed(1) || "8.0"}</span>
                                                <span>({hotel.review_nr || "0"})</span>
                                            </div>
                                            <div className="mt-2 text-right">
                                                <span className="font-bold text-[#0D6EFD]">₦ {(hotel.price_breakdown?.all_inclusive_price || 120000).toLocaleString()}</span>
                                                <p className="text-[10px] text-[#647995]">Total Price</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#E4E7EC] bg-[#F9FAFB]">
                    <Button
                        disabled={isLoading || (step === 'results' && searchResults.length === 0)}
                        className="w-full bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white h-12 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        onClick={step === 'form' ? handleSearch : undefined}
                    >
                        {isLoading ? (
                            <HugeiconsIcon icon={Loading03Icon} size={20} className="animate-spin" />
                        ) : step === 'form' ? (
                            <>
                                Search Hotels
                                <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
                            </>
                        ) : (
                            'Select a hotel above'
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
