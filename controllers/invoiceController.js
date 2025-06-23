import Invoice from "../models/Invoice.js";

export const createInvoice = async (req, res) => {
  try {
    const {
      title,
      description,
      amount,
      dueDate,
      status,
      clientName,
      clientEmail,
    } = req.body;

    if (
      !title ||
      !description ||
      !amount ||
      !dueDate ||
      !status ||
      !clientName ||
      !clientEmail
    ) {
      return res.status(400).json({
        message: "Bad Request All Fields Required",
      });
    }

    const invoice = new Invoice({
      title,
      description,
      amount,
      dueDate,
      status,
      clientName,
      clientEmail,
      createdBy: req.user.userId,
    });
    await invoice.save();

    return res.status(201).json({
      message: "Invoice Saved Successfully",
      invoice,
    });
  } catch (error) {
  console.error("Error creating invoice:", error.message);

  return res.status(500).json({
    message: "Something went wrong",
    error: error.message,
  });
}
};

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ createdBy: req.user.userId });

    res.status(200).json({
      message: "Fetched invoices successfully",
      invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getInvoiceById = async (req, res) => {
  const id = req.params.id;
  const Invoices = await Invoice.findOne({
    _id: id,
    createdBy: req.user.userId,
  });

  if (!Invoices) {
    return res.status(404).json({
      message: "There is no Invoices Found",
    });
  } else {
    return res.status(200).json({
      message: "Here Are the Invoices You requested",
      Invoices,
    });
  }
};

export const updateInvoice = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const UpdatedInvoice = await Invoice.findOneAndUpdate(
    { _id: id, createdBy: req.user.userId },
    updates,
    { new: true }
  );
  if (!UpdatedInvoice) {
    return res.status(500).json({ message: "something went wrong....." });
  }
  return res.status(200).json({
    message: "Invoice Updated Successfully",
  });
};

export const deleteInvoice = async (req, res) => {
  const id = req.params.id;
  try {
  const deletedInvoice = await Invoice.findOneAndDelete({
      _id: id,
      createdBy: req.user.userId,
    });

    if (!deletedInvoice) {
      return res.status(404).json({
        message: " invoice not found",
      });
    }
    return res.status(200).json({
      message: "record deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
        message:"internal server error"
    })
  }
};
