FROM node:7.0

RUN useradd --user-group --create-home --shell /bin/false app && \
  npm install -g yarn && \
  npm install -g gulp

ENV HOME=/home/app

COPY package.json $HOME/gulp-react/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/gulp-react/
RUN yarn && yarn cache clean

USER root
COPY . $HOME/gulp-react/
RUN chown -R app:app $HOME/*

USER app
CMD gulp dev
#CMD ["node", "./src/index.js"]