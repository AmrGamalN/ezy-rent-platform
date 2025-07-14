# ===== Build Stage =====
FROM node:20-alpine AS builder
WORKDIR /app
COPY ./apps/auth-service/package.json ./app/package.json
COPY ./apps/auth-service/package-lock.json ./app/package-lock.json
RUN npm install
COPY ./docker-entrypoint.sh ./app/docker-entrypoint.sh
COPY ./apps/auth-service/src ./src
RUN npm run build
RUN rm -rf src tsconfig.build.json
RUN npm prune --omit=dev && npm dedupe


# ===== Development Stage =====
FROM node:20-alpine AS dev
WORKDIR /app
COPY ./apps/auth-service/package.json ./package.json
COPY ./apps/auth-service/package-lock.json ./package-lock.json
RUN apk add --no-cache curl
RUN npm install
COPY ./apps/auth-service/.env ./env
COPY apps/auth-service/ecosystem.config.js ./ecosystem.config.js
COPY apps/auth-service/tsconfig.build.json ./tsconfig.build.json
COPY ./apps/auth-service/src ./src
EXPOSE 3000
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["dev"]

# ========== Production Stage ==========
FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env
RUN chmod +x docker-entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["prod"]
