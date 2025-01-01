import React from 'react';

interface BookProps {
    title: string;
    author: string;
    coverColor?: string;
    spineColor?: string;
}

const BookCard: React.FC<BookProps> = ({
    title,
    author,
    coverColor = '#f4f4f4', // Couleur par défaut de la couverture
    spineColor = '#3b3b3b', // Couleur par défaut de la tranche
}) => {
    return (
        <div style={{ ...styles.bookContainer, backgroundColor: coverColor }}>
            <div style={{ ...styles.spine, backgroundColor: spineColor }}>
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
        color: '#333',
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10px',
    },
    author: {
        fontSize: '14px',
        color: '#555',
    },
};

export default BookCard;
