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
        <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-border bg-background/90 py-3 backdrop-blur-md">
            <Link href="/dashboard" className="flex items-center gap-3">
                <Image
                    src="/logos/logo.jpeg"
                    alt=""
                    width={36}
                    height={36}
                    priority
                    className="size-9 shrink-0 rounded-full object-cover"
                />
                <span className="font-serif text-lg leading-none">Cellule noire</span>
            </Link>
            <MenuHeader pseudo={pseudo} id={id} avatar={avatar} role={role} />
        </header>
    )
}

export default Header;
