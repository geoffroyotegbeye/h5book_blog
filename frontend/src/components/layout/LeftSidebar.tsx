"use client";

import { BiHome, BiBookOpen, BiGroup, BiBriefcase, BiCog, BiUser, BiBarChart, BiComment, BiSave, BiRefresh, BiShield, BiTag, BiUserPlus, BiLock, BiSearch, BiBell, BiWrench } from 'react-icons/bi';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import { GiFamilyTree } from 'react-icons/gi';

const navigationItems = [
  { id: 1, label: 'Mon flux', icon: BiHome, path: '/' },
  { id: 2, label: 'Mes favoris', icon: FaStar, path: '/favoris' },
  { id: 3, label: 'Ma dev-familly', icon: GiFamilyTree, path: '/discussion' },
  { id: 4, label: 'Mon espace admin', icon: BiBriefcase, path: '/admin/dashboard' },
];

const adminMenuItems = [
  {
    id: 2,
    label: 'Articles',
    icon: BiBookOpen,
    isDropdown: true,
    dropdownItems: [
      { id: 1, label: 'Tous les articles', icon: BiBookOpen, path: '/admin/articles' },
      { id: 2, label: 'Catégories', icon: BiBookOpen, path: '/admin/categories' },
      { id: 3, label: 'Mots-clés/Tags', icon: BiTag, path: '/admin/tags' },
    ],
  },
  {
    id: 3,
    label: 'Utilisateurs',
    icon: BiGroup,
    isDropdown: true,
    dropdownItems: [
      { id: 1, label: 'Tous les utilisateurs', icon: BiUser, path: '/admin/users' },
      { id: 2, label: 'Rôles', icon: BiUserPlus, path: '/admin/roles' },
      { id: 3, label: 'Permissions', icon: BiLock, path: '/admin/permissions' },
    ],
  },
  {
    id: 4,
    label: 'Commentaires',
    icon: BiComment,
    path: '/admin/comments',
  },
  // {
  //   id: 5,
  //   label: 'Réglages',
  //   icon: BiCog,
  //   isDropdown: true,
  //   dropdownItems: [
  //     { id: 1, label: 'Paramètres du blog', icon: BiCog, path: '/admin/settings' },
  //     { id: 2, label: 'SEO', icon: BiSearch, path: '/admin/seo' },
  //     { id: 3, label: 'Notifications', icon: BiBell, path: '/admin/notifications' },
  //   ],
  // },
  // {
  //   id: 6,
  //   label: 'Statistiques',
  //   icon: BiBarChart,
  //   isDropdown: true,
  //   dropdownItems: [
  //     { id: 1, label: 'Rapports de trafic', icon: BiBarChart, path: '/admin/reports/traffic' },
  //     { id: 2, label: 'Rapports sur les articles', icon: BiBookOpen, path: '/admin/reports/articles' },
  //     { id: 3, label: 'Rapports des commentaires', icon: BiComment, path: '/admin/reports/comments' },
  //   ],
  // },
  // {
  //   id: 7,
  //   label: 'Maintenance',
  //   icon: BiWrench,
  //   isDropdown: true,
  //   dropdownItems: [
  //     { id: 1, label: 'Sauvegardes', icon: BiSave, path: '/admin/backup' },
  //     { id: 2, label: 'Mises à jour', icon: BiRefresh, path: '/admin/updates' },
  //     { id: 3, label: 'Sécurité', icon: BiShield, path: '/admin/security' },
  //   ],
  // },
];

export default function LeftSidebar() {
  const [selectedNav, setSelectedNav] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check active link and open the dropdown if the current path is within a dropdown
    const currentItem = [...navigationItems, ...adminMenuItems]
      .flatMap(item => item.isDropdown ? item.dropdownItems || [] : [item])
      .find(item => item.path === pathname);

    if (currentItem) {
      setSelectedNav(currentItem.label);
      const parentDropdown = adminMenuItems.find(item => item.dropdownItems?.some(dropdown => dropdown.path === pathname));
      if (parentDropdown) {
        setOpenDropdown(parentDropdown.id);
      }
    }
  }, [pathname]);

  const filteredNavigationItems = pathname.startsWith('/admin')
    ? [...navigationItems, ...adminMenuItems]
    : navigationItems;

  const toggleDropdown = (id: number) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <aside className="p-4 border shadow-md rounded-lg sticky top-24 bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
      <h2 className="text-lg font-semibold mb-4">Menu</h2>
      <div className="space-y-2">
        {filteredNavigationItems.map((item) => {
          const Icon = item.icon;

          if (item.isDropdown) {
            return (
              <div key={item.id}>
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="flex items-center gap-3 p-2 w-full text-left rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
                {openDropdown === item.id && (
                  <div className="pl-8 space-y-2 mt-2">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.id}
                        href={dropdownItem.path}
                        onClick={() => setSelectedNav(dropdownItem.label)}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${selectedNav === dropdownItem.label
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-600 dark:text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <dropdownItem.icon size={20} />
                        <span>{dropdownItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.path}
              onClick={() => setSelectedNav(item.label)}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${selectedNav === item.label
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-600 dark:text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
