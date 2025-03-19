"use client"
import { UserButton } from '@clerk/nextjs';
import React, { useState } from 'react';
import { SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import CookieConsentBanner from '~/components/cookieWebsite';

type Props = {
    children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
    const pathname = usePathname();
    // Vérifie si la page actuelle est dans la liste des pages exclues
    if (pathname.startsWith("/dashboard")) {
        return <>{children}</>;
    }

    // useEffect(() => {
    //     const logoutAndClearStorage = async () => {
    //         try {
    //             await signOut();
    //             localStorage.clear();
    //         } catch (error) {
    //             console.error("Erreur lors de la déconnexion:", error);
    //         }
    //     };
    //     logoutAndClearStorage();
    // }, [signOut]);

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main className='w-full h-screen overflow-hidden relative'>

                    <div className='flex items-center justify-between w-full px-4 py-3'>
                        <div className='flex items-center gap-2'>
                            <span className='text-neutral-300 text-sm'></span>
                            <span className='text-sm font-medium text-neutral-600 hover:text-neutral-800'>

                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Link href='https://docs.conotion-ai.com/'>
                                <Button variant={"link"} className='text-neutral-500 text-base'>
                                    <ExternalLink size={17} />
                                    Conotion Docs
                                </Button>
                            </Link>
                            <UserButton />
                        </div>
                    </div>

                    <div className='overflow-y-auto h-screen'>
                        {/* <BannerWithIcon /> */}
                        {children}
                    </div>
                </main>
            </SidebarProvider>
            <CookieConsentBanner />
        </>
    );
};

export default SidebarLayout;
