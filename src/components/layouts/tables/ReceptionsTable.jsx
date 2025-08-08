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
  Receipt24Regular,
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

  quantityCell: {
    fontWeight: tokens.fontWeightSemibold,
  },

  receptionIcon: {
    width: "32px",
    height: "32px",
    backgroundColor: tokens.colorPaletteLightGreenBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorPaletteLightGreenForeground2,
  },

  tableHeader: {
    backgroundColor: tokens.colorNeutralBackground2,
  },

  supplierCell: {
    fontWeight: tokens.fontWeightMedium,
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

// Mock receptions data
const mockReceptions = [
  {
    id: "REC-2024-001",
    supplierName: "Tech Components Ltd",
    productName: "Wireless Headphones",
    quantity: 50,
    unitPrice: 89.99,
    totalAmount: 4499.50,
    status: "Completed",
    receivedDate: "2024-01-15",
    expectedDate: "2024-01-15",
    receivedBy: "John Smith"
  },
  {
    id: "REC-2024-002", 
    supplierName: "Home Appliances Co",
    productName: "Coffee Makers",
    quantity: 25,
    unitPrice: 65.00,
    totalAmount: 1625.00,
    status: "Pending",
    receivedDate: null,
    expectedDate: "2024-01-20",
    receivedBy: null
  },
  {
    id: "REC-2024-003",
    supplierName: "Office Furniture Inc",
    productName: "Desk Lamps",
    quantity: 30,
    unitPrice: 24.99,
    totalAmount: 749.70,
    status: "Partial",
    receivedDate: "2024-01-18",
    expectedDate: "2024-01-18",
    receivedBy: "Sarah Johnson"
  },
  {
    id: "REC-2024-004",
    supplierName: "Electronics Wholesale",
    productName: "Bluetooth Speakers",
    quantity: 75,
    unitPrice: 45.99,
    totalAmount: 3449.25,
    status: "Completed",
    receivedDate: "2024-01-12",
    expectedDate: "2024-01-12",
    receivedBy: "Mike Davis"
  },
  {
    id: "REC-2024-005",
    supplierName: "Ergonomic Solutions",
    productName: "Office Chairs",
    quantity: 15,
    unitPrice: 199.99,
    totalAmount: 2999.85,
    status: "Delayed",
    receivedDate: null,
    expectedDate: "2024-01-10",
    receivedBy: null
  },
  {
    id: "REC-2024-006",
    supplierName: "Mobile Accessories",
    productName: "Phone Cases",
    quantity: 200,
    unitPrice: 12.50,
    totalAmount: 2500.00,
    status: "Completed",
    receivedDate: "2024-01-16",
    expectedDate: "2024-01-16",
    receivedBy: "Lisa Wilson"
  }
];

const ReceptionsTable = () => {
  const styles = useStyles();
  const [selectedItems, setSelectedItems] = useState([]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge appearance="filled" color="success">Completed</Badge>;
      case "Pending":
        return <Badge appearance="filled" color="warning">Pending</Badge>;
      case "Partial":
        return <Badge appearance="filled" color="brand">Partial</Badge>;
      case "Delayed":
        return <Badge appearance="filled" color="danger">Delayed</Badge>;
      default:
        return <Badge appearance="outline">{status}</Badge>;
    }
  };

  const handleSelectItem = (receptionId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, receptionId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== receptionId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(mockReceptions.map(reception => reception.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleRemoveSelected = () => {
    console.log("Remove selected receptions:", selectedItems);
    setSelectedItems([]);
  };

  const isAllSelected = selectedItems.length === mockReceptions.length && mockReceptions.length > 0;
  const isSomeSelected = selectedItems.length > 0 && selectedItems.length < mockReceptions.length;

  return (
    <Card className={styles.tableContainer}>
      <CardHeader>
        <Title3>Receptions Management</Title3>
        <Text>Track incoming product deliveries and receptions</Text>
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
        <Table arial-label="Receptions table" style={{ minWidth: "1000px" }}>
          <TableHeader className={styles.tableHeader}>
            <TableRow>
              <TableHeaderCell className={styles.checkboxColumn}>
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={(e, data) => handleSelectAll(data.checked)}
                />
              </TableHeaderCell>
              <TableHeaderCell>Reception ID</TableHeaderCell>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Unit Price</TableHeaderCell>
              <TableHeaderCell>Total Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Expected Date</TableHeaderCell>
              <TableHeaderCell>Received Date</TableHeaderCell>
              <TableHeaderCell>Received By</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReceptions.map((reception) => (
              <TableRow key={reception.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(reception.id)}
                    onChange={(e, data) => handleSelectItem(reception.id, data.checked)}
                  />
                </TableCell>
                <TableCell>
                  <TableCellLayout
                    media={
                      <div className={styles.receptionIcon}>
                        <Receipt24Regular />
                      </div>
                    }
                  >
                    <Text weight="semibold">{reception.id}</Text>
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <Text className={styles.supplierCell}>{reception.supplierName}</Text>
                </TableCell>
                <TableCell>
                  <Text>{reception.productName}</Text>
                </TableCell>
                <TableCell>
                  <Text className={styles.quantityCell}>{reception.quantity}</Text>
                </TableCell>
                <TableCell>
                  <Text>${reception.unitPrice.toFixed(2)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">${reception.totalAmount.toFixed(2)}</Text>
                </TableCell>
                <TableCell>
                  {getStatusBadge(reception.status)}
                </TableCell>
                <TableCell>
                  <Text>{reception.expectedDate}</Text>
                </TableCell>
                <TableCell>
                  <Text>{reception.receivedDate || "-"}</Text>
                </TableCell>
                <TableCell>
                  <Text>{reception.receivedBy || "-"}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ReceptionsTable;
