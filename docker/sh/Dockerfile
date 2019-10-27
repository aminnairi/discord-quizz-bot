FROM alpine

RUN addgroup -g $GID -S user
RUN adduser -h /home/user -g "" -s /bin/sh -G user -S -D -u $UID user

USER user

WORKDIR /home/user/app
