FROM node:18.12.1-alpine3.15

WORKDIR /usr/src/blog-front

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]