ALL_TARGETS:=public/resources
GIT_VERSION:=$(shell git describe --abbrev=5 --dirty --always --tags)
assets:=$(shell find resources -type f)
.PHONY: clean build

ifneq ($(APP_ENV), local)
    ALL_TARGETS += build
endif

all: $(ALL_TARGETS)

public/resources: package.json package-lock.json .nvmrc magic.config.js $(assets)
	$(MAKE) node_modules
	npm run build
	@rm -rf node_modules
	touch public/resources

node_modules: package.json package-lock.json .nvmrc
	npm ci --no-optional
	touch node_modules

package-lock.json:
	npm install
	touch package-lock.json

build:
	sed -i.bak s/VERSION/$(GIT_VERSION)/g drupack.libraries.yml
	@rm -f drupack.libraries.yml.bak

clean:
	@- rm -rf node_modules
