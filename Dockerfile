# Set the base image to use for the container
FROM node:alpine

# Set a working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all of the app's files into the container
COPY . .

# Build the app for production
RUN npm run build

# Serve the production build with a lightweight web server
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]