import React from "react";
import {
  makeStyles,
  tokens,
  Text,
} from "@fluentui/react-components";
import Modal from "../common/Modal";

const useStyles = makeStyles({
  placeholderContent: {
    textAlign: "center",
    padding: "40px 20px",
    color: tokens.colorNeutralForeground2,
  },
});

const AddReceptionModal = ({ isOpen, onClose }) => {
  const styles = useStyles();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Reception"
      primaryActionText="Coming Soon"
      isPrimaryActionDisabled={true}
    >
      <div className={styles.placeholderContent}>
        <Text size={400}>
          Reception management feature will be implemented following the same pattern as Add Product.
        </Text>
      </div>
    </Modal>
  );
};

export default AddReceptionModal;
