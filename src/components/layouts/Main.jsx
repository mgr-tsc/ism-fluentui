import React, { useState } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Text,
  Title3,
  Body1,
  Card,
  CardHeader,
  CardFooter,
  Divider,
  Badge,
  Button,
} from "@fluentui/react-components";
import {
  Add24Regular,
  Receipt24Regular,
} from "@fluentui/react-icons";

// Import table components
import ProductsTable from "./tables/ProductsTable";
import InvoicesTable from "./tables/InvoicesTable";
import ReceptionsTable from "./tables/ReceptionsTable";

// Import other components
import Users from "./Users";

// Import operation components
import AddProductModal from "../operations/AddProductModal";
import AddReceptionModal from "../operations/AddReceptionModal";

const useStyles = makeStyles({
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

  operationsSection: {
    marginBottom: "32px",
  },

  operationsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginTop: "16px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "12px",
    },
  },

  operationCard: {
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow8,
    },
  },

  operationCardContent: {
    ...shorthands.padding("20px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    textAlign: "center",
  },

  operationIcon: {
    width: "48px",
    height: "48px",
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.borderRadius("50%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground2,
  },

  operationTitle: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },

  operationDescription: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
});

const Main = ({
  activeNavItem,
  navigationItems,
  userName = "User",
  stats = [],
  notifications = []
}) => {
  const styles = useStyles();
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddReceptionModalOpen, setIsAddReceptionModalOpen] = useState(false);

  const getActiveItemLabel = () => {
    // Find the active item in main navigation
    const mainItem = navigationItems.find(item => item.id === activeNavItem);
    if (mainItem) return mainItem.label;

    // Check if it's a sub-item and return hierarchical path
    for (const item of navigationItems) {
      if (item.children) {
        const subItem = item.children.find(child => child.id === activeNavItem);
        if (subItem) return `${item.label} / ${subItem.label}`;
      }
    }

    return "Dashboard";
  };

  const isDashboard = activeNavItem === "dashboard";

  return (
    <main className={styles.mainContent}>
      <div className={styles.contentHeader}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: isDashboard ? "8px" : "0" }}>
          <Title3>
            {getActiveItemLabel()}
          </Title3>
        </div>
        {isDashboard && (
          <Body1>Welcome back, {userName}! Here's what's happening today.</Body1>
        )}
      </div>
      
      <div className={styles.contentBody}>
        {/* Render content based on active navigation item */}
        {activeNavItem === "users" && <Users />}
        {activeNavItem === "products" && <ProductsTable />}
        {activeNavItem === "invoices" && <InvoicesTable />}
        {activeNavItem === "receptions" && <ReceptionsTable />}

        {/* Default Dashboard Content */}
        {!["users", "products", "invoices", "receptions"].includes(activeNavItem) && (
          <>
            {/* Dashboard Stats */}
            <div className={styles.dashboard}>
              {stats.map((stat, index) => (
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
                {notifications.map((notification) => (
                  <div key={notification.id} style={{ marginBottom: "12px" }}>
                    <Body1>{notification.message}</Body1>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                      {notification.time}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </main>
  );
};

export default Main;
