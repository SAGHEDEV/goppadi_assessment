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
    PlusSignSquareIcon,
    Menu01Icon,
    UnfoldMoreIcon,
    Airplane02Icon,
    PassportIcon,
    PlazaIcon,
    RoadWaysideIcon,
    StudentIcon
} from '@hugeicons/core-free-icons'; // Using pro icons for better coverage
import Link from 'next/link';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';
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
        <div className='px-4 md:px-10 py-4 md:py-8 flex justify-between items-center bg-white border-b sticky top-0 z-50'>
            <div className='flex items-center gap-4 md:gap-7 flex-1'>
                <Image src={"/logo.svg"} alt="Gopaddi Logo" width={40} height={40} className="md:w-[58px] md:h-[56px]" />

                <div className='relative flex-1 max-w-64'>
                    <HugeiconsIcon
                        icon={Search01Icon}
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#647995]"
                        strokeWidth={1.5}
                    />
                    <Input
                        className='h-10 md:h-14 pl-10 w-full rounded-lg bg-[#F0F2F5] border-0 placeholder:text-[#647995] text-sm'
                        placeholder='Search'
                    />
                </div>
            </div>

            <div className='flex items-center gap-2 md:gap-8 ml-4'>
                <div className="hidden xl:flex items-center gap-6">
                    {navigations.map(({ icon, label, path }) => (
                        <Link
                            href={path}
                            key={label}
                            className='flex flex-col gap-1 items-center text-[#647995] hover:text-[#1D2433] transition-colors group'
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

                <div className='hidden md:block w-px h-10 bg-[#E4E7EC]'></div>

                <Button className='hidden sm:flex bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white px-4! h-10! rounded-lg font-medium text-sm!'>
                    Subscribe
                </Button>

                <div className='flex items-center gap-3 md:gap-6'>
                    <button className='relative flex-col gap-1 items-center text-[#647995] hover:text-[#1D2433] transition-colors group cursor-pointer hidden md:flex'>
                        <HugeiconsIcon
                            icon={Notification01Icon}
                            size={24}
                            className="group-hover:scale-110 transition-transform"
                            strokeWidth={1.5}
                        />
                        <span className="font-medium whitespace-nowrap text-sm">
                            Notification
                        </span>
                    </button>

                    <button className='flex-col gap-1 items-center text-[#647995] hover:text-[#1D2433] transition-colors group cursor-pointer hidden md:flex'>
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

                    <button className='flex-col gap-1 items-center text-[#647995] hover:text-[#1D2433] transition-colors group cursor-pointer hidden md:flex'>
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
                            <button className='flex items-center gap-2 md:gap-3.5 hover:opacity-80 transition-opacity'>
                                <Avatar className='h-10 w-10 md:h-13 md:w-13'>
                                    <AvatarImage src="/assets/profile-image.jpg" alt="User" className='object-cover' />
                                    <AvatarFallback className='bg-[#0D6EFD] text-white'>U</AvatarFallback>
                                </Avatar>
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className='text-[#667085] hidden md:block'>
                                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='w-48'>
                            <div className="xl:hidden">
                                {navigations.map(({ label, path }) => (
                                    <DropdownMenuItem key={label} asChild>
                                        <Link href={path}>{label}</Link>
                                    </DropdownMenuItem>
                                ))}
                                <div className='h-px bg-[#E4E7EC] my-1'></div>
                            </div>
                            <DropdownMenuItem className="md:hidden">Notifications</DropdownMenuItem>
                            <DropdownMenuItem className="md:hidden">Cart</DropdownMenuItem>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="xl:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                                <HugeiconsIcon icon={Menu01Icon} size={24} className="text-[#647995]" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] overflow-y-auto">
                            <SheetHeader className="mb-6">
                                <SheetTitle className="text-left flex items-center gap-2">
                                    <Image src="/logo.svg" alt="GoPaddi" width={40} height={40} />
                                    <span>GoPaddi</span>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-semibold text-gray-400 uppercase px-3 mb-2">Main Menu</p>
                                    {navigations.map(({ label, path, icon }) => (
                                        <Link key={label} href={path} className="flex items-center gap-3 px-3 py-2 text-[#647995] hover:bg-[#F0F2F5] rounded-lg transition-colors font-medium">
                                            <HugeiconsIcon icon={icon} size={20} />
                                            {label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-semibold text-gray-400 uppercase px-3 mb-2">Services</p>
                                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#647995] hover:bg-[#F0F2F5] rounded-lg transition-colors font-medium">
                                        <HugeiconsIcon icon={RoadWaysideIcon} size={20} />
                                        Activities
                                    </Link>
                                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#647995] hover:bg-[#F0F2F5] rounded-lg transition-colors font-medium">
                                        <HugeiconsIcon icon={PlazaIcon} size={20} />
                                        Hotels
                                    </Link>
                                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#647995] hover:bg-[#F0F2F5] rounded-lg transition-colors font-medium">
                                        <HugeiconsIcon icon={Airplane02Icon} size={20} />
                                        Flights
                                    </Link>
                                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#647995] hover:bg-[#F0F2F5] rounded-lg transition-colors font-medium">
                                        <HugeiconsIcon icon={StudentIcon} size={20} />
                                        Study
                                    </Link>
                                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#647995] hover:bg-[#F0F2F5] rounded-lg transition-colors font-medium">
                                        <HugeiconsIcon icon={PassportIcon} size={20} />
                                        Visa
                                    </Link>
                                </div>

                                <div className="mt-auto pt-6 border-t font-medium">
                                    <Button className='w-full bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white rounded-lg mb-6'>
                                        Subscribe
                                    </Button>
                                    <div className='w-full py-3 px-4 rounded-lg bg-[#F0F2F5] flex justify-between items-center text-[#647995]'>
                                        <div className='flex items-center gap-3'>
                                            <div className='bg-[#0D6EFD] p-2 rounded-lg font-medium text-white text-xs'>
                                                Go
                                            </div>
                                            <span className='text-sm font-medium'>Personal Account</span>
                                        </div>
                                        <HugeiconsIcon icon={UnfoldMoreIcon} size={20} />
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}

export default TopNav