FROM node:lts-hydrogen

ENV PORT=4002
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://postgres:TjKnI1EqoN4SDGVY@db.fmsxdofmrehqmhlwpwob.supabase.co:5432/postgres
WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]