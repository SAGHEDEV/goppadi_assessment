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
    const [isFetchingDetails, setIsFetchingDetails] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [destinations, setDestinations] = useState<any[]>([]);
    const [isSearchingDest, setIsSearchingDest] = useState(false);
    const [lastSelectedLocation, setLastSelectedLocation] = useState('');
    const [step, setStep] = useState<'form' | 'results'>('form');

    const [formData, setFormData] = useState({
        location: '',
        destId: '',
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

    // Search destinations as user types
    useEffect(() => {
        const searchDest = async () => {
            if (formData.location.length < 3 || formData.location === lastSelectedLocation) {
                setDestinations([]);
                return;
            }
            setIsSearchingDest(true);
            try {
                const response = await axiosInstance.get('/hotels/searchDestination', {
                    params: { query: formData.location }
                });
                setDestinations(response.data.data || []);
            } catch (error) {
                console.error('Error searching destinations:', error);
            } finally {
                setIsSearchingDest(false);
            }
        };

        const timeoutId = setTimeout(searchDest, 500);
        return () => clearTimeout(timeoutId);
    }, [formData.location, lastSelectedLocation]);

    const handleSearch = async () => {
        if (!formData.destId) {
            toast({
                title: "Location Required",
                description: "Please select a destination from the suggestions.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/hotels/searchHotels', {
                params: {
                    dest_id: formData.destId,
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
                description: "Failed to search hotels. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectHotel = async (hotel: any) => {
        setIsFetchingDetails(true);
        try {
            // Fetch full hotel details
            const response = await axiosInstance.get('/hotels/getHotelDetails', {
                params: {
                    hotel_id: hotel.hotel_id,
                    arrival_date: formData.arrivalDate,
                    departure_date: formData.departureDate,
                    adults: formData.adults,
                    room_qty: formData.roomQty,
                    languagecode: 'en-gb',
                    currency_code: 'NGN'
                }
            });

            const details = response.data.data;
            if (!details) throw new Error("No details found");

            const arrival = new Date(formData.arrivalDate);
            const departure = new Date(formData.departureDate);
            const diffDays = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));

            const newHotel = {
                id: details.hotel_id || hotel.hotel_id,
                name: details.hotel_name || hotel.property?.name || hotel.hotel_name,
                address: details.address || hotel.property?.address || hotel.address || "Address not available",
                rating: details.review_score || hotel.property?.reviewScore || 8.0,
                totalReviews: details.review_nr || hotel.property?.reviewCount || 0,
                roomType: details.rooms?.[Object.keys(details.rooms)[0]]?.description || "Standard Room",
                totalPrice: `${hotel.property?.currency === 'NGN' ? '₦' : hotel.property?.currency || '₦'} ${(details.price_breakdown?.all_inclusive_price || hotel.property?.priceBreakdown?.grossPrice?.value || 120000).toLocaleString()}`,
                pricePerNight: `${hotel.property?.currency === 'NGN' ? '₦' : hotel.property?.currency || '₦'} ${(details.price_breakdown?.gross_price || (hotel.property?.priceBreakdown?.grossPrice?.value / diffDays) || 12000).toLocaleString()}`,
                nights: diffDays,
                rooms: formData.roomQty,
                checkIn: formData.arrivalDate,
                checkOut: formData.departureDate,
                facilities: details.facilities?.slice(0, 5).map((f: any) => ({ icon: 'pool' as const, label: f.name })) || [
                    { icon: 'pool' as const, label: 'Pool' },
                    { icon: 'bar' as const, label: 'Bar' }
                ],
                images: details.hotel_photos?.map((p: any) => p.url_max) || [hotel.property?.photoUrls?.[0] || hotel.main_photo_url || '/assets/hotel-image.png']
            };

            addHotel(newHotel);
            onClose();
            setStep('form');
            setSearchResults([]);
            setFormData({ ...formData, location: '', destId: '' });
        } catch (error) {
            console.error('Error fetching hotel details:', error);
            toast({
                title: "Error",
                description: "Could not fetch hotel details. Adding basic info instead.",
                variant: "destructive"
            });
            // Fallback to basic info
            handleSelectHotelBasic(hotel);
        } finally {
            setIsFetchingDetails(false);
        }
    };

    const handleSelectHotelBasic = (hotel: any) => {
        const arrival = new Date(formData.arrivalDate);
        const departure = new Date(formData.departureDate);
        const diffDays = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));

        const p = hotel.property;
        const newHotel = {
            id: hotel.hotel_id,
            name: p?.name || hotel.hotel_name,
            address: p?.address || hotel.address || "Address not available",
            rating: p?.reviewScore || 8.0,
            totalReviews: p?.reviewCount || 0,
            roomType: "Standard Room",
            totalPrice: `${p?.currency === 'NGN' ? '₦' : p?.currency || '₦'} ${(p?.priceBreakdown?.grossPrice?.value || 120000).toLocaleString()}`,
            pricePerNight: `${p?.currency === 'NGN' ? '₦' : p?.currency || '₦'} ${((p?.priceBreakdown?.grossPrice?.value || 120000) / diffDays).toLocaleString()}`,
            nights: diffDays,
            rooms: formData.roomQty,
            checkIn: formData.arrivalDate,
            checkOut: formData.departureDate,
            facilities: [
                { icon: 'pool' as const, label: 'Pool' },
                { icon: 'bar' as const, label: 'Bar' }
            ],
            images: [p?.photoUrls?.[0] || hotel.main_photo_url || '/assets/hotel-image.png']
        };

        addHotel(newHotel);
        onClose();
        setStep('form');
        setSearchResults([]);
        setFormData({ ...formData, location: '', destId: '' });
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

                                    {/* Destination Suggestions */}
                                    {formData.location.length >= 3 && (isSearchingDest || destinations.length > 0) && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E4E7EC] rounded-lg shadow-lg z-110 max-h-60 overflow-y-auto">
                                            {isSearchingDest ? (
                                                <div className="p-4 flex justify-center">
                                                    <HugeiconsIcon icon={Loading03Icon} size={20} className="animate-spin text-[#0D6EFD]" />
                                                </div>
                                            ) : (
                                                destinations.map((dest: any) => (
                                                    <button
                                                        key={dest.dest_id}
                                                        className="w-full text-left px-4 py-3 hover:bg-[#F9FAFB] flex items-center gap-3 transition-colors border-b last:border-0 border-[#F2F4F7]"
                                                        onClick={() => {
                                                            const label = dest.label || dest.name;
                                                            setFormData({
                                                                ...formData,
                                                                location: label,
                                                                destId: dest.dest_id
                                                            });
                                                            setLastSelectedLocation(label);
                                                            setDestinations([]);
                                                        }}
                                                    >
                                                        <HugeiconsIcon icon={Location01Icon} size={18} className="text-[#647995]" />
                                                        <div>
                                                            <p className="text-sm font-medium text-[#1D2433]">{dest.label || dest.name}</p>
                                                            <p className="text-xs text-[#647995]">{dest.dest_type}</p>
                                                        </div>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                                {formData.destId && (
                                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                        ✓ Destination selected
                                    </p>
                                )}
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
                                searchResults.map((hotel) => {
                                    const p = hotel.property;
                                    if (!p) return null;
                                    const mainPhoto = p.photoUrls?.[0] || '/assets/hotel-image.png';

                                    return (
                                        <div
                                            key={hotel.hotel_id}
                                            className="p-4 border border-[#E4E7EC] rounded-xl hover:border-[#0D6EFD] transition-colors cursor-pointer group flex gap-4 relative"
                                            onClick={() => handleSelectHotel(hotel)}
                                        >
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 text-white">
                                                {mainPhoto ? (
                                                    <Image
                                                        src={mainPhoto}
                                                        alt={p.name}
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
                                                <h4 className="font-semibold text-[#1D2433] truncate">{p.name}</h4>
                                                <div className="flex items-center gap-1 mt-1 text-xs text-[#647995]">
                                                    <HugeiconsIcon icon={StarIcon} size={12} className="text-[#F59E0B]" />
                                                    <span>{p.reviewScore?.toFixed(1) || "5.0"}</span>
                                                    <span>({p.reviewCount || "0"} reviews)</span>
                                                </div>
                                                <div className="mt-2 text-right">
                                                    <span className="font-bold text-[#0D6EFD]">
                                                        {p.currency === 'NGN' ? '₦' : p.currency || '$'} {(p.priceBreakdown?.grossPrice?.value || 0).toLocaleString()}
                                                    </span>
                                                    <p className="text-[10px] text-[#647995]">Total Price</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>

                {/* Fetching Details Overlay */}
                {isFetchingDetails && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-120 flex flex-col items-center justify-center p-6 text-center">
                        <HugeiconsIcon icon={Loading03Icon} size={48} className="text-[#0D6EFD] animate-spin mb-4" />
                        <h3 className="text-lg font-semibold text-[#1D2433]">Fetching full info...</h3>
                        <p className="text-sm text-[#647995]">Getting images, amenities and availability</p>
                    </div>
                )}

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
