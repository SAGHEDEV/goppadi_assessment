"use client";

import FlightLists from '@/components/page-components/plan-trip-page/FlightLists';
import HotelLists from '@/components/page-components/plan-trip-page/HotelLists';
import TripDetails from '@/components/page-components/plan-trip-page/TripDetails';
import React, { useState } from 'react';
import BookingDrawer from '@/components/miscellaneous/BookingDrawer';
import ActivityDrawer from '@/components/miscellaneous/ActivityDrawer';
import HotelDrawer from '@/components/miscellaneous/HotelDrawer';
import ActivitiesLists from '@/components/page-components/plan-trip-page/ActivitiesLists';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isHotelOpen, setIsHotelOpen] = useState(false);

  return (
    <div className="p-8 rounded-lg bg-white relative">
      <TripDetails
        onAddFlight={() => setIsBookingOpen(true)}
        onAddActivity={() => setIsActivityOpen(true)}
        onAddHotel={() => setIsHotelOpen(true)}
      />
      <div className='py-20 flex flex-col gap-7'>
        <div className='flex flex-col gap-0.5'>
          <h3 className='text-xl font-semibold text-[#1D2433]'>Trip itineraries</h3>
          <p className='text-sm text-[#647995]'>Your trip itineraries are placed here</p>
        </div>
        <div className='flex flex-col gap-4'>
          <FlightLists onAddFlight={() => setIsBookingOpen(true)} />
          <HotelLists onAddHotel={() => setIsHotelOpen(true)} />
          <ActivitiesLists onAddActivity={() => setIsActivityOpen(true)} />
        </div>
      </div>

      <BookingDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <ActivityDrawer
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
      />

      <HotelDrawer
        isOpen={isHotelOpen}
        onClose={() => setIsHotelOpen(false)}
      />
    </div>
  );
}
