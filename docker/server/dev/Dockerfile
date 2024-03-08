FROM node:18.12.1

WORKDIR /app

# COPY server/package.json /app/package.json
# COPY server/package-lock.json /app/package-lock.json

RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm


RUN npm ci

COPY . /app


EXPOSE 4000
CMD ["npm", "run", "dev"]
