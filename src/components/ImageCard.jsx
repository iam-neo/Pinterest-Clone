import React, { useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { FaHeart, FaShare } from 'react-icons/fa';
import { MdDownload } from 'react-icons/md';

const ImageCard = ({ image, onClick }) => {
    const { elementRef, isVisible } = useIntersectionObserver();
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Calculate aspect ratio for inline style to prevent layout shift
    const aspectRatio = (image.height / image.width) * 100;

    const handleShare = async (e) => {
        e.stopPropagation();
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
        <div style={{ marginBottom: '24px', breakInside: 'avoid' }}>
            <div
                ref={elementRef}
                className="image-card-container"
                style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'zoom-in',
                    backgroundColor: isLoaded ? 'transparent' : '#e0e0e0',
                    width: '100%',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => onClick(image)}
            >
                {/* Aspect Ratio Box to prevent layout shift */}
                <div style={{ width: '100%', paddingBottom: `${aspectRatio}%` }}></div>

                {isVisible && (
                    <img
                        src={image.url}
                        alt={image.alt}
                        onLoad={() => setIsLoaded(true)}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            opacity: isLoaded ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                )}

                {/* Overlay */}
                {isHovered && (
                    <div className="card-overlay" style={styles.overlay}>
                        {/* Top Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px' }}>
                            <button
                                className="btn btn-primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert('Saved!');
                                }}
                            >
                                Save
                            </button>
                        </div>

                        {/* Bottom Buttons */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 'auto',
                            padding: '12px'
                        }}>
                            <a
                                href={image.url}
                                className="btn-icon"
                                style={{ width: 32, height: 32, color: '#111' }}
                                onClick={(e) => e.stopPropagation()} // Allow default link behavior or download
                                download
                            >
                                <MdDownload />
                            </a>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn-icon" style={{ width: 32, height: 32 }} onClick={handleShare}>
                                    <FaShare size={14} />
                                </button>
                                <button className="btn-icon" style={{ width: 32, height: 32 }} onClick={(e) => e.stopPropagation()}>
                                    <FaHeart size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

const styles = {
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'opacity 0.2s',
    }
};

export default ImageCard;
