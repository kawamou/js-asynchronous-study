FROM node:11.14.0-alpine
RUN apk update && \
    apk upgrade && \
    npm install -g npm && \
    npm install -g typescript