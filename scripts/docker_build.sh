# rm -rf dist

# yarn build

# cp -r .nuxt dist/.nuxt
# mkdir dist/client
# cp -r client/static dist/client/static

docker build --pull --rm -f "Dockerfile" -t halo-theme-sakura:latest "."
