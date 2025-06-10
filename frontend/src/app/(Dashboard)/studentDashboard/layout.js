"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense, useContext } from "react";
import { usePathname } from "next/navigation"; // Import useRouter

import { StudentContext } from "../../context/StudentContext";
import { StudentLoginContext } from "@/app/context/StudentLoginContext";

import { getStudentById } from "@/app/api/studentApi";

const SidebarLayout = dynamic(() => import("@/app/components/Layout/SidebarLayout"), {
  ssr: false, // Disable SSR for Sidebar component
});
const NavbarLayout = dynamic(() => import("@/app/components/Layout/NavbarLayout"), {
  ssr: false, // Disable SSR for Navbar component
});

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(""); // State for the selected menu
  const { studentState } = useContext(StudentLoginContext)
  const { studentDispatch } = useContext(StudentContext)
  const currentRoute = usePathname()
  // ------------------------ SideBar Menu ---------------------------
  const menuItems = [
    {
      id: 'Announcements',
      label: 'Announcements',
      icon: 'bi bi-bell',
      href: '/studentDashboard/Announcement',
      title: 'Announcements',
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: 'bi bi-list-task',
      href: '/studentDashboard/schedule',
      title: 'View schedule',
    },
    {
      id: 'courseArea',
      label: 'Course Area',
      icon: 'bi bi-journals',
      href: '####',
      title: 'View Course',
      subItems: [
        { label: 'Study Material', href: '/studentDashboard/studyMaterial' },
        { label: 'Assessments', href: '/studentDashboard/Assessments' },
        { label: 'Documents', href: '/studentDashboard/Documents' },
        { label: 'View Attendance', href: '/studentDashboard/viewAttendance' },
      ]
    },
    {
      id: 'recordedVideos',
      label: 'Recorded Videos',
      icon: 'bi bi-record-btn',
      href: '/studentDashboard/recordedVideos',
      title: 'View recorded videos',
    },
    {
      id: 'Fee',
      label: 'Fee',
      icon: 'bi bi-cash-coin',
      href: '/studentDashboard/feeOverview',
      title: 'View recorded videos',
    },
    // Add more menu items as needed
  ];

  async function fetchData() {
    try {
      const StdId = studentState?.studentId
      const responseData = await getStudentById(StdId)
      studentDispatch({
        type: "GET_STUDENT",
        payload: responseData
      })
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Suspense>
      <SidebarLayout
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        menuItems={menuItems}
        dashboardName={"/studentDashboard"}
        onMenuSelect={handleMenuSelect} // Pass the callback to Sidebar
        selectedMenu={selectedMenu} // Pass the selectedMenu to Sidebar
      />
      <div className={`main ${isSidebarOpen ? "" : "expand"}`} style={{ position: "fixed" }}>
        <NavbarLayout
          // toggleSidebar={toggleSidebar}
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