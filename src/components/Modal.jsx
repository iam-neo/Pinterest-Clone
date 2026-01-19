import React, { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaHeart, FaShare } from 'react-icons/fa';

const LightboxModal = ({ image, onClose }) => {
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

                <div className="modal-layout" style={styles.layout}>
                    {/* Image Side */}
                    <div className="modal-image-container" style={styles.imageContainer}>
                        <img
                            src={image.url}
                            alt={image.alt}
                            style={styles.image}
                        />
                    </div>

                    {/* Details Side (resembling Pinterest modal) */}
                    <div className="modal-details" style={styles.details}>
                        <div style={styles.header}>
                            <div style={styles.iconActions}>
                                <button className="btn-icon"><FaShare /></button>
                                <button className="btn-icon"><FaHeart /></button>
                            </div>
                            <button className="btn btn-primary" onClick={() => alert('Saved!')}>Save</button>
                        </div>

                        <div style={styles.scrollableContent}>
                            <h2 style={styles.title}>{image.alt}</h2>
                            <p style={styles.description}>
                                Uploaded by <strong>{image.user.name}</strong>.
                                This is a sample description for the image showing {image.tags.join(', ')}.
                            </p>

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
        height: '85vh', // Fixed height for standard modal feel
        display: 'flex',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    closeBtn: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    layout: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'row', // Default desktop
    },
    imageContainer: {
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '16px'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        borderRadius: '16px'
    },
    details: {
        width: '360px', // Fixed width side panel
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
        borderLeft: '1px solid #efefef'
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
    scrollableContent: {
        flex: 1,
        overflowY: 'auto'
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
    }
};

export default LightboxModal;
