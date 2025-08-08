import React, { useState } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";

// Import layout components
import Header from "./layouts/Header";
import Navigation from "./layouts/Navigation";
import Main from "./layouts/Main";
import Footer from "./layouts/Footer";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  
  mainContainer: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
});

// Mock data
const mockUser = {
  name: "Marco Guevara",
  email: "marco.guevara@acmecorp.com",
  avatar: null,
  role: "admin", // Default to admin for testing (can be "admin", "operator", or "guest")
};

const mockCompany = {
  name: "Acme Corporation",
  plan: "Enterprise",
};

const mockStats = [
  { label: "Total Users", value: "1,247", trend: "+12%" },
  { label: "Active Projects", value: "89", trend: "+5%" },
  { label: "Monthly Revenue", value: "$45,890", trend: "+18%" },
  { label: "Support Tickets", value: "23", trend: "-8%" },
];

const mockNotifications = [
  { id: 1, message: "New user registered", time: "5 min ago" },
  { id: 2, message: "System backup completed", time: "1 hour ago" },
  { id: 3, message: "Monthly report ready", time: "2 hours ago" },
];

// Navigation items for the sidebar
const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: "Home24Regular", path: "/" },
  { id: "users", label: "Users", icon: "People24Regular", path: "/users" },
  { id: "projects", label: "Projects", icon: "Document24Regular", path: "/projects" },
  {
    id: "management",
    label: "Management",
    icon: "Building24Regular",
    isExpandable: true,
    children: [
      { id: "departments", label: "Departments", path: "/departments" },
      { id: "roles", label: "Roles & Permissions", path: "/roles" },
      { id: "policies", label: "Policies", path: "/policies" },
    ],
  },
  { id: "reports", label: "Reports", icon: "ChartMultiple24Regular", path: "/reports" },
  { id: "calendar", label: "Calendar", icon: "Calendar24Regular", path: "/calendar" },
  { id: "settings", label: "Settings", icon: "Settings24Regular", path: "/settings" },
];

const MainLayout = ({ onSignOut }) => {
  const styles = useStyles();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [expandedItems, setExpandedItems] = useState(["management"]);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto-collapse on mobile, auto-open on desktop
      setIsSidebarCollapsed(mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      setIsSidebarCollapsed(true);
    }
  };

  const toggleExpandedItem = (itemId) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className={styles.root}>
      {/* Apple-style Header */}
      <Header onSignOut={onSignOut} />

      <div className={styles.mainContainer}>
        {/* Navigation Sidebar */}
        <Navigation 
          isSidebarCollapsed={isSidebarCollapsed}
          isMobile={isMobile}
          activeNavItem={activeNavItem}
          setActiveNavItem={setActiveNavItem}
          expandedItems={expandedItems}
          toggleExpandedItem={toggleExpandedItem}
          handleOverlayClick={handleOverlayClick}
        />

        {/* Main Content */}
        <Main 
          toggleSidebar={toggleSidebar}
          activeNavItem={activeNavItem}
          navigationItems={navigationItems}
          userName={mockUser.name}
          stats={mockStats}
          notifications={mockNotifications}
        />
      </div>

      {/* Footer */}
      <Footer companyName={mockCompany.name} />
    </div>
  );
};

export default MainLayout;
