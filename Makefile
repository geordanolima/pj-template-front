host = dockerhub.lojaspompeia.com.br
tag = 1.0.0-rc
vuetag = 3.0.0
image = app_proposta
export DCK_HOST=$(host)
export IMAGE_TAG=$(tag)
export IMAGE_NAME=$(image)

build:
	docker run -it --rm -v $(PWD)/frontend/:/frontend $(DCK_HOST)/lins-vue-cli:$(vuetag)
	docker build -f deploy/imagens/Dockerfile-app . -t $(DCK_HOST)/$(IMAGE_NAME):$(IMAGE_TAG) --no-cache
	docker push $(DCK_HOST)/$(IMAGE_NAME):$(IMAGE_TAG)

test:
	docker run -it --rm -v $(PWD)/frontend/:/frontend $(DCK_HOST)/lins-vue-cli:trunk

build--w:
	cd frontend
	npm install
	npm run build
	cd ..
	docker build -f deploy/imagens/Dockerfile-app . -t $(host)/$(image)$(tag) --no-cache
	docker push $(host)/$(image)$(tag)

push:
	docker push $(DCK_HOST)/$(IMAGE_NAME):$(IMAGE_TAG)

app:
	docker build -f deploy/imagens/Dockerfile-app . -t $(DCK_HOST)/$(IMAGE_NAME):$(IMAGE_TAG) --no-cache
	docker push $(DCK_HOST)/$(IMAGE_NAME):$(IMAGE_TAG)

up:
	docker pull $(DCK_HOST)/$(IMAGE_NAME):$(IMAGE_TAG)
	docker stack deploy --compose-file deploy/envs/production.yml $(IMAGE_NAME)

sandbox-up:
	docker stack deploy --compose-file deploy/envs/sandbox.yml $(IMAGE_NAME)-sandbox

down:
	docker stack rm $(IMAGE_NAME)

sandbox-down:
	docker stack rm $(IMAGE_NAME)-sandbox

bash:
	docker run -it --rm -v $(PWD)/frontend/:/frontend $(DCK_HOST)/lins-vue-cli:$(vuetag)
