const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');

// Validation middleware
exports.validateOrder = [
  body('customerId').isMongoId().withMessage('Invalid customer ID'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number')
];

async function handleOrderCreate(orderData) {
  const newOrder = new Order(orderData);
  await newOrder.save();
  return newOrder;
}

// Create order handler
exports.createOrder = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const order = req.body;
    console.log(`[x] Creating order with payload: ${JSON.stringify(order)}`);
    
    // Ensure customerId is present
    if (!order.customerId) {
      return res.status(400).json({ error: 'CustomerId is required' });
    }

    const savedOrder = await handleOrderCreate(order);
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(`Error creating order: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};
