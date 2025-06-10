"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
export default function SidebarLayout({
  isSidebarOpen,
  toggleSidebar,
  menuItems,
  dashboardName,
  onMenuSelect,
  selectedMenu,
}) {
  const [iconClass, setIconClass] = useState("bi bi-grid-fill");
  useEffect(() => {
    const updateIconOnResize = () => {
      if (window.innerWidth < 576) {
        setIconClass("bi bi-arrow-left");
      } else {
        setIconClass("bi bi-grid-fill");
      }
    };

    window.addEventListener("resize", updateIconOnResize);
    updateIconOnResize();

    return () => window.removeEventListener("resize", updateIconOnResize);
  }, []);

  const handleMenuClick = (menuLabel) => {
    onMenuSelect(menuLabel); // Pass the selected menu to the parent    
  };

  return (
    <aside id="sidebar" className={isSidebarOpen ? "" : "small-expand expand"}>
      <div>
        <div className="sidebar-body">
          <div className={`d-flex justify-content-between align-item-center bg-white py-sm-3 ${isSidebarOpen ? "py-3" : "py-1"} border-transparent`}>
            <div className="sidebar-logo ms-4">
              <Link href={dashboardName}>
                <img src="/Logo/TechStack.png" alt="" style={{ height: "44px" }} />
              </Link>
            </div>

            <button
              className={`toggle-btn ${isSidebarOpen ? "" : "show"}`}
              type="button"
              onClick={toggleSidebar}
            >
              <i id="Sidebar-Btn" className={`${iconClass} text-dark`}></i>
            </button>
          </div>

          <ul className="sidebar-nav">
            {menuItems.map((item, index) => (
              <li key={index} className={`sidebar-item`}>
                <Link
                  className={`sidebar-link ${item.subItems ? "collapsed has-dropdown" : ""} 
                  ${selectedMenu === item.label ? "active" : ""}`}
                  data-bs-toggle={item.subItems ? "collapse" : null}
                  data-bs-target={item.subItems ? `#${item.id}` : null}
                  aria-expanded="false"
                  aria-controls={item.subItems ? item.id : ""}
                  href={item.href}
                  onClick={() => {
                    if (!item.subItems) {
                      handleMenuClick(item.label, item.href);
                      toggleSidebar();
                    }
                  }}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
                {item.subItems && (
                  <ul
                    id={item.id}
                    className="sidebar-dropdown list-unstyled collapse"
                    data-bs-parent="#sidebar"
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="sidebar-item">
                        <Link
                          href={subItem.href}
                          className={`sidebar-link ps-3 ms-5 
                            ${selectedMenu === subItem.label ? "active" : ""}`}
                          onClick={() => {
                            handleMenuClick(subItem.label, subItem.href);
                            toggleSidebar();
                          }}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
