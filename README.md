# alumni

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Modules installed (npm install)
```
vuex
bootstrap-vue
vue-router
vue
```

## Add Boostrap Steps
```
npm install vue bootstrap bootstrap-vue
vue add bootstrap-vue
```

## Reiniciar o npm do projecto
```
delete da pasta: node_modules
npm install
```

## Deploy
```
Abrir o Git Bash
cd /c/Users/andre/Documents/
rm --f jokerwoman.github.io
git clone https://github.com/JokerWoman/jokerwoman.github.io.git
cd /c/Users/andre/Documents/projeto_alumni/alumni
npm run build
cp -R dist/. /C/Users/andre/Documents/jokerwoman.github.io/
cd /C/Users/andre/Documents/jokerwoman.github.io/
git add .
git commit -m "Commit Message"
git push -u origin master
```
