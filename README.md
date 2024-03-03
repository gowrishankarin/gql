# gql

### Env file

```
PORT = 4000
ORIGIN_PORT=3000
NODE_ENV = 'development'
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ihyay.mongodb.net/gql?retryWrites=true&w=majority
GOOGLE_CLIENT_ID=<Google Client Id>
GOOGLE_CLIENT_SECRET=<Google Client Secret>
```

## Container Orchestration

Run app using the below command

```
> docker compose up
```

### Run FE/BE inside a docker container and FE local

#### BE

```
> cd server
> docker build -t <image name> .
> docker run --dns 8.8.8.4 --dns 8.8.8.8 --expose 4000 -p 127.0.0.1:4000:4000 -it <image name>
-alternatively-
> docker run --dns 8.8.8.4 --dns 8.8.8.8 -p 4000:4000 --rm -it cosmos
```

#### FE

```
> cd client
> docker build -t <image-name> .
> docker run -p 3000:3000 -it cosmos-fe
```

### Run FE/BE Local

#### BE

```
> cd server
> npm run start
-alternatively for development mode-
> npm run dev
```

#### FE

```
> cd client
> npm ci
> npm run start
```

## Security

### JWT Authentication
How to generate a JWT token?
```
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
How to add expressJwt authentication
https://github.com/mandiwise/basic-apollo-auth-demo/blob/main/src/index.js

How to migrate from `@apollo/server` to `apollo-server-express`
https://www.apollographql.com/docs/apollo-server/migration#migrate-from-apollo-server-express

How to secure the queries and mutations
https://youtu.be/dBuU61ABEDs?t=790


## Roadmap

1. JWT auth or Passport OAuth2
2. MongoDB Atlas to Local Mongo
3. Seed data
4. Environments

- Dev
- Stage
- Prod
