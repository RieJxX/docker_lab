FROM node:20-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

WORKDIR /app

COPY --chown=appuser:appgroup package.json package-lock.json ./
RUN npm install --omit=dev

COPY --chown=appuser:appgroup ./src ./src

RUN ls /app/src

EXPOSE 3000

CMD ["sh", "-c", "node ./src/migration.js && node ./src/server.js"]
