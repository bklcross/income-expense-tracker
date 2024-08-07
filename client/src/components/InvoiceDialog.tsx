import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { Invoice } from "../shared/interfaces";

interface InvoiceDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newInvoice: Omit<Invoice, "status">;
  isEdit: boolean;
}

export const InvoiceDialog: React.FC<InvoiceDialogProps> = ({
  open,
  handleClose,
  handleSave,
  handleChange,
  newInvoice,
  isEdit,
}): JSX.Element => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEdit ? "Edit Invoice" : "Add New Invoice"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Client Name"
          type="text"
          fullWidth
          variant="standard"
          value={newInvoice.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="creationDate"
          label="Creation Date"
          type="date"
          fullWidth
          variant="standard"
          value={newInvoice.creationDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          name="referenceNumber"
          label="Reference Number"
          type="number"
          fullWidth
          variant="standard"
          value={newInvoice.referenceNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="amount"
          label="Amount"
          type="number"
          fullWidth
          variant="standard"
          value={newInvoice.amount}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
