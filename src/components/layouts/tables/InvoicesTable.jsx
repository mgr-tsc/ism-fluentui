import React, { useState } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  CardHeader,
  Text,
  Title3,
  Badge,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Checkbox,
  Toolbar,
  ToolbarDivider,
} from "@fluentui/react-components";
import {
  DocumentPdf24Regular,
  Print24Regular,
  DocumentText24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  tableContainer: {
    backgroundColor: tokens.colorNeutralBackgroundCanvas,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding("24px"),
    overflow: "hidden",
  },

  tableWrapper: {
    overflow: "auto",
    maxHeight: "600px",
  },

  actionButton: {
    marginRight: "8px",
  },

  amountCell: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },

  invoiceIcon: {
    width: "32px",
    height: "32px",
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground2,
  },

  tableHeader: {
    backgroundColor: tokens.colorNeutralBackground2,
  },

  toolbar: {
    marginBottom: "16px",
    ...shorthands.padding("8px", "16px"),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  checkboxColumn: {
    width: "50px",
  },
});

// Mock invoices data
const mockInvoices = [
  {
    id: "INV-2024-001",
    customerName: "Acme Corporation",
    customerEmail: "billing@acme.com",
    amount: 1245.99,
    status: "Paid",
    dueDate: "2024-01-30",
    issueDate: "2024-01-15",
    items: 5
  },
  {
    id: "INV-2024-002", 
    customerName: "Tech Solutions Ltd",
    customerEmail: "accounts@techsol.com",
    amount: 899.50,
    status: "Pending",
    dueDate: "2024-02-15",
    issueDate: "2024-01-16",
    items: 3
  },
  {
    id: "INV-2024-003",
    customerName: "Global Industries",
    customerEmail: "finance@global.com", 
    amount: 2150.75,
    status: "Overdue",
    dueDate: "2024-01-10",
    issueDate: "2024-01-01",
    items: 8
  },
  {
    id: "INV-2024-004",
    customerName: "StartUp Inc",
    customerEmail: "admin@startup.com",
    amount: 456.99,
    status: "Draft",
    dueDate: "2024-02-20",
    issueDate: "2024-01-17",
    items: 2
  },
  {
    id: "INV-2024-005",
    customerName: "Enterprise Corp",
    customerEmail: "billing@enterprise.com",
    amount: 3250.00,
    status: "Paid",
    dueDate: "2024-01-25",
    issueDate: "2024-01-10",
    items: 12
  },
  {
    id: "INV-2024-006",
    customerName: "Small Business Co",
    customerEmail: "owner@smallbiz.com",
    amount: 189.99,
    status: "Pending",
    dueDate: "2024-02-10",
    issueDate: "2024-01-18",
    items: 1
  }
];

const InvoicesTable = () => {
  const styles = useStyles();
  const [selectedItems, setSelectedItems] = useState([]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge appearance="filled" color="success">Paid</Badge>;
      case "Pending":
        return <Badge appearance="filled" color="warning">Pending</Badge>;
      case "Overdue":
        return <Badge appearance="filled" color="danger">Overdue</Badge>;
      case "Draft":
        return <Badge appearance="outline">Draft</Badge>;
      default:
        return <Badge appearance="outline">{status}</Badge>;
    }
  };

  const handleSelectItem = (invoiceId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, invoiceId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== invoiceId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(mockInvoices.map(invoice => invoice.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleExportToPDF = () => {
    console.log("Export selected invoices to PDF:", selectedItems);
    setSelectedItems([]);
  };

  const handlePrint = () => {
    console.log("Print selected invoices:", selectedItems);
    setSelectedItems([]);
  };

  const isAllSelected = selectedItems.length === mockInvoices.length && mockInvoices.length > 0;
  const isSomeSelected = selectedItems.length > 0 && selectedItems.length < mockInvoices.length;

  return (
    <Card className={styles.tableContainer}>
      <CardHeader>
        <Title3>Invoices Management</Title3>
        <Text>Track and manage customer invoices</Text>
      </CardHeader>

      {/* Toolbar */}
      {selectedItems.length > 0 && (
        <div className={styles.toolbar}>
          <Toolbar>
            <Text>{selectedItems.length} item(s) selected</Text>
            <ToolbarDivider />
            <Button
              appearance="primary"
              icon={<Delete24Regular />}
              onClick={handleRemoveSelected}
            >
              Remove ({selectedItems.length})
            </Button>
          </Toolbar>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <Table arial-label="Invoices table" style={{ minWidth: "900px" }}>
          <TableHeader className={styles.tableHeader}>
            <TableRow>
              <TableHeaderCell className={styles.checkboxColumn}>
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={(e, data) => handleSelectAll(data.checked)}
                />
              </TableHeaderCell>
              <TableHeaderCell>Invoice</TableHeaderCell>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Issue Date</TableHeaderCell>
              <TableHeaderCell>Due Date</TableHeaderCell>
              <TableHeaderCell>Items</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(invoice.id)}
                    onChange={(e, data) => handleSelectItem(invoice.id, data.checked)}
                  />
                </TableCell>
                <TableCell>
                  <TableCellLayout
                    media={
                      <div className={styles.invoiceIcon}>
                        <DocumentText24Regular />
                      </div>
                    }
                  >
                    <Text weight="semibold">{invoice.id}</Text>
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{invoice.customerName}</Text>
                </TableCell>
                <TableCell>
                  <Text>{invoice.customerEmail}</Text>
                </TableCell>
                <TableCell>
                  <Text className={styles.amountCell}>${invoice.amount.toFixed(2)}</Text>
                </TableCell>
                <TableCell>
                  {getStatusBadge(invoice.status)}
                </TableCell>
                <TableCell>
                  <Text>{invoice.issueDate}</Text>
                </TableCell>
                <TableCell>
                  <Text>{invoice.dueDate}</Text>
                </TableCell>
                <TableCell>
                  <Text>{invoice.items} items</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default InvoicesTable;
