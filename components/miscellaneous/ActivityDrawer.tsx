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
    Search01Icon
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axiosInstance from '@/lib/axios';
import { useActivityStore } from '@/lib/store/useActivityStore';
import { useToast } from '@/hooks/use-toast';
import EmptyState from '../EmptyState';
import Image from 'next/image';

interface ActivityDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ActivityDrawer({ isOpen, onClose }: ActivityDrawerProps) {
    const { toast } = useToast();
    const addActivity = useActivityStore((state) => state.addActivity);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [step, setStep] = useState<'form' | 'results'>('form');

    const [formData, setFormData] = useState({
        location: 'New York',
        date: '2025-05-20',
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
            const locationRes = await axiosInstance.get('/attraction/searchLocation', {
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

            // Then search for attractions using destId
            const response = await axiosInstance.get('/attraction/searchAttractions', {
                params: {
                    id: destId,
                    sortBy: 'TRENDING_DESTINATIONS',
                    currencyCode: 'NGN',
                    languageCode: 'en-us'
                }
            });

            setSearchResults(response?.data?.data?.products || []);
            setStep('results');
        } catch (error) {
            console.error('Error searching activities:', error);
            toast({
                title: "Error",
                description: "Failed to search activities. Please check your API key and parameters.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectActivity = (product: any) => {
        const newActivity = {
            id: product.id,
            name: product.name,
            description: product.shortDescription || product.name,
            rating: parseFloat(product.reviewsStats?.combinedNumericStats?.average) || 4.5,
            totalReviews: product.reviewsStats?.combinedNumericStats?.totalCount || 0,
            duration: product.typicalDuration || "2 Hours",
            price: `₦ ${product.price?.price?.value?.toLocaleString() || "12,500"}`,
            dateTime: new Date(formData.date).toLocaleDateString([], { day: '2-digit', month: 'short' }) + ' at 10:30 AM',
            whatsIncluded: "General Admission",
            images: [product.primaryPhoto?.small || '/assets/activity-image.png'],
            day: 1
        };

        addActivity(newActivity);
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
                                {step === 'form' ? 'Add Activity' : 'Select Activity'}
                            </h2>
                            <p className="text-sm text-[#647995]">
                                {step === 'form' ? 'Find things to do in your destination' : `${searchResults.length} activities found`}
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

                            {/* Date */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#344054]">Date</label>
                                <div className="relative">
                                    <HugeiconsIcon
                                        icon={Calendar03Icon}
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                                    />
                                    <Input
                                        type="date"
                                        className="pl-10 h-12"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                                    icon='/assets/empty-activity.svg'
                                    message="No activity was found"
                                    buttonText="Search again"
                                    onButtonClick={() => setStep('form')}
                                    iconSize={120}
                                />
                            ) : (
                                searchResults.map((product) => (
                                    <div
                                        key={product.id}
                                        className="p-4 border border-[#E4E7EC] rounded-xl hover:border-[#0D6EFD] transition-colors cursor-pointer group flex gap-4"
                                        onClick={() => handleSelectActivity(product)}
                                    >
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                            {product.primaryPhoto?.small ? (
                                                <Image
                                                    src={product.primaryPhoto.small}
                                                    alt={product.name}
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
                                            <h4 className="font-semibold text-[#1D2433] truncate">{product.name}</h4>
                                            <div className="flex items-center gap-1 mt-1 text-xs text-[#647995]">
                                                <HugeiconsIcon icon={StarIcon} size={12} className="text-[#F59E0B]" />
                                                <span>{product.reviewsStats?.combinedNumericStats?.average?.toFixed(1) || "4.5"}</span>
                                                <span>({product.reviewsStats?.combinedNumericStats?.totalCount || "0"})</span>
                                            </div>
                                            <div className="mt-2 flex justify-between items-baseline">
                                                <span className="text-xs text-[#647995]">{product.typicalDuration || "2 Hours"}</span>
                                                <span className="font-bold text-[#0D6EFD]">₦ {product.price?.price?.value?.toLocaleString() || "12,500"}</span>
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
                                Search Activities
                                <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
                            </>
                        ) : (
                            'Select an activity above'
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
