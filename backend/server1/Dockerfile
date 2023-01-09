FROM node:16

WORKDIR /server1

# COPY package.json and package-lock.json files
ADD package*.json ./

# generated prisma files
ADD prisma ./prisma/

# COPY tsconfig.json file
ADD tsconfig.json ./

# COPY
ADD . .

RUN npm install
RUN npm install -g nodemon 

RUN npx prisma generate


