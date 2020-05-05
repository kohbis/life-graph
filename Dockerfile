FROM node:14.1.0-alpine

ENV APP_HOME /app
ENV PATH ${APP_HOME}/node_modules/.bin:$PATH
ENV TZ Asia/Tokyo

ENV HOST 0.0.0.0
ENV PORT 3000

WORKDIR ${APP_HOME}
ADD . ${APP_HOME}

RUN apk update \
    && apk upgrade

RUN apk add --update --no-cache \
      vim curl \
    && yarn install \
    && rm -rf /var/cache/apk/*

EXPOSE ${PORT}

CMD [ "yarn", "serve" ]
