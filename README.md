# Grocy - Tablet

Tablet interface for grocy, with focus on images and quick add/consumption of products

<p align="center">
  <img src="https://github.com/diesphink/grocy-tablet/blob/main/image.png?raw=true" alt="Grocy Tablet screenshot"/>
</p>

# How to install

Grocy tablet is just a front-end, using an API key to interact with grocy, so you don't need to install it inside grocy.

If you are running grocy via docker, you can simply add another mount point for the grocy-tablet, redirecting to a public www folder with grocy-tablet as a name, like so:

### docker-compose

```yaml
---
version: "2.1"
services:
  grocy:
    image: lscr.io/linuxserver/grocy:latest
    container_name: grocy
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
    volumes:
      - /volume1/docker/grocy:/config
      - /volume1/docker/grocy-tablet:/app/www/public/grocy-tablet
    ports:
      - 9283:80
    restart: unless-stopped
```

This works because the nginx is configured for a `root` of `/app/www/public`.

# Use the online instance

You may also want to use the version hosted on github pages, at https://diesphink.github.io/grocy-tablet/, but keep in mind that on this case it will only work if your grocy server is accessible via https.