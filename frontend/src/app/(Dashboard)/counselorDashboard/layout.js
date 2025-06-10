"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation"; // Import useRouter

const SidebarLayout = dynamic(() => import("@/app/components/Layout/SidebarLayout"), {
  ssr: false, // Disable SSR for Sidebar component
});
const NavbarLayout = dynamic(() => import("@/app/components/Layout/NavbarLayout"), {
  ssr: false, // Disable SSR for Navbar component
});

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(""); // State for the selected menu
  const currentRoute = usePathname()
  // ------------------------ SideBar Menu ---------------------------
  const menuItems = [
    {
      id: 'workReport',
      label: 'Work Report',
      icon: 'bi bi-clipboard-data',
      href: '###',
      title: 'View work reports',
      subItems: [
        { label: 'Work Report', href: '/counselorDashboard/workReport' },
        { label: 'Announcements', href: '/counselorDashboard/Announcement' }, // No title for sub-items
      ]
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: 'bi bi-list-task',
      href: '/counselorDashboard/schedule',
      title: 'View schedule',
    },
    {
      id: 'courseArea',
      label: 'Course Area',
      icon: 'bi bi-journals',
      href: '###',
      title: 'View Course',
      subItems: [
        { label: 'Study Material', href: '/counselorDashboard/studyMaterial' }
      ]
    },
    {
      id: 'studentAdmission',
      label: 'Student Admission',
      icon: 'bi bi-people',
      href: '/counselorDashboard/newAdmission',
      title: 'Student Admission',
    },
    {
      id: 'Leads ',
      label: 'Leads ',
      icon: 'bi bi-graph-up-arrow',
      href: '/counselorDashboard/Leads',
      title: 'Leads',
    },

    // Add more menu items as needed
  ];

  // Handle the selection of a menu item
  const handleMenuSelect = (menuLabel) => {
    setSelectedMenu(menuLabel); // Set the selected menu based on click
  };

  // Update the selected menu based on current route (tracked by router)
  useEffect(() => {
    // You can check if the current route matches any menu href and set the selectedMenu
    const currentMenu = menuItems.find(item => item.href === currentRoute) || menuItems.find(item => item.subItems && item.subItems.some(subItem => subItem.href === currentRoute));
    if (currentMenu) {
      setSelectedMenu(currentMenu.label);
    }
  }, [currentRoute]);

  return (
    <Suspense>
      <SidebarLayout
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}        
        menuItems={menuItems}
        dashboardName={"/counselorDashboard"}
        onMenuSelect={handleMenuSelect} // Pass the callback to Sidebar
      />
      <div className={`main ${isSidebarOpen ? "" : "expand"}`} style={{ position: "fixed" }}>
        <NavbarLayout
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          selectedMenu={selectedMenu} // Pass the selected menu to Navbar
        />
        <div className='pt-5 px-4 mt-5 Layout-Fixed-scroll'>
          {children}
        </div>
      </div>
    </Suspense>
  );
}

