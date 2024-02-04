# gql

### Env file

```
PORT = 4000
ORIGIN_PORT=3000
NODE_ENV = 'development'
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ihyay.mongodb.net/gql?retryWrites=true&w=majority
```

### Run BE inside a docker container and FE local

```
> cd server
> docker build -t <image name>
> docker run --dns 8.8.8.4 --dns 8.8.8.8 --expose 4000 -p 127.0.0.1:4000:4000 -it <image name>
> cd ../client
> npm ci
> npm run start
```
