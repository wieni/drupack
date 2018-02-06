GIT_VERSION:=$(shell git describe --abbrev=5 --dirty --always --tags)
assets:=$(shell find resources -type f)
.PHONY: clean build

build: public/resources
  sed -i.bak s/VERSION/$(GIT_VERSION)/g drupack.libraries.yml
  @rm -f drupack.libraries.yml.bak

public/resources: package.json yarn.lock $(assets)
  $(MAKE) node_modules
  npm run build
  @rm -rf node_modules
  touch public/resources

node_modules: package.json yarn.lock
  yarn --pure-lockfile
  npm rebuild node-sass
  touch node_modules

clean:
  @- rm -rf node_modules
