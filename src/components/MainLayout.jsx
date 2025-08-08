import React, { useState } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Avatar,
  Button,
  Text,
  Title3,
  Body1,
  Card,
  CardHeader,
  CardFooter,
  Divider,
  Badge,
  MenuButton,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@fluentui/react-components";
import {
  Navigation24Regular,
  Home24Regular,
  People24Regular,
  Document24Regular,
  Settings24Regular,
  ChevronRight24Regular,
  ChevronDown24Regular,
  SignOut24Regular,
  PersonCircle24Regular,
  Building24Regular,
  Calendar24Regular,
  ChartMultiple24Regular,
  Mail24Regular,
  Alert24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "60px",
    backgroundColor: tokens.colorNeutralBackgroundCanvas,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    ...shorthands.padding("0", "24px"),
    zIndex: 1000,
    "@media (max-width: 768px)": {
      ...shorthands.padding("0", "16px"),
      height: "56px",
    },
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    "@media (max-width: 768px)": {
      gap: "12px",
    },
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    "@media (max-width: 768px)": {
      gap: "8px",
    },
  },

  companyInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    "@media (max-width: 768px)": {
      gap: "6px",
    },
  },

  companyName: {
    "@media (max-width: 568px)": {
      display: "none",
    },
  },

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    "@media (max-width: 568px)": {
      gap: "4px",
    },
  },

  notificationButton: {
    "@media (max-width: 480px)": {
      display: "none",
    },
  },

  alertButton: {
    "@media (max-width: 480px)": {
      display: "none",
    },
  },
  
  mainContainer: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  
  sidebar: {
    width: "280px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s ease",
    overflow: "hidden",
    "@media (max-width: 768px)": {
      position: "absolute",
      left: 0,
      top: 0,
      height: "100%",
      zIndex: 999,
      boxShadow: tokens.shadow16,
    },
  },

  sidebarCollapsed: {
    width: "60px",
    "@media (max-width: 768px)": {
      width: "0px",
      borderRight: "none",
    },
  },
  
  sidebarHeader: {
    ...shorthands.padding("16px"),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
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
  
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  
  contentHeader: {
    ...shorthands.padding("24px"),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackgroundCanvas,
    textAlign: "center",
    "@media (max-width: 768px)": {
      ...shorthands.padding("16px"),
    },
  },

  contentBody: {
    flex: 1,
    ...shorthands.padding("24px"),
    overflow: "auto",
    backgroundColor: tokens.colorNeutralBackground1,
    "@media (max-width: 768px)": {
      ...shorthands.padding("16px"),
    },
  },

  dashboard: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "24px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "16px",
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
      gap: "12px",
    },
  },
  
  statsCard: {
    ...shorthands.padding("20px"),
  },
  
  statValue: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorBrandForeground1,
    marginBottom: "4px",
  },
  
  statLabel: {
    color: tokens.colorNeutralForeground2,
  },
  
  footer: {
    height: "40px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...shorthands.padding("0", "24px"),
    "@media (max-width: 768px)": {
      ...shorthands.padding("0", "16px"),
      height: "36px",
    },
  },

  footerText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    "@media (max-width: 568px)": {
      fontSize: tokens.fontSizeBase100,
    },
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

  mainContentWithSidebar: {
    "@media (max-width: 768px)": {
      marginLeft: "0",
    },
  },
  
  notifications: {
    position: "relative",
  },
  
  notificationBadge: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
  },
});

// Mock data
const mockUser = {
  name: "Marco Guevara",
  email: "marco.guevara@acmecorp.com",
  avatar: null,
  role: "Administrator",
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

const MainLayout = ({ onSignOut }) => {
  const styles = useStyles();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [expandedItems, setExpandedItems] = useState(["management"]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home24Regular />, path: "/" },
    { id: "users", label: "Users", icon: <People24Regular />, path: "/users" },
    { id: "projects", label: "Projects", icon: <Document24Regular />, path: "/projects" },
    {
      id: "management",
      label: "Management",
      icon: <Building24Regular />,
      isExpandable: true,
      children: [
        { id: "departments", label: "Departments", path: "/departments" },
        { id: "roles", label: "Roles & Permissions", path: "/roles" },
        { id: "policies", label: "Policies", path: "/policies" },
      ],
    },
    { id: "reports", label: "Reports", icon: <ChartMultiple24Regular />, path: "/reports" },
    { id: "calendar", label: "Calendar", icon: <Calendar24Regular />, path: "/calendar" },
    { id: "settings", label: "Settings", icon: <Settings24Regular />, path: "/settings" },
  ];

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

  const renderNavItem = (item) => {
    const isActive = activeNavItem === item.id;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id}>
        <div
          className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
          onClick={() => {
            if (item.isExpandable) {
              toggleExpandedItem(item.id);
            } else {
              setActiveNavItem(item.id);
            }
          }}
        >
          {item.icon}
          <Text className={`${styles.navItemText} ${isSidebarCollapsed ? styles.navItemTextHidden : ""}`}>
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
                className={`${styles.navItem} ${styles.subNavItem} ${activeNavItem === child.id ? styles.navItemActive : ""}`}
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
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Button
            appearance="subtle"
            icon={<Navigation24Regular />}
            onClick={toggleSidebar}
          />
          <div className={styles.companyInfo}>
            <Building24Regular />
            <Text weight="semibold" className={styles.companyName}>{mockCompany.name}</Text>
            <Badge size="small" appearance="outline">{mockCompany.plan}</Badge>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.headerActions}>
            <div className={`${styles.notifications} ${styles.notificationButton}`}>
              <Button
                appearance="subtle"
                icon={<Mail24Regular />}
              />
              <Badge
                className={styles.notificationBadge}
                appearance="filled"
                color="danger"
                size="extra-small"
              >
                {mockNotifications.length}
              </Badge>
            </div>

            <Button
              appearance="subtle"
              icon={<Alert24Regular />}
              className={styles.alertButton}
            />

            <MenuButton
              menuIcon={null}
            >
              <MenuTrigger disableButtonEnhancement>
                <Avatar
                  name={mockUser.name}
                  size={32}
                  style={{ cursor: "pointer" }}
                />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem icon={<PersonCircle24Regular />}>
                    Profile Settings
                  </MenuItem>
                  <MenuItem icon={<Settings24Regular />}>
                    Account Settings
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<SignOut24Regular />} onClick={onSignOut}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </MenuButton>
          </div>
        </div>
      </header>

      <div className={styles.mainContainer}>
        {/* Mobile Overlay */}
        {isMobile && !isSidebarCollapsed && (
          <div
            className={styles.mobileOverlay}
            onClick={handleOverlayClick}
          />
        )}

        {/* Sidebar */}
        <nav className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ""}`}>
          {!isSidebarCollapsed && (
            <div className={styles.sidebarHeader}>
              <Text weight="semibold">Navigation</Text>
            </div>
          )}
          
          <div className={styles.sidebarNav}>
            {navigationItems.map(renderNavItem)}
          </div>
        </nav>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.contentHeader}>
            <Title3>Dashboard</Title3>
            <Body1>Welcome back, {mockUser.name}! Here's what's happening today.</Body1>
          </div>
          
          <div className={styles.contentBody}>
            {/* Dashboard Stats */}
            <div className={styles.dashboard}>
              {mockStats.map((stat, index) => (
                <Card key={index} className={styles.statsCard}>
                  <CardHeader>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </CardHeader>
                  <CardFooter>
                    <Badge 
                      appearance="filled" 
                      color={stat.trend.startsWith('+') ? 'success' : 'danger'}
                      size="small"
                    >
                      {stat.trend}
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <Title3>Recent Activity</Title3>
              </CardHeader>
              <Divider />
              <div style={{ padding: "16px" }}>
                {mockNotifications.map((notification) => (
                  <div key={notification.id} style={{ marginBottom: "12px" }}>
                    <Body1>{notification.message}</Body1>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                      {notification.time}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <Text className={styles.footerText}>
          © 2024 {mockCompany.name}. All rights reserved.
        </Text>
        <Text className={styles.footerText}>
          Version 1.0.0 | Status: Online
        </Text>
      </footer>
    </div>
  );
};

export default MainLayout;
