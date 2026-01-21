import React, { useState, useEffect } from 'react';
import useMasonry from '../hooks/useMasonry';
import ImageCard from './ImageCard';

const MasonryGrid = ({ items, onImageClick, initialColumns = 5, maxColumns = 5 }) => {
    // Initial column count - can be customized via props
    const [columnCount, setColumnCount] = useState(initialColumns);

    // Responsive column count logic
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            // For main gallery (maxColumns=5): mobile=2, tablet=3, desktop=4-5
            // For sidebar (maxColumns=2): mobile=1, tablet=2, desktop=2
            if (width < 600) setColumnCount(Math.min(2, maxColumns));       // Mobile - 2 cols for main, 1 for sidebar
            else if (width < 900) setColumnCount(Math.min(3, maxColumns));  // Tablet - 3 cols for main, 2 for sidebar
            else if (width < 1200) setColumnCount(Math.min(4, maxColumns)); // Small Desktop
            else setColumnCount(Math.min(maxColumns, maxColumns));          // Large Desktop
        };

        // Initial call
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [maxColumns]);

    const columns = useMasonry(items, columnCount);

    return (
        <div className="masonry-grid">
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
    // gridContainer moved to CSS .masonry-grid
    column: {
        display: 'flex',
        flexDirection: 'column',
        // Flex basis ensures columns take equal width
        flex: 1,
        minWidth: 0, // Prevent overflow issues
    }
};

export default MasonryGrid;
