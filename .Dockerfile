FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# RUN apk add --no-cache python3
# RUN npm install
# COPY . .
# RUN npm run build
# CMD ["npm", "start"]