FROM node:lts-alpine
WORKDIR /app
COPY package.json /app
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --omit=dev; fi
COPY . /app
CMD ["node","index.js"]
ENV PORT 9000
EXPOSE $PORT