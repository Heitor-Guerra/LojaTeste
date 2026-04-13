FROM node:trixie

COPY . /app/

WORKDIR /app

RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200
ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0"]
