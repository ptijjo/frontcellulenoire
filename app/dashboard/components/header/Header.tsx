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
            <div className='flex items-center justify-center w-[30%] lg:w-[20%] xl:w-[10%] text-[10px] lg:text-lg'>
                <MenuHeader pseudo={pseudo} id={id} avatar={avatar} role={role} />
            </div>
        </header >
    )
}

export default Header;
