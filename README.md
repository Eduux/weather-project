## Next Front end test

This project uses: Next 15, Tailwind, Typescript

## Architecture

```
src
│── utils/               # Global utility functions
│── domain/              # Business logic and types
│   ├── [domain]/        # Specific domain modules
│   │   ├── _tests_/     # Unit tests for business logic
│   │   ├── ...files     # Business logic and type definitions
│── components/          # Reusable UI components
│   ├── ...commonComponents
│── app/                 # Main structure of Next.js 15
│   ├── [page]/          # Next.js pages
│   │   ├── _tests_/     # Unit and integration tests for pages
│   │   ├── ...files     # Page components and logic
```

## Getting Started

Install the dependencies

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run tests

```bash
npm run test
```

# [Live demo vercel #/ ](#)
