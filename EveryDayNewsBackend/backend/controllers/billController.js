import Bill from "../models/Bill.js";

export const getCustomerBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ dueDate: 1 });
    res.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Failed to fetch bills", error });
  }
};
