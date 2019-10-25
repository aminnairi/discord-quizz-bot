FROM alpine

RUN addgroup -g 1000 -S user
RUN adduser -h /home/user -g "" -s /bin/sh -G user -S -D -u 1000 user

USER user

WORKDIR /home/user/app
