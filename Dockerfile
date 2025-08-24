FROM node:20

# Set the working directory
WORKDIR /app

# Copy backend files
COPY BE/package*.json ./BE/
COPY BE ./BE
# Install backend dependencies
RUN cd BE && npm install

# Copy frontend files
COPY FE/package*.json ./FE/
COPY FE ./FE

# Install FE dependencies
RUN cd FE && npm install

# Build FE
RUN cd FE && npm run build
# Expose the backend and frontend ports
EXPOSE 8001
EXPOSE 3000

# Start both BE and FE (production)
CMD ["sh", "-c", "cd BE && npm start & cd FE && npm start"]