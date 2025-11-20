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
        <header className="flex flex-row items-center justify-between w-full px-2.5 py-1.5 text-black">
            <Link href="/dashboard">
                <div className="w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] rounded-full overflow-hidden relative">
                    <Image src="/logos/logo.jpeg" alt="logo" priority fill className="object-cover" />
                </div >
            </Link>
            <div className='flex items-center justify-center text-[10px] lg:text-lg '>
                <MenuHeader pseudo={pseudo} id={id} avatar={avatar} role={role} />
            </div>
        </header >
    )
}

export default Header;
