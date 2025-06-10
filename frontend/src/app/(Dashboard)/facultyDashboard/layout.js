"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense, useContext } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import { UserContext } from "@/app/context/UserContext";

const SidebarLayout = dynamic(() => import("@/app/components/Layout/SidebarLayout"), {
  ssr: false, // Disable SSR for Sidebar component
});
const NavbarLayout = dynamic(() => import("@/app/components/Layout/NavbarLayout"), {
  ssr: false, // Disable SSR for Navbar component
});

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(""); // State for the selected menu
  const { state } = useContext(UserContext)
  const router = useRouter()
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
        { label: 'Work Report', href: '/facultyDashboard/workReport' },
        { label: 'Announcements', href: '/facultyDashboard/Announcement' }, // No title for sub-items
      ]
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: 'bi bi-list-task',
      href: '/facultyDashboard/schedule',
      title: 'View schedule',
    },
    {
      id: "Batches",
      label: "Batches",
      icon: "bi bi-view-stacked",
      href: "/facultyDashboard/batches",
      title: "Batches",
    },
    {
      id: 'courseArea',
      label: 'Course Area',
      icon: 'bi bi-journals',
      href: '####',
      title: 'View Course',
      subItems: [
        { label: 'Course Progress', href: '/facultyDashboard/courseProgress' },
        { label: 'Study Material', href: '/facultyDashboard/studyMaterial' },
      ]
    },

    // Add more menu items as needed
  ];

  useEffect(() => {
    if (state && state.Role) {

      if (state.Role === "CNSLR" || state.Role === "HR") {
        router.replace('/');
      }
      const handlePopState = (event) => {
        if (state.Role !== 'CNSL' || state.Role !== "HR") {
          router.replace('/facultyDashboard');
        }
      };

      window.onpopstate = handlePopState;

      return () => {
        window.onpopstate = null;
      };
    }
    else {
      router.replace('/')
    }
  }, [])

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
        dashboardName={"/facultyDashboard"}
        onMenuSelect={handleMenuSelect} // Pass the callback to Sidebar
        selectedMenu={selectedMenu} // Pass the selectedMenu to Sidebar

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