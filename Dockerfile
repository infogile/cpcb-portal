FROM node:alpine
RUN apk update && apk add python make g++

# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER root
# RUN npm --global config set user root
RUN npm install -g pm2
RUN npm install
COPY --chown=node:node . .

CMD ["npm", "start"]
CMD ["pm2-runtime", "dist/index.js"]
EXPOSE 5000
