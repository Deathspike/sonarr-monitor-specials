FROM node:24.21.0-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY bin/docker.js bin/docker.js
COPY src/ src/
CMD ["node", "bin/docker.js"]
