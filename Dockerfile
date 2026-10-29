FROM node:24.22.1-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY bin/docker.js bin/docker.js
COPY src/ src/
USER node
CMD ["node", "bin/docker.js"]
