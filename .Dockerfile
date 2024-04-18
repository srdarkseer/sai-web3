# Build stage
FROM node:alpine AS build
RUN apk add --no-cache build-base python3 linux-headers udev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:alpine
WORKDIR /app
COPY --from=build /app .
CMD ["npm", "start"]
