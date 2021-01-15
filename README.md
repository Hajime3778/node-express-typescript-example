# node-typescript-clean-architecture

API development with Node.js+Typescript
Example of clean architecture

## How to execute

1. Install the package

```bash
npm install
```

2. mysql, phpMyadmin images build 

```bash
docker-compose build
```

3. mysql, phpMyadmin container startup

```bash
docker-compose up -d
```

4. Launching the application
```bash
npm run dev
```

5. Launching confirmation
Make a request to the following, and if JSON is returned, OK.    
http://localhost:4000/api/users

## How to exit

1. Exit application

In a terminal, 'ctrl + C'

2. Stop and delete containers

```bash
docker-compose down --volumes
```
