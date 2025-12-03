import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success?: boolean;
  walletId?: string;
  email?: string;
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
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    // Circle Wallets API Integration
    // In production, you would use: const circleClient = new CircleClient({ apiKey: process.env.CIRCLE_API_KEY })
    // For now, we simulate the response
    
    const walletId = `circle_wallet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Save wallet association (in production, this would be Circle's API)
    // await circleClient.wallets.create({
    //   accountType: 'USER',
    //   blockchains: ['SOL'],
    //   email: email
    // });

    return res.status(200).json({
      success: true,
      walletId: walletId,
      email: email,
      message: `Circle wallet created for ${email}. Ready to accept USDC payments without crypto wallet!`,
    });
  } catch (error) {
    console.error('Circle wallet creation error:', error);
    return res.status(500).json({
      error: `Failed to create wallet: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}
