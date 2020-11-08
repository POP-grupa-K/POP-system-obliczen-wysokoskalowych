FROM node:13.12.0-alpine

WORKDIR /app

COPY frontend/compute-system/package.json ./
COPY frontend/compute-system/package-lock.json ./

RUN npm install

COPY frontend/compute-system ./

CMD ["npm", "start"]
