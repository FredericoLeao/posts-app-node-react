FROM node:20.14

WORKDIR /app

# COPY package*.json .
# 
# RUN npm install

CMD ["npx", "nodemon", "app.js"]
