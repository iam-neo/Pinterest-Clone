import { useState, useEffect } from 'react';

const useMasonry = (items, columnCount = 5) => {
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        // Determine column count based on window width if not forced
        // For now, we rely on the component passing the correct column count, 
        // or we could add window resize listener here. 
        // Let's keep it simple: distribution logic purely here.

        // Initialize empty columns
        const newColumns = Array.from({ length: columnCount }, () => []);

        // Track height of each column to distribute evenly
        const columnHeights = new Array(columnCount).fill(0);

        items.forEach(item => {
            // Find the shortest column
            const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

            // Add item to the shortest column
            newColumns[shortestColumnIndex].push(item);

            // Update that column's height (using aspect ratio to approximate visual height)
            // Height contribution = item height
            // Note: In a real CSS world, width is fixed, so height is proportional.
            columnHeights[shortestColumnIndex] += item.height;
        });

        setColumns(newColumns);
    }, [items, columnCount]);

    return columns;
};

export default useMasonry;
