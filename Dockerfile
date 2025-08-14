FROM alpine
RUN apk add --no-cache nodejs npm
WORKDIR /app
COPY package.json package-lock.json ./
COPY src/ src/
RUN npm ci --production
CMD ["node", "."]
