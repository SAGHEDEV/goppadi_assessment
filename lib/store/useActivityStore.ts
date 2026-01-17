import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Activity {
    id: string;
    name: string;
    description: string;
    rating: number;
    totalReviews: number;
    duration: string;
    price: string;
    dateTime: string;
    whatsIncluded: string;
    images: string[];
    day: number;
}

interface ActivityState {
    activities: Activity[];
    addActivity: (activity: Activity) => void;
    removeActivity: (id: string) => void;
    clearActivities: () => void;
}

export const useActivityStore = create<ActivityState>()(
    persist(
        (set) => ({
            activities: [],
            addActivity: (activity) => set((state) => ({
                activities: [...state.activities, activity]
            })),
            removeActivity: (id) => set((state) => ({
                activities: state.activities.filter((a) => a.id !== id)
            })),
            clearActivities: () => set({ activities: [] }),
        }),
        {
            name: 'activity-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
