FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build || (echo "Build failed" && exit 1)

RUN if [ ! -d ".next" ]; then echo ".next directory not found"; exit 1; fi

EXPOSE 3000

ENV NODE_ENV production

CMD ["npm", "start"]
