import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Hotel {
    id: string;
    name: string;
    address: string;
    rating: number;
    totalReviews: number;
    roomType: string;
    totalPrice: string;
    pricePerNight: string;
    nights: number;
    rooms: number;
    checkIn: string;
    checkOut: string;
    facilities: Array<{
        icon: 'pool' | 'bar' | 'bed';
        label: string;
    }>;
    images: string[];
}

interface HotelState {
    hotels: Hotel[];
    addHotel: (hotel: Hotel) => void;
    removeHotel: (id: string) => void;
    clearHotels: () => void;
}

export const useHotelStore = create<HotelState>()(
    persist(
        (set) => ({
            hotels: [],
            addHotel: (hotel) => set((state) => ({
                hotels: [...state.hotels, hotel]
            })),
            removeHotel: (id) => set((state) => ({
                hotels: state.hotels.filter((h) => h.id !== id)
            })),
            clearHotels: () => set({ hotels: [] }),
        }),
        {
            name: 'hotel-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
