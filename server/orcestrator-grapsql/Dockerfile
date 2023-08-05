FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV APP_SERVICE_URL=http://localhost:4002
ENV USER_SERVICE_URL=http://localhost:4001
ENV PORT=4000
ENV DATABASE_URL=postgresql://postgres:ryKX4DvPTXdgPN6R@db.svibzydvhczyokkgxjbd.supabase.co:5432/postgres
ENV MONGODB_URL=mongodb+srv://fadilmuiz1319:QoB7ORJthbV1hXMI@cluster0.btbe4bb.mongodb.net/

WORKDIR /orcestrator-grapsql

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]