FROM devilbox/php-fpm-8.1:latest

RUN apt-get update \
&& apt-get install -y apt-utils vim curl sqlite3 mc \
&& pecl install xdebug \
    && docker-php-ext-enable xdebug