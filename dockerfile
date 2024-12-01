# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
