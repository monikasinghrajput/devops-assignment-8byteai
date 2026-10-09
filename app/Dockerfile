
# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency 
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Create production build
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy React production files into Nginx web root
COPY --from=build /app/build /usr/share/nginx/html

# HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]