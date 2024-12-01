# 🚀 Project Management Frontend

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Technologies](#technologies)
- [Contributing](#contributing)

## 🛠 Prerequisites

- **Node.js**: v18 or later
- **npm**: v9 or later

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mahatoHariom/project-management-frontend.git
cd client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_WS_URL=ws://localhost:8080
NEXT_PUBLIC_BASE_URL=http://localhost:9000/api/v1
```

### 4. Run Development Server

```bash
npm run dev
```

🌐 Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
│
├── app/           # Next.js application routes
├── components/    # Reusable React components
├── lib/           # Utility functions
├── redux/         # State management
└── styles/        # Global styles
```

## 🔧 Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 📦 Key Technologies

- **Framework**: Next.js 15
- **Language**: TypeScript
- **State Management**: 
  - Redux Toolkit
  - React Query
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **HTTP Client**: Axios

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some Amazing Feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 🛡️ Troubleshooting

- Verify Node.js and npm versions
- Check environment variables
- Ensure backend services are running

## 📄 License

[Specify Your License]

## 📞 Contact

[Your Contact Information]
```
