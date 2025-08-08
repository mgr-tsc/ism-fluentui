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
  Box24Regular,
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

  productImage: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  priceCell: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },

  stockCell: {
    fontWeight: tokens.fontWeightMedium,
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

// Mock products data
const mockProducts = [
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    status: "Active",
    lastUpdated: "2024-01-15"
  },
  {
    id: "P002", 
    name: "Coffee Maker",
    category: "Appliances",
    price: 89.99,
    stock: 23,
    status: "Active",
    lastUpdated: "2024-01-14"
  },
  {
    id: "P003",
    name: "Desk Lamp",
    category: "Furniture",
    price: 34.99,
    stock: 0,
    status: "Out of Stock",
    lastUpdated: "2024-01-13"
  },
  {
    id: "P004",
    name: "Bluetooth Speaker",
    category: "Electronics", 
    price: 79.99,
    stock: 67,
    status: "Active",
    lastUpdated: "2024-01-12"
  },
  {
    id: "P005",
    name: "Office Chair",
    category: "Furniture",
    price: 299.99,
    stock: 12,
    status: "Low Stock",
    lastUpdated: "2024-01-11"
  },
  {
    id: "P006",
    name: "Smartphone Case",
    category: "Accessories",
    price: 24.99,
    stock: 156,
    status: "Active",
    lastUpdated: "2024-01-10"
  }
];

const ProductsTable = () => {
  const styles = useStyles();
  const [selectedItems, setSelectedItems] = useState([]);

  const getStatusBadge = (status, stock) => {
    if (stock === 0) {
      return <Badge appearance="filled" color="danger">Out of Stock</Badge>;
    } else if (stock < 20) {
      return <Badge appearance="filled" color="warning">Low Stock</Badge>;
    } else {
      return <Badge appearance="filled" color="success">Active</Badge>;
    }
  };

  const handleSelectItem = (productId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, productId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(mockProducts.map(product => product.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleExportToPDF = () => {
    console.log("Export selected products to PDF:", selectedItems);
    setSelectedItems([]);
  };

  const handlePrint = () => {
    console.log("Print selected products:", selectedItems);
    setSelectedItems([]);
  };

  const isAllSelected = selectedItems.length === mockProducts.length && mockProducts.length > 0;
  const isSomeSelected = selectedItems.length > 0 && selectedItems.length < mockProducts.length;

  return (
    <Card className={styles.tableContainer}>
      <CardHeader>
        <Title3>Products Inventory</Title3>
        <Text>Manage your product catalog and inventory</Text>
      </CardHeader>

      {/* Toolbar */}
      {selectedItems.length > 0 && (
        <div className={styles.toolbar}>
          <Toolbar>
            <Text>{selectedItems.length} item(s) selected</Text>
            <ToolbarDivider />
            <Button
              appearance="primary"
              icon={<DocumentPdf24Regular />}
              onClick={handleExportToPDF}
            >
              Export to PDF
            </Button>
            <Button
              appearance="secondary"
              icon={<Print24Regular />}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Toolbar>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <Table arial-label="Products table" style={{ minWidth: "800px" }}>
          <TableHeader className={styles.tableHeader}>
            <TableRow>
              <TableHeaderCell className={styles.checkboxColumn}>
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={(e, data) => handleSelectAll(data.checked)}
                />
              </TableHeaderCell>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Stock</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Last Updated</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(product.id)}
                    onChange={(e, data) => handleSelectItem(product.id, data.checked)}
                  />
                </TableCell>
                <TableCell>
                  <TableCellLayout
                    media={
                      <div className={styles.productImage}>
                        <Box24Regular />
                      </div>
                    }
                  >
                    <Text weight="semibold">{product.name}</Text>
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <Text>{product.id}</Text>
                </TableCell>
                <TableCell>
                  <Text>{product.category}</Text>
                </TableCell>
                <TableCell>
                  <Text className={styles.priceCell}>${product.price}</Text>
                </TableCell>
                <TableCell>
                  <Text className={styles.stockCell}>{product.stock}</Text>
                </TableCell>
                <TableCell>
                  {getStatusBadge(product.status, product.stock)}
                </TableCell>
                <TableCell>
                  <Text>{product.lastUpdated}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ProductsTable;
