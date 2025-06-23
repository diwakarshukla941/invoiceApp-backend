import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxLength: 300,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["paid", "pending", "overdue"],
      default: "pending",
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    clientEmail: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice',invoiceSchema);
export default Invoice;

