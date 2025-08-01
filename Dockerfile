FROM node:22-alpine

WORKDIR /app

# Copy everything 
COPY . .

# Install dependencies
RUN npm install

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
