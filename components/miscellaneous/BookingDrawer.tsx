/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Cancel01Icon,
    AirplaneTakeOff01Icon,
    AirplaneLanding01Icon,
    Calendar03Icon,
    UserGroupIcon,
    ArrowRight02Icon,
    Loading03Icon
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axiosInstance from '@/lib/axios';
import { useFlightStore } from '@/lib/store/useFlightStore';
import { useToast } from '@/hooks/use-toast';
import EmptyState from '../EmptyState';

interface BookingDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingDrawer({ isOpen, onClose }: BookingDrawerProps) {
    const { toast } = useToast();
    const addFlight = useFlightStore((state) => state.addFlight);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [step, setStep] = useState<'form' | 'results'>('form');

    const [formData, setFormData] = useState({
        fromId: 'LHR.AIRPORT',
        toId: 'JFK.AIRPORT',
        departDate: '2025-05-20',
        returnDate: '2025-05-25',
        adults: 1,
        children: 0,
        itineraryType: 'ROUND_TRIP',
        cabinClass: 'ECONOMY',
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
            const response = await axiosInstance.get('/flights/searchFlights', {
                params: {
                    fromId: formData.fromId,
                    toId: formData.toId,
                    departDate: formData.departDate,
                    returnDate: formData.itineraryType === 'ROUND_TRIP' ? formData.returnDate : undefined,
                    adults: formData.adults,
                    children: formData.children > 0 ? formData.children : undefined,
                    itineraryType: formData.itineraryType,
                    cabinClass: formData.cabinClass,
                    sortOrder: 'BEST',
                    currencyCode: 'NGN'
                }
            });

            setSearchResults(response?.data?.data?.itineraries || []);
            setStep('results');
        } catch (error) {
            console.error('Error searching flights:', error);
            toast({
                title: "Error",
                description: "Failed to search flights. Please check your API key and parameters.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectFlight = (itinerary: Record<string, any>) => {
        const newFlight = {
            id: itinerary.id,
            airline: itinerary.legs[0].carriersData[0].name,
            flightNumber: itinerary.legs[0].segments[0].flightNumber || 'N/A',
            departureTime: new Date(itinerary.legs[0].departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            departureDate: new Date(itinerary.legs[0].departureTime).toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' }),
            departureAirport: itinerary.legs[0].origin.displayCode,
            arrivalTime: new Date(itinerary.legs[0].arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            arrivalDate: new Date(itinerary.legs[0].arrivalTime).toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' }),
            arrivalAirport: itinerary.legs[0].destination.displayCode,
            duration: `${Math.floor(itinerary.legs[0].durationInMinutes / 60)}h ${itinerary.legs[0].durationInMinutes % 60}m`,
            flightType: itinerary.legs[0].stopCount === 0 ? 'Direct' : `${itinerary.legs[0].stopCount} Stop(s)`,
            price: `₦ ${itinerary.price.total.toLocaleString()}`,
            facilities: {
                baggage: "20kg",
                cabinBaggage: "8kg",
                entertainment: true,
                meal: true,
                usb: true
            }
        };

        addFlight(newFlight);
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
                            <HugeiconsIcon icon={AirplaneTakeOff01Icon} size={24} className="text-[#0D6EFD]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-[#1D2433]">
                                {step === 'form' ? 'Book a Flight' : 'Select a Flight'}
                            </h2>
                            <p className="text-sm text-[#647995]">
                                {step === 'form' ? 'Fill in the details to search flights' : `${searchResults.length} flights found`}
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
                            {/* Itinerary Type */}
                            <div className="flex gap-2">
                                {['ROUND_TRIP', 'ONE_WAY'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFormData({ ...formData, itineraryType: type })}
                                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${formData.itineraryType === type
                                            ? 'bg-[#0D6EFD] text-white'
                                            : 'bg-[#F0F2F5] text-[#647995] hover:bg-[#E4E7EC]'
                                            }`}
                                    >
                                        {type.replace('_', ' ')}
                                    </button>
                                ))}
                            </div>

                            {/* From & To */}
                            <div className="flex flex-col gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#344054]">From</label>
                                    <div className="relative">
                                        <HugeiconsIcon
                                            icon={AirplaneTakeOff01Icon}
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                                        />
                                        <Input
                                            placeholder="Origin (e.g. LHR.AIRPORT)"
                                            className="pl-10 h-12"
                                            value={formData.fromId}
                                            onChange={(e) => setFormData({ ...formData, fromId: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#344054]">To</label>
                                    <div className="relative">
                                        <HugeiconsIcon
                                            icon={AirplaneLanding01Icon}
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                                        />
                                        <Input
                                            placeholder="Destination (e.g. JFK.AIRPORT)"
                                            className="pl-10 h-12"
                                            value={formData.toId}
                                            onChange={(e) => setFormData({ ...formData, toId: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#344054]">Departure Date</label>
                                    <div className="relative">
                                        <HugeiconsIcon
                                            icon={Calendar03Icon}
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                                        />
                                        <Input
                                            type="date"
                                            className="pl-10 h-12"
                                            value={formData.departDate}
                                            onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                {formData.itineraryType === 'ROUND_TRIP' && (
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-[#344054]">Return Date</label>
                                        <div className="relative">
                                            <HugeiconsIcon
                                                icon={Calendar03Icon}
                                                size={18}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                                            />
                                            <Input
                                                type="date"
                                                className="pl-10 h-12"
                                                value={formData.returnDate}
                                                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Passengers */}
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
                                    <label className="text-sm font-medium text-[#344054]">Children</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        className="h-12"
                                        value={formData.children}
                                        onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            {/* Cabin Class */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#344054]">Cabin Class</label>
                                <select
                                    className="w-full h-12 rounded-lg border border-[#E4E7EC] px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/20 text-sm"
                                    value={formData.cabinClass}
                                    onChange={(e) => setFormData({ ...formData, cabinClass: e.target.value })}
                                >
                                    <option value="ECONOMY">Economy</option>
                                    <option value="PREMIUM_ECONOMY">Premium Economy</option>
                                    <option value="BUSINESS">Business</option>
                                    <option value="FIRST">First Class</option>
                                </select>
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
                                    icon='/assets/empty-flight.svg'
                                    message="No flight was found"
                                    buttonText="Search again"
                                    onButtonClick={() => setStep('form')}
                                    iconSize={120}
                                />
                            ) : (
                                searchResults.map((itinerary: any) => (
                                    <div
                                        key={itinerary.id}
                                        className="p-4 border border-[#E4E7EC] rounded-xl hover:border-[#0D6EFD] transition-colors cursor-pointer group"
                                        onClick={() => handleSelectFlight(itinerary)}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center font-bold text-red-600 text-xs text-nowrap">
                                                    {itinerary.flightOptions[0].flights[0].airlineName.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-[#1D2433]">{itinerary.flightOptions[0].flights[0].airlineName}</span>
                                            </div>
                                            <span className="font-bold text-[#0D6EFD]">₦ {itinerary.price.total.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <div>
                                                <p className="font-semibold text-[#1D2433]">{new Date(itinerary.flightOptions[0].flights[0].departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                <p className="text-[#647995]">{itinerary.flightOptions[0].flights[0].departureAirport}</p>
                                            </div>
                                            <div className="flex flex-col items-center flex-1 mx-4">
                                                <p className="text-[10px] text-[#647995] mb-1">{itinerary.duration}</p>
                                                <div className="w-full h-px bg-[#E4E7EC] relative">
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#0D6EFD] rounded-full" />
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-[#1D2433]">{new Date(itinerary.flightOptions[0].flights[0].arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                <p className="text-[#647995]">{itinerary.flightOptions[0].flights[0].arrivalAirport}</p>
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
                                Search Flights
                                <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
                            </>
                        ) : (
                            'Select a flight above'
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
