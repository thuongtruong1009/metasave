APP_NAME = metasave
APP_NAME : $(APP_NAME)

.PHONY: build

build-dev:
	docker build -t ${APP_NAME}\--target development\-f docker/Dockerfile .

build-prod:
	docker build -t ${APP_NAME}\--target production\ -f docker/Dockerfile .

clean:
	docker rmi -f ${APP_NAME}

down: 
	docker-compose down

up:
	docker-compose up

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

all: build