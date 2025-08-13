import React from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
} from "@fluentui/react-components";
import {
  Dismiss24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  dialogSurface: {
    maxWidth: "600px",
    width: "90vw",
    maxHeight: "90vh",
    ...shorthands.margin("auto"),
    "@media (max-width: 768px)": {
      width: "95vw",
      maxWidth: "none",
      ...shorthands.margin("0"),
      height: "100vh",
      maxHeight: "100vh",
      ...shorthands.borderRadius("0"),
    },
  },
  
  dialogHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...shorthands.padding("24px", "24px", "16px"),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    "@media (max-width: 768px)": {
      ...shorthands.padding("16px"),
    },
  },
  
  dialogBody: {
    ...shorthands.padding("24px"),
    maxHeight: "60vh",
    maxWidth: "553px",
    overflow: "auto",
    "@media (max-width: 768px)": {
      ...shorthands.padding("16px"),
      maxHeight: "calc(100vh - 200px)",
    },
  },
  
  dialogActions: {
    ...shorthands.padding("16px", "24px", "24px"),
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    "@media (max-width: 768px)": {
      ...shorthands.padding("16px"),
      flexDirection: "column-reverse",
    },
  },

  contentContainer: {
    display: "flex",
    flexDirection: "row",
    width: "auto",
    flexWrap: "wrap",
  },
  
  closeButton: {
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
});

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  primaryActionText = "Save",
  secondaryActionText = "Cancel",
  isPrimaryActionDisabled = false,
  size = "medium"
}) => {
  const styles = useStyles();

  return (
    <Dialog open={isOpen} onOpenChange={(event, data) => !data.open && onClose()}>
      <DialogSurface className={styles.dialogSurface}>
        <div className={styles.dialogHeader}>
          <DialogTitle>{title}</DialogTitle>
          <Button
            appearance="subtle"
            icon={<Dismiss24Regular />}
            onClick={onClose}
            className={styles.closeButton}
          />
        </div>
        
        <DialogBody className={styles.dialogBody}>
          <div className={styles.contentContainer}>
            {children}
          </div>
        </DialogBody>
        
        <DialogActions className={styles.dialogActions}>
          <Button
            appearance="secondary"
            onClick={secondaryAction || onClose}
          >
            {secondaryActionText}
          </Button>
          <Button
            appearance="primary"
            onClick={primaryAction}
            disabled={isPrimaryActionDisabled}
          >
            {primaryActionText}
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

export default Modal;
