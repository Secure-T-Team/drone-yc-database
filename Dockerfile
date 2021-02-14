FROM node:alpine

# RUN apk add postgresql
RUN apk add postgresql-client

WORKDIR /bin/drone-yc-database
COPY package*.json ./
RUN npm ci --only=production

COPY src src

ENTRYPOINT [ "node", "/bin/drone-yc-database" ]