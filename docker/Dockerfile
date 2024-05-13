FROM ubuntu:22.04

ARG WWWGROUP
ARG NODE_VERSION=20
ARG SOURCES

WORKDIR /data/www/front

ENV TZ=Asia/Shanghai

RUN DEBIAN_FRONTEND=noninteractive 
RUN cat /etc/apt/sources.list
RUN echo "export LANG="zh_CN.UTF-8"" >> /etc/profile
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && \
    apt-get upgrade -y

# install some prerequisites
RUN apt-get install -y software-properties-common curl build-essential \
    dos2unix gcc git libmcrypt4 libpcre3-dev memcached make \
    re2c unattended-upgrades whois vim libnotify-bin nano wget \
    debconf-utils

# yarn
RUN curl -sLS https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
RUN apt-get update \
&& apt-get install -y nodejs \
&& npm install -g npm \
&& curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarn.gpg >/dev/null \
&& echo "deb [signed-by=/usr/share/keyrings/yarn.gpg] https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
&& apt-get update \
&& apt-get install -y yarn \
&& apt-get -y autoremove \
&& apt-get clean \
&& apt-get install -y supervisor \
&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf


EXPOSE 80
ENTRYPOINT ["/bin/bash","-c"]
CMD [ "cd /data/www/front  &&  /usr/bin/supervisord" ]