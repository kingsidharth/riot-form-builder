# Riot Form Builder

### Dependencies
1. Node & NPM
2. webpack cli


### Installation (for Dev)
1. run `npm install` in project folder
2. run `npm run build` to compile
3. run `npm run watch` to watch


### Usage
Include `dist/riot-form-builder.js` in your project
In HTML or Riot Tag:
`<o-form form={ form_object } config={ form_config }/>`
See `app/o-form.tag.html` for more


### File Structure
- **app/** - Main files (riot tags)
- **config/** - Configuration (dev)
- **demo/** - Run basic server at project folder, open /demo.html
- **dist/** — Include files in there


### Webpack (Dev) Explanation
- pre load riot tag compiler, apply on .tag.html files
- load bable with ES6 -> ES5 compiler, apply on all .js files
- all tag files are compiled to `dist/riot-form-builder.js`
- demo js is compiled to `dist/demo`
