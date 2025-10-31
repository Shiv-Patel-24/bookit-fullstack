const express = require('express');
const router = express.Router();

// Promo codes database (in production, store in DB)
const promoCodes = {
  'SAVE10': { discount: 10, type: 'percentage' },
  'FLAT100': { discount: 100, type: 'fixed' },
  'WELCOME20': { discount: 20, type: 'percentage' },
  'FIRST50': { discount: 50, type: 'fixed' }
};

// POST /api/promo/validate - Validate promo code
router.post('/validate', (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    if (!code) {
      return res.status(400).json({ 
        success: false, 
        message: 'Promo code is required' 
      });
    }

    const promo = promoCodes[code.toUpperCase()];

    if (!promo) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid promo code' 
      });
    }

    let discountAmount = 0;
    if (promo.type === 'percentage') {
      discountAmount = (totalAmount * promo.discount) / 100;
    } else {
      discountAmount = promo.discount;
    }

    // Ensure discount doesn't exceed total
    discountAmount = Math.min(discountAmount, totalAmount);

    res.json({
      success: true,
      message: 'Promo code applied successfully',
      data: {
        code: code.toUpperCase(),
        discount: discountAmount,
        type: promo.type,
        finalAmount: totalAmount - discountAmount
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
