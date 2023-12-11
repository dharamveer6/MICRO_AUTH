# Use a Node.js base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY . .

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container


# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
