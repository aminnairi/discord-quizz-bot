FROM alpine

RUN addgroup -g ${GID:-1000} -S user
RUN adduser -h /home/user -g "" -s /bin/sh -G user -S -D -u ${UID:-1000} user

USER user

WORKDIR /home/user/app
