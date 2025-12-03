# 🍕 Solami Pizza - Solana USDC Payment Platform

A pizza shop built on Solana where you can actually pay with USDC. No complicated blockchain stuff needed—just connect your wallet, pick your pizza, and pay in stablecoin.

## What You Get

### The Basics (What Actually Works)
- **Shopping cart** - Add pizzas, see your total
- **Pizza menu** - Browse different sizes and toppings
- **Order history** - See what you've ordered before
- **Search & filter** - Find the pizza you want fast
- **Promo codes** - Get discounts on your order
- **Mobile friendly** - Works on phone or desktop

### The Crypto Part
- **USDC payments** - Pay with stablecoin on Solana devnet
- **Multiple wallets** - Works with Phantom, Solflare, or Torus
- **Email wallet option** - Don't have crypto? Use your email instead
- **Real transactions** - Your payment goes straight to the merchant on-chain
- **Order tracking** - See your order saved right away

## Getting Started

### What You Need
- Node.js 16 or higher
- npm (comes with Node)
- A Solana wallet like Phantom (or just use email)

### Run It Locally

```bash
cd app
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Test With Real Payments

1. Get some devnet SOL from [Solana Faucet](https://faucet.solana.com/)
2. Click "Connect Wallet" in the top right
3. Pick your pizzas and add to cart
4. Go to checkout
5. Choose USDC payment
6. Sign the transaction in your wallet
7. Done - check your order history

Or skip the wallet setup and just use the email option to test.

## How The Payment Works

Here's what happens when you pay:

```
You pick pizza and checkout
         ↓
Connect your Solana wallet (or use email)
         ↓
Choose USDC payment
         ↓
System creates transaction with your pizza order
         ↓
You sign it in your wallet
         ↓
Payment gets sent to merchant
         ↓
Order shows up in your history
```

## What's Inside

```
app/
├── app/
│   ├── page.tsx              # Home page with menu
│   ├── cart/page.tsx         # Shopping cart
│   ├── orders/page.tsx       # Your order history
│   ├── customize/[id]/       # Customize pizza sizes & toppings
│   ├── admin/page.tsx        # See all orders (admin)
│   └── layout.tsx            # App wrapper
├── src/
│   ├── components/
│   │   ├── Navigation.tsx    # Top bar with cart
│   │   ├── MenuComponent.tsx # Pizza menu
│   │   ├── USDCPayment.tsx   # Payment handler
│   │   ├── CircleWalletButton.tsx  # Email wallet option
│   │   └── [other UI stuff]
│   ├── context/
│   │   ├── CartContext.tsx   # Cart logic
│   │   └── WalletContext.tsx # Solana setup
│   └── util/
│       ├── const.ts          # Network & wallet settings
│       └── inventory.ts      # Pizza data
└── pages/api/
    └── transaction.ts        # Payment API

program/                       # Smart contract (Rust)
└── programs/pizza_program/   # Stores orders on-chain
```

## Tech Stack

**Frontend stuff:**
- Next.js 13 - React framework
- React 18 - UI library
- TypeScript - Type checking
- Tailwind CSS - Styling

**Crypto stuff:**
- Solana - The blockchain
- @solana/web3.js - Solana SDK
- @solana/wallet-adapter - Wallet support
- Phantom, Solflare, Torus - Wallets you can use
- USDC - Stablecoin token
- Anchor (Rust) - Smart contracts

## What Makes This Different

✅ **Actually works** - Not a demo, real USDC transactions
✅ **No wallet? No problem** - Email option included
✅ **Multi-wallet** - Use whichever wallet you have
✅ **On-chain orders** - Transactions recorded on Solana
✅ **Devnet ready** - Test it safely before mainnet

## Testing Checklist

Before you say it's done:
- [ ] Wallet connects (Phantom/Solflare/Torus)
- [ ] Can browse menu and search pizzas
- [ ] Can add/remove items from cart
- [ ] Promo codes work
- [ ] USDC payment shows up
- [ ] Can sign transaction in wallet
- [ ] Orders show in history after payment
- [ ] Email option works for payment
- [ ] Works on mobile

## Ready for Production?

Not yet, but here's how to get there:

1. **Switch to mainnet** - Change network settings in code
2. **Update USDC address** - Use mainnet USDC token address
3. **Deploy smart contract** - Put it on mainnet Solana
4. **Real merchant wallet** - Use actual payment address
5. **Add security** - Rate limiting, input validation, etc
6. **Test everything** - Way more than the checklist

## Links That Help

- [Solana Docs](https://docs.solana.com)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Solana Pay](https://solanapay.com/)
- [USDC & Solana](https://www.circle.com/en/usdc/solana)

## License

MIT - Use it however you want

---

Built for developers who want to understand how crypto payments actually work. 🚀
