docker build -t dockerizing:dev .
docker run -it -p 3000:3000 -v /app/node_modules -v "$(pwd)":/app weather-app
