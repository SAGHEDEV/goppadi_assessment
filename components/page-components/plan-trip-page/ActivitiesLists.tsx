"use client";

import ActivityCard from '@/components/miscellaneous/ActivityCard'
import { Button } from '@/components/ui/button'
import { House01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'
import { useActivityStore } from '@/lib/store/useActivityStore'
import EmptyState from '@/components/EmptyState';

function ActivitiesLists({ onAddActivity }: { onAddActivity?: () => void }) {
    const { activities, removeActivity } = useActivityStore();

    return (
        <div className='py-4 pb-12 px-6 rounded-lg bg-[#0054E4] flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <p className='flex gap-2.5 items-center text-white'>
                    <HugeiconsIcon
                        icon={House01Icon}
                        size={24}
                        color="currentColor"
                        strokeWidth={1.5}
                    />
                    <span className='text-lg font-semibold'>Activities</span>
                </p>
                <Button
                    onClick={onAddActivity}
                    className='bg-white w-38.25 px-6 py-3 rounded-lg text-[#1D2433] hover:text-[#1D2433] hover:bg-[#eae8e8] cursor-pointer h-11.5'
                >
                    Add Activity
                </Button>
            </div>
            <div className='flex flex-col gap-6'>
                {activities.length === 0 ? (
                    <EmptyState icon='/empty-activity.svg' buttonText='Add Activity' onButtonClick={onAddActivity} iconSize={72}/>
                ) : (
                    activities.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            {...activity}
                            onDelete={() => removeActivity(activity.id)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default ActivitiesLists