# down: 
# 	docker-compose down

# up:
# 	docker-compose up -d

# up-prod:
# 	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

APP_NAME = boarder
APP_NAME : $(APP_NAME)

.PHONY: build

build-dev:
	docker build -t ${APP_NAME}\--target development\-f docker/Dockerfile .

build:
	docker build -t ${APP_NAME}\--target production\ -f docker/Dockerfile .

clean:
	docker rmi -f ${APP_NAME}

run:
	docker run -p 3000:3000 ${APP_NAME}

all: build