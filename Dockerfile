
# # Node version
# FROM node:20-alpine AS builder

# # Make work directory
# WORKDIR /usr/src/app

# # Copy files
# COPY package*.json ./
# COPY tsconfig.json ./
# COPY postcss.config.js ./
# COPY tailwind.config.js ./
# COPY . ./

# # Install packages 
# RUN npm install

# # Build application
# RUN npm run build

# # Install global serve
# RUN npm install -g serve

# # PORT defined
# EXPOSE 3000

# # Execute command
# CMD ["serve", "-s", "build", "-p", "3000"]

# Stage 1: Build the React App
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Caddy
FROM caddy:2.7
COPY --from=builder /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile
