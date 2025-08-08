import React from "react";
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
  Avatar,
} from "@fluentui/react-components";
import {
  Edit24Regular,
  Delete24Regular,
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

  const getStatusBadge = (status, stock) => {
    if (stock === 0) {
      return <Badge appearance="filled" color="danger">Out of Stock</Badge>;
    } else if (stock < 20) {
      return <Badge appearance="filled" color="warning">Low Stock</Badge>;
    } else {
      return <Badge appearance="filled" color="success">Active</Badge>;
    }
  };

  const handleEdit = (productId) => {
    console.log("Edit product:", productId);
  };

  const handleDelete = (productId) => {
    console.log("Delete product:", productId);
  };

  return (
    <Card className={styles.tableContainer}>
      <CardHeader>
        <Title3>Products Inventory</Title3>
        <Text>Manage your product catalog and inventory</Text>
      </CardHeader>
      
      <div className={styles.tableWrapper}>
        <Table arial-label="Products table" style={{ minWidth: "800px" }}>
          <TableHeader className={styles.tableHeader}>
            <TableRow>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Stock</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Last Updated</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.id}>
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
                <TableCell>
                  <Button
                    appearance="subtle"
                    icon={<Edit24Regular />}
                    onClick={() => handleEdit(product.id)}
                    className={styles.actionButton}
                    size="small"
                  />
                  <Button
                    appearance="subtle"
                    icon={<Delete24Regular />}
                    onClick={() => handleDelete(product.id)}
                    size="small"
                  />
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
