import { Airplane02Icon, FirstAidKitIcon, Luggage02Icon, PackageIcon, PassportIcon, PlazaIcon, RoadWaysideIcon, StudentIcon, UnfoldMoreIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import React from 'react'

function SideNav() {
  const navigations = [
    {
      label: "Activities",
      icon: RoadWaysideIcon,
      path: "#"
    },
    {
      label: "Hotels",
      icon: PlazaIcon,
      path: "#"
    },
    {
      label: "Flights",
      icon: Airplane02Icon,
      path: "#"
    },
    {
      label: "Study",
      icon: StudentIcon,
      path: "#"
    },
    {
      label: "Visa",
      icon: PassportIcon,
      path: "#"
    },
    {
      label: "Immigration",
      icon: Luggage02Icon,
      path: "#"
    },
    {
      label: "Medical",
      icon: FirstAidKitIcon,
      path: "#"
    },
    {
      label: "Vacation Package",
      icon: PackageIcon,
      path: "#"
    },
  ]
  return (
  <div className='w-75 sticky top-36 h-[calc(100vh-160px)] shrink-0 bg-white rounded-lg p-6 flex flex-col justify-between items-center'>
      <div className='w-full flex flex-col gap-3'>
        {
          navigations.map(({ icon, label, path }: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            label: string; icon: any, path: string;
          }) => (
            <Link href={path} key={label} className='flex items-center gap-2 px-3.5 py-3 text-[#647995] hover:bg-[#F0F2F5] rounded-lg w-full transition-colors'>
              <HugeiconsIcon
                icon={icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
              <span className='text-sm font-medium text-[#647995]'>{label}</span>
            </Link >
          ))}
      </div>

      <div className='my-10 w-full py-3.5 px-4.5 rounded-lg bg-[#F0F2F5] flex justify-between items-center text-[#647995] cursor-pointer'>
        <div className='flex justify-start items-center gap-3'>
          <div className='bg-[#0D6EFD] p-3 rounded-lg font-medium text-white flex justify-center items-center'>
            Go
          </div>
          <span className='text-sm font-medium'>Personal Account</span>
        </div>
        <HugeiconsIcon
          icon={UnfoldMoreIcon}
          size={24}
          color="currentColor"
          strokeWidth={1.5}
        />
      </div>
    </div>
  )
}

export default SideNav