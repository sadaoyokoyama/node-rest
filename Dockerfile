FROM node

RUN apt-get update && \
    apt-get install -y sudo && \
    apt-get install -y nano

RUN useradd -ms /bin/bash sadao

RUN adduser --disabled-password --gecos '' sadao
RUN adduser sadao sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER sadao
