import React, { useState } from 'react';
import { FaSearch, FaBell, FaCommentDots } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const Header = ({ searchQuery, setSearchQuery }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <img src="/images/logo/logo.png" alt="Logo" style={{ height: '32px', width: '32px', cursor: 'pointer', objectFit: 'contain' }} />
                <button style={{ ...styles.navBtn, ...styles.navBtnActive }}>Home</button>
                <button style={styles.navBtn}>Create</button>
            </div>

            <div style={styles.searchContainer}>
                <div style={{ ...styles.searchBar, boxShadow: isFocused ? '0 0 0 4px rgba(0, 132, 255, 0.5)' : 'none' }}>
                    <FaSearch color="#767676" size={20} style={{ margin: '0 12px' }} />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={styles.input}
                    />
                </div>
            </div>

            <div style={styles.actionsContainer}>
                <button style={styles.iconBtn}><FaBell size={24} color="#5f5f5f" /></button>
                <button style={styles.iconBtn}><FaCommentDots size={24} color="#5f5f5f" /></button>
                <div style={styles.profile}>
                    <img src="https://i.pravatar.cc/150?u=me" alt="Profile" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                </div>
                <button style={{ ...styles.iconBtn, width: 24, height: 24 }}><IoIosArrowDown /></button>
            </div>
        </header>
    );
};

const styles = {
    header: {
        height: '80px',
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '190px',
    },
    navBtn: {
        padding: '10px 16px',
        borderRadius: '24px',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        color: '#111',
    },
    navBtnActive: {
        backgroundColor: '#111',
        color: '#fff',
    },
    searchContainer: {
        flex: 1,
        padding: '0 8px',
    },
    searchBar: {
        width: '100%',
        height: '48px',
        backgroundColor: '#e9e9e9',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.1s',
    },
    input: {
        flex: 1,
        height: '100%',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '16px',
        outline: 'none',
    },
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        minWidth: '160px',
        justifyContent: 'flex-end',
    },
    iconBtn: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    profile: {
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    }
};

export default Header;
