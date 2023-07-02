FROM node:latest as prod

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build
# CMD ["yarn", "dev"]

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=prod /app/dist .

EXPOSE 80

# run nginx with global directives and daemon off

ENTRYPOINT ["nginx", "-g", "daemon off;"]