"use client";
import { useState, useEffect, useRef } from 'react';
import { 
  FiSearch, 
  FiBell, 
  FiChevronDown,
  FiSettings,
  FiUser,
  FiLogOut,
  FiMoon,
  FiSun,
  FiBookmark 
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useDarkMode from '@/hook/useDarkMode';

const NotificationItem = ({ title, time, isUnread, onClick }) => (
  <div 
    className={`p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${isUnread ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
    onClick={onClick}
  >
    <div className="flex justify-between items-start">
      <p className="text-sm font-medium dark:text-gray-200">{title}</p>
      <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
    </div>
  </div>
);

const Nav = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Nouveau commentaire sur votre article", time: "Il y a 5min", isUnread: true },
    { id: 2, title: "Quelqu'un a partagé votre publication", time: "Il y a 1h", isUnread: true },
    { id: 3, title: "Mise à jour système disponible", time: "Il y a 2h", isUnread: false },
  ]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    name: 'John Doe',
    username: '@johndoe',
    joinedDate: 'June 2021',
    avatar: '',
  });
  const [darkMode, toggleDarkMode] = useDarkMode();

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    // Ajoute ou enlève la classe "dark" sur l'élément HTML selon l'état du dark mode
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotificationDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    // Ajoute l'écouteur d'événements
    document.addEventListener('click', handleClickOutside);

    // Nettoyage à la destruction du composant
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleNotificationClick = () => {
    router.push('/notifications');
  };

  const handleLogout = () => {
    router.push('/deconnexion');
  };

  const profileMenuItems = [
    { 
      icon: FiUser, 
      label: 'Profil', 
      action: () => router.push('/profile')
    },
    { 
      icon: darkMode ? FiSun : FiMoon, 
      label: darkMode ? 'Mode éclairé' : 'Mode sombre', 
      action: () => toggleDarkMode() 
    },
    { 
      icon: FiLogOut, 
      label: 'Déconnexion', 
      action: handleLogout 
    },
  ];

  return (
    <nav className="bg-white border-b dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-white">H5Book</h1>
          </Link>

          {/* Search */}
          <div className="relative">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2 flex items-center w-64 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50">
              <FiSearch className="h-4 w-4 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="ml-2 bg-transparent w-full focus:outline-none text-sm dark:text-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 notification-toggle"
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              >
                <FiBell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                {notifications.some(n => n.isUnread) && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {showNotificationDropdown && (
                <div className="absolute border right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 notification-dropdown">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium dark:text-white">Notifications</h3>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700">
                        Tout marquer comme lu
                      </button>
                    </div>
                    <div className="space-y-2">
                      {notifications.map(notification => (
                        <NotificationItem 
                          key={notification.id} 
                          {...notification} 
                          onClick={handleNotificationClick}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  className="flex items-center space-x-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2 transition duration-200 profile-toggle"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <Image
                    src={user.avatar || 'https://i.pinimg.com/736x/6a/f9/ca/6af9ca755d4d1850c97e89a38a288f24.jpg'}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <FiChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute border right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 profile-dropdown">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Image
                          src={user.avatar || 'https://i.pinimg.com/736x/6a/f9/ca/6af9ca755d4d1850c97e89a38a288f24.jpg'}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="font-medium dark:text-white">{user.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.username}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {profileMenuItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={index}
                              onClick={item.action}
                              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                            >
                              <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-gray-600 dark:text-gray-300">Se connecter</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
