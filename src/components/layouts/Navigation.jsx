import React from "react";
import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  Text,
  Button,
} from "@fluentui/react-components";
import {
  Home24Regular,
  People24Regular,
  Settings24Regular,
  ChevronRight24Regular,
  ChevronDown24Regular,
  Building24Regular,
  Calendar24Regular,
  ChartMultiple24Regular,
  Add24Regular,
  Table24Regular,
  Box24Regular,
  Receipt24Regular,
  DocumentText24Regular,
  Navigation24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  sidebar: {
    width: "280px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    overflow: "hidden",
    "@media (max-width: 768px)": {
      position: "fixed",
      left: 0,
      top: 0,
      height: "100vh",
      zIndex: 999,
      boxShadow: tokens.shadow16,
      transform: "translateX(0)",
    },
  },

  sidebarCollapsed: {
    width: "60px",
    "@media (max-width: 768px)": {
      transform: "translateX(-100%)",
    },
  },
  
  sidebarHeader: {
    ...shorthands.padding("16px"),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toggleButton: {
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  
  sidebarNav: {
    flex: 1,
    ...shorthands.padding("8px", "0"),
    overflow: "auto",
  },
  
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    ...shorthands.padding("12px", "16px"),
    ...shorthands.margin("2px", "8px"),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    cursor: "pointer",
    textDecoration: "none",
    color: tokens.colorNeutralForeground1,
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  
  navItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  
  navItemText: {
    opacity: 1,
    transition: "opacity 0.3s ease",
  },
  
  navItemTextHidden: {
    opacity: 0,
    width: 0,
    overflow: "hidden",
  },
  
  subNavItem: {
    marginLeft: "28px",
    fontSize: tokens.fontSizeBase200,
  },

  mobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
    display: "none",
    "@media (max-width: 768px)": {
      display: "block",
    },
  },
});

const Navigation = ({
  isSidebarCollapsed,
  isMobile,
  activeNavItem,
  setActiveNavItem,
  expandedItems,
  toggleExpandedItem,
  handleOverlayClick,
  toggleSidebar,
  userRole = "admin" // Default to admin for testing
}) => {
  const styles = useStyles();

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home24Regular />, path: "/", roles: ["admin", "operator", "guest"] },
    { id: "users", label: "Users", icon: <People24Regular />, path: "/users", roles: ["admin"] },
    {
      id: "operations",
      label: "Operations",
      icon: <Building24Regular />,
      isExpandable: true,
      roles: ["admin"],
      children: [
        { id: "add-product", label: "Add Product", path: "/operations/add-product", icon: <Add24Regular /> },
        { id: "add-reception", label: "Add Reception", path: "/operations/add-reception", icon: <Receipt24Regular /> },
      ],
    },
    {
      id: "tables",
      label: "Tables",
      icon: <Table24Regular />,
      isExpandable: true,
      roles: ["admin"],
      children: [
        { id: "products", label: "Products", path: "/tables/products", icon: <Box24Regular /> },
        { id: "invoices", label: "Invoices", path: "/tables/invoices", icon: <DocumentText24Regular /> },
        { id: "receptions", label: "Receptions", path: "/tables/receptions", icon: <Receipt24Regular /> },
      ],
    },
    { id: "reports", label: "Reports", icon: <ChartMultiple24Regular />, path: "/reports", roles: ["admin"] },
    { id: "calendar", label: "Calendar", icon: <Calendar24Regular />, path: "/calendar", roles: ["admin", "operator", "guest"] },
    { id: "settings", label: "Settings", icon: <Settings24Regular />, path: "/settings", roles: ["admin"] },
  ];

  // Filter navigation items based on user role
  const filteredNavigationItems = navigationItems.filter(item =>
    item.roles.includes(userRole.toLowerCase())
  );

  const renderNavItem = (item) => {
    const isActive = activeNavItem === item.id;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id}>
        <div
          className={mergeClasses(styles.navItem, isActive && styles.navItemActive)}
          onClick={() => {
            if (item.isExpandable) {
              toggleExpandedItem(item.id);
            } else {
              setActiveNavItem(item.id);
            }
          }}
        >
          {item.icon}
          <Text className={mergeClasses(styles.navItemText, isSidebarCollapsed && styles.navItemTextHidden)}>
            {item.label}
          </Text>
          {item.isExpandable && !isSidebarCollapsed && (
            isExpanded ? <ChevronDown24Regular /> : <ChevronRight24Regular />
          )}
        </div>
        
        {item.children && isExpanded && !isSidebarCollapsed && (
          <div>
            {item.children.map(child => (
              <div
                key={child.id}
                className={mergeClasses(styles.navItem, styles.subNavItem, activeNavItem === child.id && styles.navItemActive)}
                onClick={() => setActiveNavItem(child.id)}
              >
                <Text>{child.label}</Text>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isSidebarCollapsed && (
        <div
          className={styles.mobileOverlay}
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <nav className={mergeClasses(styles.sidebar, isSidebarCollapsed && styles.sidebarCollapsed)}>
        {!isSidebarCollapsed && (
          <div className={styles.sidebarHeader}>
            <Text weight="semibold">Navigation</Text>
            <Button
              appearance="subtle"
              icon={<Navigation24Regular />}
              onClick={toggleSidebar}
              className={styles.toggleButton}
            />
          </div>
        )}
        
        <div className={styles.sidebarNav}>
          {filteredNavigationItems.map(renderNavItem)}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
