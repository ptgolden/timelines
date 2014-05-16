NPMBIN=./node_modules/.bin
BROWSERIFY_OPTS=-o dist/bundle.js src/app.js

all: setup bundle

setup:
	npm install

bundle:
	$(NPMBIN)/browserify $(BROWSERIFY_OPTS)

watch:
	$(NPMBIN)/watchify -v $(BROWSERIFY_OPTS) 

serve:
	python3 -m http.server
