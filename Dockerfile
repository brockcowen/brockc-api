FROM node:9
MAINTAINER Brock Owen <brock@salute.solutions>

RUN mkdir -p /usr/api
COPY . /usr/api
WORKDIR /usr/api
RUN npm install --production

ENV PORT 3000
EXPOSE  $PORT

CMD ["node", "start"]