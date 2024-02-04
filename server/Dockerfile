FROM node:latest

WORKDIR /app 

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# COPY . /app

RUN npm ci 
COPY . /app 

EXPOSE 4000
CMD ["npm", "run", "start"]