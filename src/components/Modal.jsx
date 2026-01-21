import React, { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaHeart, FaShare } from 'react-icons/fa';
import MasonryGrid from './MasonryGrid';
import { customImages } from '../utils/customImages';

const LightboxModal = ({ image, onClose, onImageClick }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!image) return null;

    // Filter related images based on usage tags
    const relatedImages = customImages.filter((img) =>
        img.id !== image.id &&
        img.tags.some((tag) => image.tags.includes(tag))
    );

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
            }
        }
    };

    return (
        <div
            style={styles.backdrop}
            onClick={onClose}
        >
            <div
                className="modal-content"
                style={styles.modalContent}
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
            >
                <button style={styles.closeBtn} onClick={onClose}>
                    <IoMdClose size={28} />
                </button>

                <div style={styles.scrollContainer}>
                    <div className="modal-layout" style={styles.layout}>
                        {/* Image Side */}
                        <div className="modal-image-container" style={styles.imageContainer}>
                            <img
                                src={image.url}
                                alt={image.alt}
                                style={styles.image}
                            />
                        </div>

                        {/* Details Side */}
                        <div className="modal-details" style={styles.details}>
                            <div style={styles.header}>
                                <div style={styles.iconActions}>
                                    <button className="btn-icon" onClick={handleShare}><FaShare /></button>
                                    <button className="btn-icon"><FaHeart /></button>
                                </div>
                                <button className="btn btn-primary" onClick={() => alert('Saved!')}>Save</button>
                            </div>

                            <div style={styles.infoContent}>
                                <h2 style={styles.title}>{image.title || image.alt}</h2>
                                <p style={styles.description}>
                                    {image.description}
                                </p>
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
        </div>
    );
};

const styles = {
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px'
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: '32px',
        maxWidth: '1000px',
        width: '100%',
        maxHeight: '90vh', // Constrain height to viewport
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        overflow: 'hidden', // Hide overflow on the rounded container, inner div scrolls
        position: 'relative',
        animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    scrollContainer: {
        overflowY: 'auto',
        height: '100%',
        width: '100%',
    },
    closeBtn: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        background: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    layout: {
        display: 'flex',
        width: '100%',
        minHeight: '600px', // Ensure reasonable height for the main part
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow wrapping on very small screens
    },
    imageContainer: {
        flex: 1,
        minWidth: '300px', // Prevent too small
        backgroundColor: '#fff', // Changed from black/white mix, simple white
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '80vh', // Prevent it from being taller than viewport initially
        objectFit: 'contain',
        borderRadius: '16px'
    },
    details: {
        width: '360px', // Fixed width side panel
        minWidth: '300px', // Will be overridden by media query in CSS
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
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
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    description: {
        fontSize: '16px',
        color: '#333'
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
        padding: '32px',
        borderTop: '1px solid #eee',
        backgroundColor: '#fafafa'
    },
    relatedTitle: {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '24px'
    }
};

export default LightboxModal;
