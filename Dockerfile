FROM node:13.12.0-alpine
WORKDIR /Desktop/website
COPY . .
RUN npm install --production
CMD npm run start
