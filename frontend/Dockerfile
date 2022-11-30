FROM node:17

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --legacy-peer-deps

# copy app files
COPY . .

# RUN npm 
EXPOSE 3000
CMD ["npm", "start"]