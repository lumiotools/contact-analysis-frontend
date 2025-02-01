# Next.js Frontend Application

This is a Next.js frontend application designed to interact with various APIs. Below are the instructions to set up, configure, and run the application.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Configuration

The application requires specific environment variables to function correctly. Create a `.env.local` file in the root directory of your project and add the following variables:

```env
NEXT_PUBLIC_GRAPH_SERVER_URL=your_graph_server_url
NEXT_PUBLIC_SERVER_URL=your_server_url
NEXT_PUBLIC_CONTRACT_CHAT_API_URL=your_contract_chat_api_url
NEXT_PUBLIC_RATES_NEGOTIATION_CHAT_API_URL=your_rates_negotiation_chat_api_url
```

Replace `your_graph_server_url`, `your_server_url`, `your_contract_chat_api_url`, and `your_rates_negotiation_chat_api_url` with the actual URLs provided for your environment.


## Running the Application

To start the development server, run:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000` by default.

## Building for Production

To build the application for production, use:

```bash
npm run build
```

After building, you can start the production server with:

```bash
npm start
```

Ensure that your environment variables are correctly set in the production environment as well.