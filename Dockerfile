FROM node:carbon
WORKDIR /app
ADD . /app
RUN npm install && npm run test
CMD [ "npm", "start" ]
EXPOSE 80
