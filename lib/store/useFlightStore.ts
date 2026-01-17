import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Flight {
    id: string;
    airline: string;
    flightNumber: string;
    departureTime: string;
    departureDate: string;
    departureAirport: string;
    arrivalTime: string;
    arrivalDate: string;
    arrivalAirport: string;
    duration: string;
    flightType: string;
    price: string;
    facilities: {
        baggage: string;
        cabinBaggage: string;
        entertainment: boolean;
        meal: boolean;
        usb: boolean;
    };
}

interface FlightState {
    flights: Flight[];
    addFlight: (flight: Flight) => void;
    removeFlight: (id: string) => void;
    clearFlights: () => void;
}

export const useFlightStore = create<FlightState>()(
    persist(
        (set) => ({
            flights: [],
            addFlight: (flight) => set((state) => ({
                flights: [...state.flights, flight]
            })),
            removeFlight: (id) => set((state) => ({
                flights: state.flights.filter((f) => f.id !== id)
            })),
            clearFlights: () => set({ flights: [] }),
        }),
        {
            name: 'flight-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
