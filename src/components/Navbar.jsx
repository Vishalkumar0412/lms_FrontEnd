import { LogOutIcon, Menu, School } from 'lucide-react';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from '@/Darkmode';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const user = true; // Simulating login state

    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed left-0 top-0 right-0 duration-300 z-10'>
            {/* Desktop Navbar */}
            <div className='hidden md:flex max-w-7xl mx-auto justify-between items-center h-full px-4'>
                <div className='flex gap-2 items-center'>
                    <School size={30} />
                    <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
                </div>

                {/* Right Section (Profile & Dark Mode) */}
                <div className='flex items-center gap-4'>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer h-8 w-8">
                                    <AvatarImage src="https://github.com/shadcn.png" className='rounded-full' />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link to='/my-learning'>My Learning</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to='/Profile'>Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <LogOutIcon className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span>Dashboard</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="outline">Login</Button>
                            <Button>Signup</Button>
                        </div>
                    )}

                    {/* 🔥 Dark Mode Button (Right of Profile) */}
                    <DarkMode />
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='text-2xl font-extrabold'>E-Learning</h1>
                <div className="flex items-center gap-4">
                    <DarkMode /> {/* 🔥 Still visible in mobile */}
                    <MobileNavbar />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

// Mobile Navbar Component
const MobileNavbar = () => {
    const role = 'instructor';

    return (
        <Sheet>
            <SheetTrigger className="rounded-full bg-gray-200 p-2 hover:bg-gray-300">
                <Menu size={24} />
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full">
                {/* Header */}
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle>E-Learning</SheetTitle>
                    <DarkMode /> {/* 🔥 Now Dark Mode is also in Mobile Navbar */}
                </SheetHeader>

                {/* Navigation */}
                <nav className="flex flex-col space-y-4 mt-4">
                    <Link to='/my-learning' className="cursor-pointer hover:text-blue-500">My Learning</Link>
                    <Link to='/Profile' className="cursor-pointer hover:text-blue-500">Edit Profile</Link>
                    <span className="cursor-pointer hover:text-blue-500">Settings</span>
                </nav>

                {/* Footer */}
                {role === 'instructor' && (
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Dashboard</Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
