import React from 'react';


interface BookProps {
    title: string;
    author: string;
    category?: string;
};

const getCategoryColor = (category?: string): string => {
    switch (category?.toLowerCase()) {
        case 'histoire':
            return '#C4A57B'; // Beige doré doux
        case 'spiritualite':
            return '#B8A9D4'; // Lavande clair
        case 'religion':
            return '#8FB3D5'; // Bleu ciel doux
        case 'philosophie':
            return '#95A5A6'; // Gris bleuté clair
        case 'roman':
            return '#D4A5A5'; // Rose poudré
        case 'langue':
        case 'langues':
            return '#E6B89C'; // Pêche clair
        default:
            return '#B0BEC5'; // Gris bleu très clair
    }
};

const BookCard: React.FC<BookProps> = ({ title, author, category }) => {
    const coverColor = getCategoryColor(category);

    return (
        <div style={{ ...styles.bookContainer, backgroundColor: coverColor }} className='hover:scale-[1.05] transition-transform duration-300'>
            <div style={{ ...styles.spine, backgroundColor: "#3b3b3b" }}>
                <p style={styles.spineText}>{author}</p>
            </div>
            <div style={styles.cover}>
                <h1 style={styles.title}>{title}</h1>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    bookContainer: {
        display: 'flex',
        width: '220px',
        height: '320px',
        boxShadow: '3px 3px 15px rgba(0,0,0,0.3)',
        // margin: '20px',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
    },
    spine: {
        width: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        padding: '5px',
        color: 'white',
    },
    spineText: {
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'center',
        height: '100%',
    },
    cover: {
        flex: 1,
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2c3e50',
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10px',
        color: '#2c3e50',
    },
    author: {
        fontSize: '14px',
        color: '#555',
    },
};

export default BookCard;
