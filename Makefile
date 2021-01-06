.PHONY: all
all: build

.PHONY: build
build:
	yarn install
	yarn build

.PHONY: by_docker
by_docker:
	docker run --rm --privileged tonistiigi/binfmt --install all
	docker buildx build --no-cache\
		-t neuron-dashboard-src \
		--platform=linux/amd64 \
		--output type=tar,dest=build_by_docker.tar .
	tar -xvf build_by_docker.tar --wildcards neuron-dashboard-src/dist \
	&& mv neuron-dashboard-src/dist . \
	&& rm -rf build_by_docker.tar neuron-dashboard-src 

.PHONY: clean
clean:
	@rm -rf dist
