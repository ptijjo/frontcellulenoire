import React from 'react'
import MenuHeader from './MenuHeader';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
    pseudo: string;
    id: string;
    avatar: string;
    role: string;
}

const Header: React.FC<HeaderProps> = ({ pseudo, id, avatar, role }) => {
    return (
        <header className="sticky top-0 z-40 flex w-full flex-row items-center justify-between border-b border-border bg-background/95 px-2 py-3 backdrop-blur-sm sm:px-4">
            <Link href="/dashboard" className="flex items-center gap-2 sm:gap-3">
                <Image
                    src="/logos/logo.jpeg"
                    alt="logo"
                    width={48}
                    height={48}
                    priority
                    className="size-10 shrink-0 rounded-full border border-primary/30 object-cover sm:size-12"
                />
                <span className="hidden font-serif text-lg text-primary sm:block">Cellule noire</span>
            </Link>
            <MenuHeader pseudo={pseudo} id={id} avatar={avatar} role={role} />
        </header>
    )
}

export default Header;
