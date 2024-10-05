FROM node:22-alpine AS production

WORKDIR /datn/readstation_client

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "preview" ]