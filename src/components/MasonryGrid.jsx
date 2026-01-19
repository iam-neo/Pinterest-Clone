import React, { useState, useEffect } from 'react';
import useMasonry from '../hooks/useMasonry';
import ImageCard from './ImageCard';

const MasonryGrid = ({ items, onImageClick }) => {
    // Initial column count
    const [columnCount, setColumnCount] = useState(5);

    // Responsive column count logic
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 600) setColumnCount(1);       // Mobile
            else if (width < 900) setColumnCount(3);  // Tablet
            else if (width < 1200) setColumnCount(4); // Small Desktop
            else setColumnCount(5);                   // Large Desktop
        };

        // Initial call
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const columns = useMasonry(items, columnCount);

    return (
        <div style={styles.gridContainer}>
            {columns.map((col, colIndex) => (
                <div key={colIndex} style={styles.column}>
                    {col.map((item) => (
                        <ImageCard
                            key={item.id}
                            image={item}
                            onClick={onImageClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

const styles = {
    gridContainer: {
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        paddingBottom: '40px',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        // Flex basis ensures columns take equal width
        flex: 1,
        minWidth: 0, // Prevent overflow issues
    }
};

export default MasonryGrid;
