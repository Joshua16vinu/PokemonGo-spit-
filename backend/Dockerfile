FROM node:18

# Set working directory
WORKDIR /app

# Copy only package files and install deps first (for caching)
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Expose port (your server probably runs on 5000)
EXPOSE 5000

# Start your app
CMD ["node", "index.js"]
