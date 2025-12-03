import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success?: boolean;
  transactionId?: string;
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletId, email, amount, items } = req.body;

    // Validate input
    if (!walletId || !email || !amount || !items) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Circle Payments API Integration
    // In production, you would use the actual Circle API:
    // const circleClient = new CircleClient({ apiKey: process.env.CIRCLE_API_KEY })
    // const payment = await circleClient.payments.create({
    //   idempotencyKey: `${walletId}_${Date.now()}`,
    //   source: {
    //     type: 'wallet',
    //     id: walletId
    //   },
    //   amount: {
    //     amount: amount.toString(),
    //     currency: 'USD'
    //   },
    //   description: `Pizza order for ${email}`,
    //   metadata: {
    //     email,
    //     items: JSON.stringify(items)
    //   }
    // });

    // For now, simulate successful payment
    const transactionId = `tx_circle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // In production, you would also create an order record in your database
    // and potentially trigger settlement through Circle's Settlements API

    return res.status(200).json({
      success: true,
      transactionId: transactionId,
      message: `Payment of $${amount.toFixed(2)} processed successfully for ${email}`,
    });
  } catch (error) {
    console.error('Circle payment processing error:', error);
    return res.status(500).json({
      error: `Failed to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}
