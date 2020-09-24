FROM node:14 AS node_builder

COPY . /neuron-dashboard-src
WORKDIR /neuron-dashboard-src

RUN yarn install && yarn build
