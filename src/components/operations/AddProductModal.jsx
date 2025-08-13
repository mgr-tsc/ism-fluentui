import React, { useState } from "react";
import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  Field,
  Input,
  Label,
  Text,
  Combobox,
  Option,
} from "@fluentui/react-components";
import Modal from "../common/Modal";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
  },

  formField: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
  },

  formRow: {
    display: "flex",
    gap: "12px",
    width: "100%",
    minWidth: 0,
    "@media (max-width: 768px)": {
      flexDirection: "column",
      gap: "20px",
    },
  },

  skuField: {
    flex: "0 0 120px",
    minWidth: 0,
    "@media (max-width: 768px)": {
      flex: "1",
    },
  },

  nameField: {
    flex: "1",
    minWidth: 0,
  },

  secondRowField: {
    flex: "1",
    minWidth: 0,
    maxWidth: "calc(33.33% - 8px)",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
      flex: "none",
    },
  },

  priceInputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  pricePrefix: {
    position: "absolute",
    left: "12px",
    zIndex: 1,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightMedium,
    pointerEvents: "none",
  },

  priceInput: {
    paddingLeft: "28px !important",
  },

  inputWrapper: {
    width: "100%",
  },

  inputField: {
    flexGrow: 0,
    width: "auto",
  },

  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
  },

  requiredIndicator: {
    color: tokens.colorPaletteRedForeground1,
  },
});

const AddProductModal = ({ isOpen, onClose, onSave }) => {
  const styles = useStyles();
  
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    unitOfMeasure: "",
    defaultPrice: "",
    storageArea: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const unitOptions = [
    "piece", "kg", "liter", "gram", "meter", "box", "pack", "dozen", "ton", "gallon"
  ];

  const storageOptions = [
    "Cold area", "Dry area"
  ];

  const validateForm = () => {
    const newErrors = {};

    // SKU validation
    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    } else if (formData.sku.length < 3) {
      newErrors.sku = "SKU must be at least 3 characters";
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Product name must be at least 2 characters";
    }

    // Unit of measure validation
    if (!formData.unitOfMeasure.trim()) {
      newErrors.unitOfMeasure = "Unit of measure is required";
    }

    // Default price validation
    if (!formData.defaultPrice.trim()) {
      newErrors.defaultPrice = "Default price is required";
    } else {
      const price = parseFloat(formData.defaultPrice);
      if (isNaN(price) || price < 0) {
        newErrors.defaultPrice = "Please enter a valid price (minimum 0)";
      }
    }

    // Storage area validation
    if (!formData.storageArea.trim()) {
      newErrors.storageArea = "Storage area is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare data for submission
      const productData = {
        ...formData,
        defaultPrice: parseFloat(formData.defaultPrice),
        createdAt: new Date().toISOString(),
      };
      
      await onSave(productData);
      handleClose();
    } catch (error) {
      console.error("Error saving product:", error);
      // Here you could show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      sku: "",
      name: "",
      unitOfMeasure: "",
      defaultPrice: "",
      storageArea: "",
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Product"
      primaryAction={handleSubmit}
      primaryActionText="Add Product"
      isPrimaryActionDisabled={isSubmitting}
    >
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* First Row: SKU and Product Name */}
        <div className={styles.formRow}>
          <Field className={mergeClasses(styles.formField, styles.skuField)}>
            <Label htmlFor="sku">
              SKU <span className={styles.requiredIndicator}>*</span>
            </Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => handleInputChange("sku", e.target.value)}
              placeholder="Enter SKU"
              autoComplete="off"
            />
            {errors.sku && (
              <Text className={styles.errorText}>{errors.sku}</Text>
            )}
          </Field>

          <Field className={mergeClasses(styles.formField, styles.nameField)}>
            <Label htmlFor="name">
              Product Name <span className={styles.requiredIndicator}>*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter product name"
              autoComplete="off"
              className={styles.inputField}
            />
            {errors.name && (
              <Text className={styles.errorText}>{errors.name}</Text>
            )}
          </Field>
        </div>

        {/* Second Row: Unit of Measure, Default Price, Storage Area */}
        <div className={styles.formRow}>
          <Field className={mergeClasses(styles.formField, styles.secondRowField)}>
            <Label htmlFor="unitOfMeasure">
              Unit of Measure <span className={styles.requiredIndicator}>*</span>
            </Label>
            <Combobox
              id="unitOfMeasure"
              value={formData.unitOfMeasure}
              onOptionSelect={(e, data) => handleInputChange("unitOfMeasure", data.optionValue || "")}
              onInput={(e) => handleInputChange("unitOfMeasure", e.target.value)}
              placeholder="Select unit"
              freeform
            >
              {unitOptions.map((unit) => (
                <Option key={unit} value={unit}>
                  {unit}
                </Option>
              ))}
            </Combobox>
            {errors.unitOfMeasure && (
              <Text className={styles.errorText}>{errors.unitOfMeasure}</Text>
            )}
          </Field>

          <Field className={mergeClasses(styles.formField, styles.secondRowField)}>
            <Label htmlFor="defaultPrice">
              Default Price <span className={styles.requiredIndicator}>*</span>
            </Label>
            <div className={styles.priceInputContainer}>
              <span className={styles.pricePrefix}>$</span>
              <Input
                id="defaultPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.defaultPrice}
                onChange={(e) => handleInputChange("defaultPrice", e.target.value)}
                placeholder="0.00"
                autoComplete="off"
                className={styles.priceInput}
              />
            </div>
            {errors.defaultPrice && (
              <Text className={styles.errorText}>{errors.defaultPrice}</Text>
            )}
          </Field>

          <Field className={mergeClasses(styles.formField, styles.secondRowField)}>
            <Label htmlFor="storageArea">
              Storage Area <span className={styles.requiredIndicator}>*</span>
            </Label>
            <Combobox
              id="storageArea"
              value={formData.storageArea}
              onOptionSelect={(e, data) => handleInputChange("storageArea", data.optionValue || "")}
              placeholder="Select storage area"
            >
              {storageOptions.map((area) => (
                <Option key={area} value={area}>
                  {area}
                </Option>
              ))}
            </Combobox>
            {errors.storageArea && (
              <Text className={styles.errorText}>{errors.storageArea}</Text>
            )}
          </Field>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
