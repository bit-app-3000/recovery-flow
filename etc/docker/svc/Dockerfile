FROM node:alpine

ENV LANG C.UTF-8
ENV NODE_ENV production
ENV NPM_CONFIG_UPDATE_NOTIFIER false
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR  /svc

COPY --chown=node:node package*.json ./
COPY --chown=node:node packages/ packages/
COPY --chown=node:node services/ services/

RUN npm ci --ignore-scripts --omit=dev

USER node
