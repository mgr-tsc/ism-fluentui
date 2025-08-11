import React, { useState } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  CardHeader,
  CardFooter,
  Text,
  Title3,
  Badge,
  Button,
  Avatar,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Field,
  Input,
  Label,
  Select,
  DatePicker,
  Divider,
  Toolbar,
  ToolbarDivider,
  Body1,
} from "@fluentui/react-components";
import {
  Add24Regular,
  Edit24Regular,
  Delete24Regular,
  PersonCircle24Regular,
  Mail24Regular,
  Calendar24Regular,
  Building24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackgroundCanvas,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding("24px"),
    overflow: "hidden",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "16px",
    },
  },

  headerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  toolbar: {
    marginBottom: "16px",
    ...shorthands.padding("8px", "16px"),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  usersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "16px",
    },
  },

  userCard: {
    height: "auto",
    transition: "all 0.2s ease",
    cursor: "pointer",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow8,
    },
  },

  userCardHeader: {
    ...shorthands.padding("20px", "20px", "0", "20px"),
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },

  userAvatar: {
    width: "48px",
    height: "48px",
  },

  userDetails: {
    flex: 1,
  },

  userName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "4px",
  },

  userEmail: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },

  userMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },

  userCardFooter: {
    ...shorthands.padding("0", "20px", "20px", "20px"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rolesBadgeContainer: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },

  cardActions: {
    display: "flex",
    gap: "8px",
  },

  dialogForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: "400px",
    "@media (max-width: 480px)": {
      minWidth: "300px",
    },
  },

  formRow: {
    display: "flex",
    gap: "16px",
    "@media (max-width: 480px)": {
      flexDirection: "column",
      gap: "12px",
    },
  },

  formField: {
    flex: 1,
  },

  emptyState: {
    textAlign: "center",
    ...shorthands.padding("40px", "20px"),
    color: tokens.colorNeutralForeground2,
  },
});

// Mock users data
const mockUsers = [
  {
    id: "U001",
    firstName: "Marco",
    lastName: "Guevara",
    email: "marco.guevara@acmecorp.com",
    dateOfBirth: "1985-03-15",
    role: "admin",
    avatar: null,
    joinedDate: "2023-01-15",
    lastActive: "2024-01-18",
    status: "Active"
  },
  {
    id: "U002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@acmecorp.com",
    dateOfBirth: "1990-07-22",
    role: "operator",
    avatar: null,
    joinedDate: "2023-03-20",
    lastActive: "2024-01-17",
    status: "Active"
  },
  {
    id: "U003",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@acmecorp.com",
    dateOfBirth: "1988-11-08",
    role: "guest",
    avatar: null,
    joinedDate: "2023-06-10",
    lastActive: "2024-01-16",
    status: "Active"
  },
  {
    id: "U004",
    firstName: "Lisa",
    lastName: "Williams",
    email: "lisa.williams@acmecorp.com",
    dateOfBirth: "1992-02-14",
    role: "operator",
    avatar: null,
    joinedDate: "2023-08-05",
    lastActive: "2024-01-15",
    status: "Inactive"
  }
];

const roleColors = {
  admin: "danger",
  operator: "warning", 
  guest: "brand"
};

const roleLabels = {
  admin: "Administrator",
  operator: "Operator",
  guest: "Guest"
};

const Users = () => {
  const styles = useStyles();
  const [users, setUsers] = useState(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    role: "guest"
  });

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleAddUser = () => {
    const user = {
      id: `U${(users.length + 1).toString().padStart(3, '0')}`,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      dateOfBirth: newUser.dateOfBirth,
      role: newUser.role,
      avatar: null,
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      status: "Active"
    };

    setUsers([...users, user]);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      role: "guest"
    });
    setIsAddDialogOpen(false);
  };

  const handleEditUser = (userId) => {
    console.log("Edit user:", userId);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const getStatusBadge = (status) => {
    return (
      <Badge 
        appearance="filled" 
        color={status === "Active" ? "success" : "subtle"}
        size="small"
      >
        {status}
      </Badge>
    );
  };

  const getRoleBadge = (role) => {
    return (
      <Badge 
        appearance="filled" 
        color={roleColors[role]}
        size="small"
      >
        {roleLabels[role]}
      </Badge>
    );
  };

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <Title3>Users Management</Title3>
          <Text>Manage company users and their roles</Text>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={(event, data) => setIsAddDialogOpen(data.open)}>
          <DialogTrigger disableButtonEnhancement>
            <Button 
              appearance="primary" 
              icon={<Add24Regular />}
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add New User
            </Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Add New User</DialogTitle>
              <DialogContent>
                <div className={styles.dialogForm}>
                  <div className={styles.formRow}>
                    <Field className={styles.formField}>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                        placeholder="Enter first name"
                      />
                    </Field>
                    <Field className={styles.formField}>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                        placeholder="Enter last name"
                      />
                    </Field>
                  </div>
                  
                  <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </Field>
                  
                  <Field>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={newUser.dateOfBirth}
                      onChange={(e) => setNewUser({...newUser, dateOfBirth: e.target.value})}
                    />
                  </Field>
                  
                  <Field>
                    <Label htmlFor="role">Role</Label>
                    <Select
                      id="role"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    >
                      <option value="guest">Guest</option>
                      <option value="operator">Operator</option>
                      <option value="admin">Administrator</option>
                    </Select>
                  </Field>
                </div>
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Cancel</Button>
                </DialogTrigger>
                <Button 
                  appearance="primary" 
                  onClick={handleAddUser}
                  disabled={!newUser.firstName || !newUser.lastName || !newUser.email}
                >
                  Add User
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>

      {/* Users Grid */}
      <div className={styles.usersGrid}>
        {users.map((user) => (
          <Card key={user.id} className={styles.userCard}>
            <div className={styles.userCardHeader}>
              <div className={styles.userInfo}>
                <Avatar
                  className={styles.userAvatar}
                  name={`${user.firstName} ${user.lastName}`}
                  size={48}
                />
                <div className={styles.userDetails}>
                  <div className={styles.userName}>
                    {user.firstName} {user.lastName}
                  </div>
                  <div className={styles.userEmail}>
                    {user.email}
                  </div>
                </div>
              </div>
              
              <div className={styles.userMeta}>
                <div className={styles.metaRow}>
                  <Mail24Regular />
                  <Text>{user.email}</Text>
                </div>
                <div className={styles.metaRow}>
                  <Calendar24Regular />
                  <Text>Joined: {user.joinedDate}</Text>
                </div>
                <div className={styles.metaRow}>
                  <Building24Regular />
                  <Text>ID: {user.id}</Text>
                </div>
              </div>
            </div>
            
            <CardFooter className={styles.userCardFooter}>
              <div className={styles.rolesBadgeContainer}>
                {getRoleBadge(user.role)}
                {getStatusBadge(user.status)}
              </div>
              
              <div className={styles.cardActions}>
                <Button
                  appearance="subtle"
                  icon={<Edit24Regular />}
                  size="small"
                  onClick={() => handleEditUser(user.id)}
                />
                <Button
                  appearance="subtle"
                  icon={<Delete24Regular />}
                  size="small"
                  onClick={() => handleDeleteUser(user.id)}
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <div className={styles.emptyState}>
          <PersonCircle24Regular style={{ fontSize: "48px", marginBottom: "16px" }} />
          <Title3>No Users Found</Title3>
          <Body1>Start by adding your first user to the system.</Body1>
        </div>
      )}
    </Card>
  );
};

export default Users;
