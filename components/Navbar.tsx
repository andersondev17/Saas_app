'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenuToggle from './navbar/Mobilemenutoggle';
import NavItems from './NavItems';
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className='navbar'>
                <Link href='/'>
                    <div className='flex items-center gap-2.5 cursor-pointer'>
                        <Image
                            src='/images/logo.svg'
                            alt='logo' width={46} height={44}
                        />
                    </div>
                </Link>
                <div className='hidden md:flex items-center gap-8'>
                    <NavItems />
                    <div className="flex items-center gap-8">
                        <SignedOut>
                            <SignInButton>
                                <InteractiveHoverButton className="btn-signin">Sign In</InteractiveHoverButton>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
                <MobileMenuToggle onToggle={setIsMobileMenuOpen} />
            </nav>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <div
                    id="mobile-menu"
                    className=" md:hidden fixed inset-0      top-[var(--navbar-height,80px)]      z-40      backdrop-blur-[14px]      bg-white/60      supports-[backdrop-filter]:bg-white/40    ">
                    <div className="flex flex-col gap-6 p-6">
                        <NavItems mobile />

                        <div className="pt-4 border-t border-black/10">
                            <SignedOut>
                                <SignInButton>
                                    <InteractiveHoverButton className="btn-signin w-full">
                                        Sign In
                                    </InteractiveHoverButton>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Navbar