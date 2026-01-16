# TacoFiesta - Premium Mexican Fast Food Experience

[aureliabutton]

TacoFiesta is a visually immersive, high-fidelity web application cloning the core experience of a modern fast-food ordering platform like Taco Bell. It features a vibrant, appetite-inducing interface designed to showcase delicious Mexican-inspired food.

This project demonstrates a full-stack application architecture using React for the frontend and Cloudflare Workers with Durable Objects for the backend state management.

## Features

- **Hero & Promotions Engine**: Dynamic homepage featuring rotating carousels of limited-time offers and high-resolution hero imagery.
- **Menu & Catalog System**: Comprehensive menu organized by categories (Tacos, Burritos, Quesadillas, Sides, Drinks) with rich imagery and details.
- **Product Customization**: Deep customization experience allowing users to modify ingredients, swap proteins, and add extras.
- **Smart Cart & Checkout**: Persistent cart drawer with real-time updates, upsell suggestions, and a multi-step checkout flow.
- **Edge-Based State**: Utilizes Cloudflare Durable Objects for low-latency, consistent session management and cart state.

## Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Routing**: React Router 6
- **Styling**: Tailwind CSS v3 + Tailwind Animate
- **UI Components**: shadcn/ui (Radix Primitives)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Backend
- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Storage**: Cloudflare Durable Objects (for session/cart state)
- **Language**: TypeScript

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (v1.0.0 or higher)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (for Cloudflare deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tacofiesta-web.git
   cd tacofiesta-web
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Development

To start the development server with hot reload:

```bash
bun run dev
```

This will start the Vite development server, typically at `http://localhost:3000`.

**Note:** The backend logic resides in `worker/`. During local development, API calls are proxied or mocked depending on your configuration. For full backend emulation, you may need to run wrangler dev.

## Deployment

This project is designed to be deployed to Cloudflare Workers.

[aureliabutton]

### Manual Deployment

1. Authenticate with Cloudflare:
   ```bash
   npx wrangler login
   ```

2. Deploy the application:
   ```bash
   bun run deploy
   ```

This command builds the frontend assets and deploys the Worker script along with the static assets to Cloudflare.

## Project Structure

- `src/`: Frontend React application
  - `components/`: Reusable UI components (shadcn/ui)
  - `pages/`: Application views (Home, Menu, Checkout)
  - `hooks/`: Custom React hooks
  - `lib/`: Utilities and API clients
- `worker/`: Cloudflare Worker backend
  - `index.ts`: Worker entry point
  - `user-routes.ts`: API route definitions
  - `entities.ts`: Durable Object entity definitions
- `shared/`: Shared types and constants between frontend and backend

## License

This project is licensed under the MIT License - see the LICENSE file for details.