FROM node:23-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Expose the port that your app runs on
EXPOSE 8080

# Define environment variable for production mode (if needed)
ENV NODE_ENV=production

# Run the app when the container launches
CMD ["node", "index.js"]
