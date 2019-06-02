FROM node:4-onbuild
RUN npm install && npm run test
RUN npm start
EXPOSE 80
