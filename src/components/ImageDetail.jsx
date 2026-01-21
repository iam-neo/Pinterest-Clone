import React, { useEffect, useState } from 'react';
import { FaHeart, FaShare, FaArrowLeft } from 'react-icons/fa';
import MasonryGrid from './MasonryGrid';
import { customImages } from '../utils/customImages';

const ImageDetail = ({ image, onBack, onImageClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Scroll to top when image changes
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsExpanded(false); // Reset expansion on image change
    }, [image]);

    if (!image) return null;

    // Filter related images based on usage tags
    const relatedImages = customImages.filter((img) =>
        img.id !== image.id &&
        img.tags.some((tag) => image.tags.includes(tag))
    );

    // Truncate logic
    const MAX_LENGTH = 150;
    const shouldTruncate = image.description && image.description.length > MAX_LENGTH;
    const displayDescription = isExpanded || !shouldTruncate
        ? image.description
        : `${image.description.slice(0, MAX_LENGTH)}...`;

    // Share handler
    const handleShare = async () => {
        const shareUrl = new URL(image.url, window.location.origin).href;

        try {
            // Try to fetch image and share as file (best for "thumbnail" experience)
            if (navigator.share) {
                const response = await fetch(image.url);
                const blob = await response.blob();
                const file = new File([blob], 'image.jpg', { type: blob.type });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: image.title || 'Pinterest Clone Image',
                        text: `${image.description || 'Check out this image!'} ${shareUrl}`,
                        files: [file]
                    });
                    return; // Success
                }

                // Fallback to link only if file share not supported
                await navigator.share({
                    title: image.title || 'Pinterest Clone Image',
                    text: image.description || 'Check out this image!',
                    url: shareUrl,
                });
            } else {
                // Desktop/No-Navigator fallback
                throw new Error('Web Share API not supported');
            }
        } catch (error) {
            console.log('Falling back to clipboard', error);
            try {
                await navigator.clipboard.writeText(shareUrl);
                alert('Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy link. Please manually copy the URL.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <button style={styles.backBtn} onClick={onBack}>
                <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Gallery
            </button>

            <div style={styles.card}>
                <div style={styles.layout}>
                    {/* Image Side (Left) - NOW "HERO" */}
                    <div style={styles.imageContainer}>
                        <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%', margin: '0 auto', width: '100%' }}>
                            <img
                                src={image.url}
                                alt={image.alt}
                                style={styles.image}
                            />

                            {/* Top-Left Actions Overlay */}
                            <div style={styles.overlayActions}>
                                <button className="btn-icon" onClick={handleShare}><FaShare /></button>
                                <button className="btn-icon"><FaHeart /></button>
                                {/* Save button optional here or keep in header? Let's keep minimal icons here */}
                            </div>

                            {/* Bottom Title Overlay - Only Title */}
                            <div style={styles.overlayContent}>
                                <h2 className="overlay-title-text" style={styles.overlayTitle}>{image.title || image.alt}</h2>
                            </div>
                        </div>

                        {/* Description Below Image - Outside the frame */}
                        <div style={styles.descriptionContainer}>
                            <h3 style={styles.descriptionTitle}>{image.title || image.alt}</h3>
                            <div style={styles.descriptionText}>
                                {displayDescription}
                                {shouldTruncate && (
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        style={styles.readMoreBtn}
                                    >
                                        {isExpanded ? 'Show less' : 'Read more'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Details Side (Right) - NOW "FEED" */}
                    <div style={styles.details}>
                        <div style={styles.header}>
                            {/* User User Info on top right */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={image.user.avatar} style={{ width: 48, height: 48, borderRadius: '50%' }} alt="User" />
                                <span style={{ fontWeight: 'bold' }}>{image.user.name}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="btn" style={{ backgroundColor: '#e9e9e9', borderRadius: '24px', padding: '12px 16px' }}>Follow</button>
                                <button className="btn btn-primary" onClick={() => alert('Saved!')}>Save</button>
                            </div>
                        </div>

                        {/* Title/Desc removed from here, replaced with Suggested Images */}
                        <div style={styles.infoContent}>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>More like this</h3>
                            {/* Using MasonryGrid with 1-2 columns for larger images in sidebar */}
                            {relatedImages.length > 0 ? (
                                <MasonryGrid items={relatedImages} onImageClick={onImageClick} maxColumns={2} initialColumns={1} />
                            ) : (
                                <p style={{ color: '#767676' }}>No related images found.</p>
                            )}
                        </div>

                        {/* Comments could go here if implemented later */}
                        {/* <div style={{ marginTop: '24px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                             <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Comments</h3>
                             <div style={{ color: '#767676' }}>No comments yet!</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
        padding: '20px',
        boxSizing: 'border-box'
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '20px',
        padding: '10px 0'
    },
    card: {
        maxWidth: '1400px', // Increased width for better side-by-side view
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '32px',
        // boxShadow: '0 0 20px rgba(0,0,0,0.05)', // Removed shadow for flatter feel or keep it
        overflow: 'hidden',
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        minHeight: '600px',
        gap: '24px' // Add gap between image and sidebar
    },
    imageContainer: {
        flex: 2, // Take up more space
        minWidth: '350px',
        flexBasis: '600px',
        backgroundColor: '#f9f9f9', // Slightly grey background for image area
        display: 'flex',
        flexDirection: 'column', // Stack image and description vertically
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0', // Full bleed or controlled padding
        position: 'relative',
        borderRadius: '32px', // Rounded corners for the image container itself
        overflow: 'visible' // Allow description to show outside
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // Cover to fill the area, or contain if we want to see full image always. Pinterest uses contain usually with dynamic height. Let's use contain for safety.
        // Actually Pinterest expands height. For this fixed layout, let's try contain but center it.
        objectFit: 'contain',
        maxHeight: '85vh',
        display: 'block'
    },
    overlayActions: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        gap: '12px',
        zIndex: 10
    },
    overlayContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '40px 24px 24px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))', // Gradient for text readability
        color: 'white',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    overlayTitle: {
        fontSize: '32px',
        fontWeight: 'bold', // Extra bold
        marginBottom: '8px',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    overlayDescription: {
        fontSize: '16px',
        lineHeight: '1.5',
        maxWidth: '80%', // Don't span full width for readability
        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
    },
    descriptionContainer: {
        width: '100%',
        padding: '20px 24px',
        backgroundColor: '#fff',
        borderRadius: '0 0 32px 32px' // Round bottom corners
    },
    descriptionTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#111',
        marginBottom: '12px',
        marginTop: '0'
    },
    descriptionText: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#333',
        textAlign: 'left'
    },
    readMoreBtn: {
        background: 'none',
        border: 'none',
        color: '#e60023', // Pinterest red for emphasis
        fontWeight: 'bold',
        cursor: 'pointer',
        padding: 0,
        marginLeft: '5px',
        textDecoration: 'underline'
    },
    readMoreBtnLight: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        padding: 0,
        marginLeft: '5px',
        textDecoration: 'underline'
    },
    details: {
        flex: 1,
        minWidth: '300px',
        flexBasis: '350px',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0', // Less padding
        backgroundColor: 'white'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid #efefef'
    },
    infoContent: {
        flex: 1,
        overflowY: 'auto' // Allow scrolling if list is long
    }
};

export default ImageDetail;
