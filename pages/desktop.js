import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/RetroDesktop.module.css';

export default function RetroDesktop() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const desktopIcons = [
    {
      id: 'restore-basic',
      name: 'Photo Restore',
      icon: '🖼️',
      path: '/replicate/restore-premium',
      description: 'Restore old damaged photos'
    },
    {
      id: 'restore-premium',
      name: 'Premium Restore',
      icon: '⭐',
      path: '/replicate/restore-premium',
      description: 'Advanced photo restoration'
    },
    {
      id: 'avatar',
      name: 'AI Avatar',
      icon: '🎭',
      path: '/replicate/avatar',
      description: 'Create AI avatars'
    },
    {
      id: 'yearbook',
      name: 'Yearbook Photo',
      icon: '📚',
      path: '/replicate/yearbook',
      description: '90s yearbook style photos'
    },
    {
      id: 'cartoon',
      name: 'Cartoon Me',
      icon: '🎨',
      path: '/replicate/cartoon',
      description: 'Turn photo into cartoon'
    },
    {
      id: 'gallery',
      name: 'Gallery',
      icon: '🖼️',
      path: '/gallery',
      description: 'View photo examples'
    },
    {
      id: 'pricing',
      name: 'Pricing',
      icon: '💰',
      path: '/pricing',
      description: 'View pricing plans'
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: '📝',
      path: '/blog',
      description: 'Photo restoration tips'
    }
  ];

  const startMenuItems = [
    { name: 'Home', icon: '🏠', path: '/' },
    { name: 'About', icon: 'ℹ️', path: '/about' },
    { name: 'Contact', icon: '📧', path: '/contact' },
    { name: 'Login', icon: '🔐', path: '/login' },
    { name: 'Sign Up', icon: '👤', path: '/signup' }
  ];

  const handleIconDoubleClick = (path) => {
    router.push(path);
  };

  const handleStartMenuClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleStartMenuItemClick = (path) => {
    router.push(path);
    setIsStartMenuOpen(false);
  };

  return (
    <>
      <Head>
        <title>Throwback AI Desktop - Photo Restoration Tools</title>
        <meta name="description" content="Retro desktop interface for Throwback AI photo restoration services" />
      </Head>

      <div className={styles.desktop}>
        {/* Desktop Background */}
        <div className={styles.desktopBackground}>
          
          {/* Desktop Icons */}
          <div className={styles.iconsContainer}>
            {desktopIcons.map((icon, index) => (
              <div
                key={icon.id}
                className={styles.desktopIcon}
                onDoubleClick={() => handleIconDoubleClick(icon.path)}
                title={icon.description}
                style={{
                  left: `${50 + (index % 4) * 120}px`,
                  top: `${50 + Math.floor(index / 4) * 100}px`
                }}
              >
                <div className={styles.iconImage}>
                  {icon.icon}
                </div>
                <div className={styles.iconLabel}>
                  {icon.name}
                </div>
              </div>
            ))}
          </div>

          {/* Welcome Window */}
          <div className={styles.welcomeWindow}>
            <div className={styles.windowTitleBar}>
              <div className={styles.windowTitle}>
                <span className={styles.windowIcon}>🎭</span>
                Welcome to Throwback AI
              </div>
              <div className={styles.windowControls}>
                <button className={styles.minimizeBtn}>-</button>
                <button className={styles.maximizeBtn}>□</button>
                <button className={styles.closeBtn}>×</button>
              </div>
            </div>
            <div className={styles.windowContent}>
              <h2>Welcome to Throwback AI Desktop!</h2>
              <p>Double-click any icon to access our photo restoration tools:</p>
              <ul>
                <li>🖼️ <strong>Photo Restore</strong> - Fix damaged old photos</li>
                <li>⭐ <strong>Premium Restore</strong> - Advanced restoration features</li>
                <li>🎭 <strong>AI Avatar</strong> - Create stylized avatars</li>
                <li>📚 <strong>Yearbook Photo</strong> - 90s yearbook style generator</li>
                <li>🎨 <strong>Cartoon Me</strong> - Transform into cartoon style</li>
              </ul>
              <div className={styles.windowActions}>
                <button 
                  className={styles.retryBtn}
                  onClick={() => router.push('/replicate/restore-premium')}
                >
                  Start Restoring Photos
                </button>
                <button 
                  className={styles.exitBtn}
                  onClick={() => router.push('/')}
                >
                  Exit to Modern Site
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Taskbar */}
        <div className={styles.taskbar}>
          <button 
            className={`${styles.startButton} ${isStartMenuOpen ? styles.startButtonActive : ''}`}
            onClick={handleStartMenuClick}
          >
            <span className={styles.startIcon}>🪟</span>
            Start
          </button>

          <div className={styles.taskbarCenter}>
            <div className={styles.quickLaunch}>
              <button 
                className={styles.quickLaunchIcon}
                onClick={() => router.push('/replicate/restore-premium')}
                title="Photo Restore"
              >
                🖼️
              </button>
              <button 
                className={styles.quickLaunchIcon}
                onClick={() => router.push('/replicate/avatar')}
                title="AI Avatar"
              >
                🎭
              </button>
              <button 
                className={styles.quickLaunchIcon}
                onClick={() => router.push('/gallery')}
                title="Gallery"
              >
                🖼️
              </button>
            </div>
          </div>

          <div className={styles.systemTray}>
            <div className={styles.systemTime}>
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
              <br />
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Start Menu */}
        {isStartMenuOpen && (
          <div className={styles.startMenu}>
            <div className={styles.startMenuHeader}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>👤</div>
                <div className={styles.userName}>Throwback User</div>
              </div>
            </div>
            <div className={styles.startMenuItems}>
              {startMenuItems.map((item) => (
                <button
                  key={item.name}
                  className={styles.startMenuItem}
                  onClick={() => handleStartMenuItemClick(item.path)}
                >
                  <span className={styles.startMenuIcon}>{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
            <div className={styles.startMenuFooter}>
              <button 
                className={styles.powerButton}
                onClick={() => router.push('/')}
              >
                🔌 Exit Desktop
              </button>
            </div>
          </div>
        )}

        {/* Click outside to close start menu */}
        {isStartMenuOpen && (
          <div 
            className={styles.startMenuOverlay}
            onClick={() => setIsStartMenuOpen(false)}
          />
        )}
      </div>
    </>
  );
}