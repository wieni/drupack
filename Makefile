ALL_TARGETS:=public/resources
GIT_VERSION:=$(shell git describe --abbrev=5 --dirty --always --tags)
assets:=$(shell find resources -type f)
.PHONY: clean build

ifneq ($(APP_ENV), local)
    ALL_TARGETS += build
endif

all: $(ALL_TARGETS)

public/resources: package.json yarn.lock $(assets)
	$(MAKE) node_modules
	npm run build
	@rm -rf node_modules
	touch public/resources

node_modules: package.json yarn.lock
	yarn --pure-lockfile
	npm rebuild node-sass
	touch node_modules

build:
	sed -i.bak s/VERSION/$(GIT_VERSION)/g drupack.libraries.yml
	@rm -f drupack.libraries.yml.bak

clean:
	@- rm -rf node_modules
