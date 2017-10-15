FROM node:8.5-alpine
WORKDIR /app
COPY . /app
CMD [ "node", "server.js" ]
