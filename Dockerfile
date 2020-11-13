FROM node:15.2.0-alpine3.10

WORKDIR /app

COPY frontend/compute-system/package.json ./
COPY frontend/compute-system/package-lock.json ./

RUN npm install

COPY frontend/compute-system ./

CMD ["npm", "start"]
