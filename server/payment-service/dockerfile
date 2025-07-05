
FROM node:20-alpine
WORKDIR /src
RUN npm install -g pm2 typescript
COPY package*.json ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then \
    npm install --only=production; \
    else npm install; \
    fi
COPY . .
EXPOSE 6000
