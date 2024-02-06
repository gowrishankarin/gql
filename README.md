# gql

### Env file

```
PORT = 4000
ORIGIN_PORT=3000
NODE_ENV = 'development'
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ihyay.mongodb.net/gql?retryWrites=true&w=majority
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

## Roadmap

1. JWT auth or Passport OAuth2
2. MongoDB Atlas to Local Mongo
3. Seed data
4. Environments

- Dev
- Stage
- Prod
