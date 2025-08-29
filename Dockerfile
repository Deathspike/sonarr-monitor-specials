FROM node:22-alpine
WORKDIR /app
COPY bin/ bin/
COPY package.json package-lock.json ./
COPY src/ src/
RUN npm ci --production
ENV INTERVAL=86400000
CMD ["node", "bin/cli.js"]
