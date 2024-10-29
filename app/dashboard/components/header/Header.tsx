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
        <header className="flex flex-row items-center justify-between p-3.5 w-full text-black">
            <Link href="/dashboard">
                <div className="w-[40px] lg:w-[80px]">
                    <Image src="/logos/logo.jpeg" alt="logo" width={80} height={80} priority className="w-full h-full" />
                </div >
            </Link>
            <div className='flex items-center gap-3.5'>
                <Link href="/dashboard/ajout" className={(role !== "user" ? "" : "hidden")}><p>ajout de livre</p></Link>
                <MenuHeader pseudo={pseudo} id={id} avatar={avatar} />
            </div>
        </header >
    )
}

export default Header;
