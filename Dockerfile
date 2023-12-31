# Base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install pnpm
RUN npm install -g pnpm

# Install the app's dependencies
RUN pnpm install

# Copy the rest of the app's files to the container
COPY . .

# Expose port 3000 (the port your Express.js app will listen on)
EXPOSE 3000


# Set the container's default command
CMD [ "pnpm", "start" ]