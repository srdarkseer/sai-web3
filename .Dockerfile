FROM node:alpine
RUN apk add --no-cache build-base python3 linux-headers udev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
