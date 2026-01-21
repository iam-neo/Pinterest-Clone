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
        if (navigator.share) {
            try {
                await navigator.share({
                    title: image.title || 'Pinterest Clone Image',
                    text: image.description || 'Check out this image!',
                    url: image.url,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(image.url);
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
                    {/* Image Side */}
                    <div style={styles.imageContainer}>
                        <img
                            src={image.url}
                            alt={image.alt}
                            style={styles.image}
                        />
                    </div>

                    {/* Details Side */}
                    <div style={styles.details}>
                        <div style={styles.header}>
                            <div style={styles.iconActions}>
                                <button className="btn-icon" onClick={handleShare}><FaShare /></button>
                                <button className="btn-icon"><FaHeart /></button>
                            </div>
                            <button className="btn btn-primary" onClick={() => alert('Saved!')}>Save</button>
                        </div>

                        <div style={styles.infoContent}>
                            <h2 style={styles.title}>{image.title || image.alt}</h2>

                            <div style={styles.description}>
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

                            {!image.description && (
                                <p style={styles.description}>
                                    Uploaded by <strong>{image.user.name}</strong>.
                                    {image.tags.length > 0 && ` Tags: ${image.tags.join(', ')}`}
                                </p>
                            )}

                            {/* Comments Section Placeholder */}
                            <div style={{ marginTop: '24px' }}>
                                <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Comments</h3>
                                <div style={{ color: '#767676' }}>No comments yet! Add one to start the conversation.</div>
                            </div>
                        </div>

                        <div style={styles.footer}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={image.user.avatar} style={{ width: 48, height: 48, borderRadius: '50%' }} alt="User" />
                                <span style={{ fontWeight: 'bold' }}>{image.user.name}</span>
                            </div>
                            <button className="btn" style={{ backgroundColor: '#e9e9e9', borderRadius: '24px', padding: '12px 16px' }}>Follow</button>
                        </div>
                    </div>
                </div>

                {/* Related Images Section */}
                {relatedImages.length > 0 && (
                    <div style={styles.relatedSection}>
                        <h3 style={styles.relatedTitle}>More like this</h3>
                        <MasonryGrid items={relatedImages} onImageClick={onImageClick} />
                    </div>
                )}
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
        boxSizing: 'border-box' // Ensure padding doesn't cause overflow
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
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '32px',
        boxShadow: '0 0 20px rgba(0,0,0,0.05)',
        overflow: 'hidden',
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        minHeight: '600px',
    },
    imageContainer: {
        flex: 1,
        minWidth: '300px', // Allow it to shrink on mobile but keep base size
        flexBasis: '400px', // Preferred size
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '80vh',
        objectFit: 'contain',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    details: {
        flex: 1, // Allow details to take remaining space
        minWidth: '300px', // Collapse to stack on small screens
        flexBasis: '350px',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px',
        borderLeft: '1px solid #efefef',
        backgroundColor: 'white'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '24px'
    },
    iconActions: {
        display: 'flex',
        gap: '8px'
    },
    infoContent: {
        flex: 1,
        marginBottom: '24px'
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '12px',
    },
    description: {
        fontSize: '18px',
        color: '#333',
        lineHeight: '1.5'
    },
    readMoreBtn: {
        background: 'none',
        border: 'none',
        color: '#111',
        fontWeight: 'bold',
        cursor: 'pointer',
        padding: 0,
        marginLeft: '5px',
        textDecoration: 'underline'
    },
    footer: {
        borderTop: '1px solid #efefef',
        paddingTop: '20px',
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    relatedSection: {
        padding: '40px',
        borderTop: '1px solid #eee',
        backgroundColor: '#fafafa'
    },
    relatedTitle: {
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '32px'
    }
};

export default ImageDetail;
