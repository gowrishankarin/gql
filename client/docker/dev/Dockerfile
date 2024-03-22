# Development
FROM node:18.12.1
# RUN apk add --no-cache g++ make py3-pip
WORKDIR /client
COPY package*.json /client/
RUN npm i
COPY . /client/
EXPOSE 3000
EXPOSE 35729
CMD ["npm", "run", "start"]
