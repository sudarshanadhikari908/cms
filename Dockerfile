FROM node:14 as build-deps

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied

COPY . .

RUN yarn install
RUN yarn build


FROM nginx:1.21-alpine
COPY --from=build-deps /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
