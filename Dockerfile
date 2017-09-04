FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install && npm install nodemon -g

# Bundle app source
# COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "run", "start" ]
# CMD ["nodemon", "-L", "/usr/src/app"]
