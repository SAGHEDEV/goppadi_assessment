import Image from 'next/image'
import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import {
    CheckListIcon,
    Home09Icon,
    PieChart02Icon,
    PurseIcon,
    Search01Icon,
    Wallet01Icon,
    Notification01Icon,
    ShoppingBasket03Icon,
    PlusSignSquareIcon
} from '@hugeicons/core-free-icons'; // Using pro icons for better coverage
import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

function TopNav() {
    const navigations = [
        {
            label: "Home",
            icon: Home09Icon,
            path: "/"
        },
        {
            label: "Dashboard",
            icon: PieChart02Icon,
            path: "/dashboard"
        },
        {
            label: "Wallet",
            icon: Wallet01Icon,
            path: "/wallet"
        },
        {
            label: "Plan a trip",
            icon: CheckListIcon,
            path: "/plan-trip"
        },
        {
            label: "Commission for life",
            icon: PurseIcon,
            path: "/commission"
        },
    ]

    return (
        <div className='px-10 py-8 flex justify-between items-center bg-white border-b sticky top-0 z-50'>
            <div className='flex items-center gap-7'>
                <Image src={"/logo.svg"} alt="Gopaddi Logo" width={58} height={56} />

                <div className='relative w-64'>
                    <HugeiconsIcon
                        icon={Search01Icon}
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                        strokeWidth={1.5}
                    />
                    <Input
                        className='h-full min-h-14 pl-10 w-100 rounded-lg bg-[#F0F2F5] border-0 placeholder:text-[#647995]'
                        placeholder='Search'
                    />
                </div>
            </div>

            <div className='flex items-center gap-8'>
                <div className="flex items-center gap-6">
                    {navigations.map(({ icon, label, path }) => (
                        <Link
                            href={path}
                            key={label}
                            className='flex flex-col gap-1 items-center text-[#647995] hover:text-[#0D6EFD] transition-colors group'
                        >
                            <HugeiconsIcon
                                icon={icon}
                                size={26}
                                className="group-hover:scale-110 transition-transform"
                                strokeWidth={1.5}
                            />
                            <span className="font-medium whitespace-nowrap text-sm">
                                {label}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className='w-px h-10 bg-[#E4E7EC]'></div>

                <Button className='bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white px-4! h-10! rounded-lg font-medium text-sm!'>
                    Subscribe
                </Button>

                <div className='flex items-center gap-6'>
                    <button className='relative flex flex-col gap-1 items-center text-[#647995] hover:text-[#0D6EFD] transition-colors group cursor-pointer'>
                        <HugeiconsIcon
                            icon={Notification01Icon}
                            size={24}
                            className="group-hover:scale-110 transition-transform"
                            strokeWidth={1.5}
                        />
                        <span className="font-medium whitespace-nowrap text-sm">
                            Notification
                        </span>
                        {/* <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span> */}
                    </button>

                    <button className='flex flex-col gap-1 items-center text-[#647995] hover:text-[#0D6EFD] transition-colors group cursor-pointer'>
                        <HugeiconsIcon
                            icon={ShoppingBasket03Icon}
                            size={24}
                            className="group-hover:scale-110 transition-transform"
                            strokeWidth={1.5}
                        />
                        <span className="font-medium whitespace-nowrap text-sm">
                            Cart
                        </span>
                    </button>

                    <button className='flex flex-col gap-1 items-center text-[#647995] hover:text-[#0D6EFD] transition-colors group cursor-pointer'>
                        <HugeiconsIcon
                            icon={PlusSignSquareIcon}
                            size={24}
                            className="group-hover:scale-110 transition-transform"
                            strokeWidth={1.5}
                        />
                        <span className="font-medium whitespace-nowrap text-sm">
                            Create
                        </span>
                    </button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className='flex items-center gap-3.5 hover:opacity-80 transition-opacity'>
                                <Avatar className='h-13 w-13'>
                                    <AvatarImage src="/assets/profile-image.jpg" alt="User" className='object-cover' />
                                    <AvatarFallback className='bg-[#0D6EFD] text-white'>U</AvatarFallback>
                                </Avatar>
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className='text-[#667085]'>
                                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='w-48'>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default TopNav