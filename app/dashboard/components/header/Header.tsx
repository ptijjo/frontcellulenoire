import React from 'react'
import MenuHeader from './MenuHeader';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
    pseudo: string;
    id: string;
    avatar: string;
}

const Header: React.FC<HeaderProps> = ({ pseudo, id, avatar }) => {
    return (
        <header className="flex flex-row items-center justify-between p-3.5 w-full text-black">
            <Link href="/dashboard">
                <div className="w-[40px] lg:w-[80px]">
                    <Image src="/logos/logo.jpeg" alt="logo" width={80} height={80} priority className="w-full h-full" />
                </div >
            </Link>
            <MenuHeader pseudo={pseudo} id={id} avatar={avatar} />

        </header >
    )
}

export default Header;
