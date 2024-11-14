import { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiPlusCircle, 
  FiBell, 
  FiChevronDown,
  FiSettings,
  FiUser,
  FiLogOut,
  FiMoon,
  FiBookmark 
} from 'react-icons/fi';
import Image from 'next/image';

const NotificationItem = ({ title, time, isUnread }) => (
  <div className={`p-2 rounded-lg hover:bg-gray-50 cursor-pointer ${isUnread ? 'bg-blue-50' : ''}`}>
    <div className="flex justify-between items-start">
      <p className="text-sm font-medium">{title}</p>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  </div>
);

const Nav = () => {
  const [searchText, setSearchText] = useState('');
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Nouveau commentaire sur votre article", time: "Il y a 5min", isUnread: true },
    { id: 2, title: "Quelqu'un a partagé votre publication", time: "Il y a 1h", isUnread: true },
    { id: 3, title: "Mise à jour système disponible", time: "Il y a 2h", isUnread: false },
  ]);

  const [user] = useState({
    name: 'John Doe',
    username: '@johndoe',
    joinedDate: 'June 2021',
    avatar: 'https://cdn.leonardo.ai/users/83a0a692-8a58-450e-8f43-3630710f9e9a/generations/7193be61-f386-4cf8-a987-6c91c91b4ba6/Leonardo_Lightning_XL_watercolor_art_two_little_cartoon_hearts_1.jpg?w=512'
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-dropdown') && 
          !event.target.closest('.notification-toggle')) {
        setShowNotificationDropdown(false);
      }
      if (!event.target.closest('.profile-dropdown') && 
          !event.target.closest('.profile-toggle')) {
        setShowProfileDropdown(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const profileMenuItems = [
    { icon: FiUser, label: 'Profil', action: () => console.log('Profile clicked') },
    { icon: FiBookmark, label: 'Mes articles', action: () => console.log('Articles clicked') },
    { icon: FiSettings, label: 'Paramètres', action: () => console.log('Settings clicked') },
    { icon: FiMoon, label: 'Mode sombre', action: () => console.log('Dark mode clicked') },
    { icon: FiLogOut, label: 'Déconnexion', action: () => console.log('Logout clicked') },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">H5book</h1>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="bg-gray-50 rounded-lg px-4 py-2 flex items-center w-64 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50">
                <FiSearch className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="ml-2 bg-transparent w-full focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* New Post Button */}
            <button className="flex items-center rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition duration-200">
              <FiPlusCircle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Nouveau Post</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                className="relative p-2 rounded-lg hover:bg-gray-100 transition duration-200 notification-toggle"
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              >
                <FiBell className="h-5 w-5 text-gray-600" />
                {notifications.some(n => n.isUnread) && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 notification-dropdown">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Notifications</h3>
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        Tout marquer comme lu
                      </button>
                    </div>
                    <div className="space-y-2">
                      {notifications.map(notification => (
                        <NotificationItem key={notification.id} {...notification} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 rounded-lg hover:bg-gray-100 p-2 transition duration-200 profile-toggle"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <FiChevronDown className="h-4 w-4 text-gray-600" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 profile-dropdown">
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.username}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {profileMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={index}
                            onClick={item.action}
                            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition duration-200"
                          >
                            <Icon className="h-5 w-5 text-gray-500" />
                            <span className="text-sm">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
