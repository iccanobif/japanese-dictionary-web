# Build stage
FROM node:26-alpine AS builder

RUN npm install -g yarn

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY src ./src
COPY public ./public
COPY . .

# Build the React application
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

