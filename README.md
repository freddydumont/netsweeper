<h1 align="center">
  <br>
  <a href="https://github.com/yandeu/phaser-project-template#readme"><img src="readme/header.png" alt="header" width="600"></a>
  <br>
  Phaser 3 TypeScript Starter Template
  <br>
</h1>

<h4 align="center">
A starter template for <a href="https://phaser.io/" target="_blank" >Phaser 3</a> with <a href="https://www.typescriptlang.org/index.html" target="_blank" >TypeScript</a> and <a href="https://webpack.js.org/" target="_blank" >webpack</a> for building excellent html5-games that work great in the browser and on mobile devices.</h4>

<p align="center">
  <a href="https://david-dm.org/yandeu/phaser-project-template" title="dependencies status"><img src="https://david-dm.org/yandeu/phaser-project-template/status.svg"/></a>
  <a href="https://david-dm.org/yandeu/phaser-project-template?type=dev" title="devDependencies status"><img src="https://david-dm.org/yandeu/phaser-project-template/dev-status.svg"/></a>
  <a href="https://opensource.org/licenses/MIT" title="License: MIT" ><img src="https://img.shields.io/badge/License-MIT-greenbright.svg"></a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#preview">Preview</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#progressive-web-app-pwa">PWA</a> •
  <a href="#native-app">Native App</a> •
  <a href="#custom-configurations">Custom Configurations</a> •
  <a href="#es6">ES6</a> •
  <a href="#useful-links">Useful Links</a> •
  <a href="#examples">Examples</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

<blockquote align="center">
 Want to use ES6 instead of TypeScript? Check out the <a href="https://github.com/yandeu/phaser-project-template-es6#readme" >phaser-project-template-es6</a>
</blockquote>

---

## Key Features

- **ESNext** features ready (async/await, Rest/Spread operators)
- Code Splitting
- Obfuscation
- Development Server with SourceMap and Live-Reload
- PWA ready with offline support and "Add to Home screen" install prompt
- Easy to build Native App using Capacitor
- Includes Phaser 3 TypeScript typings
- For development and production builds
- Adds a webpack ContentHash to the JavaScript files (in production)

## Preview

This is what you get after installing this template. A simple and clean starter template written in TypeScript. [Try it!](https://s3.eu-central-1.amazonaws.com/phaser3-typescript/starter-template/index.html)

<a href="https://s3.eu-central-1.amazonaws.com/phaser3-typescript/starter-template/index.html">
<img src="readme/screenshot.png" width="640" style='border: 0.25em solid #e1e4e8;border-radius: 20px;'/>
</a>

## How To Use

To clone and run this template, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone --depth 1 https://github.com/yandeu/phaser-project-template.git phaser3-game

# Go into the repository
$ cd phaser3-game

# Install dependencies
$ npm install

# Start the local development server (on port 8080)
$ npm start

# Ready for production?
# Build the production ready code to the /dist folder
$ npm run build
```

Change the **gameName** in /webpack/webpack.common.js.

All your game code lies inside the **/src/scripts** folder. All assets need to be inside the **/src/assets** folder in order to get copied to /dist while creating the production build. Do not change the name of the index.html and game.ts files.

## Progressive Web App (PWA)

![PWA](readme/pwa.png)

This template is **100% PWA ready**.

The ServiceWorker is **disabled by default**. Uncomment the line below inside /src/index.html to enable it.

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
    })
  }
</script>
```

You can easily personalize its settings by following these steps:

- Replace both icons in /pwa/icons with your own.
  - One is **512x512** the other **192x192**
- Add your own **favicon.ico** to /src
- Adjust these parameters in the **manifest.json** file in /pwa
  - **short_name**: Max. 12 characters
  - **name**: The full game name
  - **orientation**: "landscape" or "portrait"
  - **background_color**: color of the splash screen
  - **theme_color**: color of the navbar - has to match the theme-color in the index.html file
- You can leave the **sw.js** (serviceWorker) in /pwa how it is.
- Change the **gameName** in /webpack/webpack.common.js

Read more about PWA on [developers.google.com](https://developers.google.com/web/progressive-web-apps/)

## Native App

The simplest way to build a Native App is using [Capacitor](https://capacitor.ionicframework.com/) and following its [Documentation](https://capacitor.ionicframework.com/docs/).
The only thing you need to change after installing Capacitor is the **webDir** inside the **capacitor.config.json** file. Set it to **dist** like so:

```json
{
  "appId": "com.example.app",
  "appName": "YOUR_APP_NAME",
  "bundledWebRuntime": false,
  "webDir": "dist"
}
```

## Custom Configurations

### TypeScript Compiler

Change the TypeScript compiler's settings in the tsconfig.json file.

If you are new to TypeScript, you maybe want to set **"noImplicitAny"** to **false**.

You'll find more information about the TypeScript compiler [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

### Typings

The Phaser typings are in typings/**phaser.d.ts**. You can put your custom type definitions inside typings/**custom.d.ts**.

### Webpack

All webpack configs are in the **webpack** folder.

#### Obfuscation

We are using the [webpack-obfuscator](https://github.com/javascript-obfuscator/webpack-obfuscator). Change its settings in webpack/webpack.prod.js if needed. All available options are listed [here](https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options).

## ES6

Want to use ES6 instead of TypeScript? Switch to the [phaser-project-template-es6](https://github.com/yandeu/phaser-project-template-es6#readme)

## Useful Links

- [Phaser Website](https://phaser.io/)
- [Phaser 3 Forum](https://phaser.discourse.group/)
- [Phaser 3 API Docs](https://photonstorm.github.io/phaser3-docs/)
- [Official Phaser 3 Examples](http://labs.phaser.io/)
- [Notes of Phaser 3](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/index.html)

## Examples

### Game Examples Built with this Starter Template

#### Platformer Example [[Play this game](https://s3.eu-central-1.amazonaws.com/phaser3-typescript/platformer-example/index.html) - [Visit its Repository](https://github.com/yandeu/phaser3-typescript-platformer-example#readme)]

[![phaser3-typescript-platformer](https://raw.githubusercontent.com/yandeu/phaser3-typescript-platformer-example/master/screenshots/nexus6-640x360.png)](https://github.com/yandeu/phaser3-typescript-platformer-example#readme)

#### Phaser 3 + Matter.js: Car Example [[Play this game](https://s3.eu-central-1.amazonaws.com/phaser3-typescript/car-on-curved-tarrain/index.html) - [Visit its Repository](https://github.com/yandeu/phaser3-matter-car-on-curved-terrain#readme)]

[![phaser3-matter-car-example](https://raw.githubusercontent.com/yandeu/phaser3-matter-car-on-curved-terrain/master/readme/myimage.gif)](https://github.com/yandeu/phaser3-matter-car-on-curved-terrain#readme)

## Credits

A huge thank you to Rich [@photonstorm](https://github.com/photonstorm) for creating Phaser

## License

The MIT License (MIT) 2019 - [Yannick Deubel](https://github.com/yandeu). Please have a look at the [LICENSE](LICENSE) for more details.
