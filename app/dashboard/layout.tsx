import React from 'react'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default layout;