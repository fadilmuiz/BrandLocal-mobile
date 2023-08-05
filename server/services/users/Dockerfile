FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV DATABASE_URL=mongodb+srv://fadilmuiz1319:QoB7ORJthbV1hXMI@cluster0.btbe4bb.mongodb.net

WORKDIR /users

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]