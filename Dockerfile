FROM node:4-onbuild
RUN npm run test
EXPOSE 3001
