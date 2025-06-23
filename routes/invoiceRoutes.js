import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice
} from "../controllers/invoiceController.js";


const router = express.Router();

// Create Invoice
router.post('/create', verifyToken, createInvoice);

// Get All Invoices
router.get('/all', verifyToken, getAllInvoices);

// Get Single Invoice by ID
router.get('/:id', verifyToken, getInvoiceById);

// Update Invoice by ID
router.put('/:id', verifyToken, updateInvoice);

// Delete Invoice by ID
router.delete('/:id', verifyToken, deleteInvoice);

export default router;
