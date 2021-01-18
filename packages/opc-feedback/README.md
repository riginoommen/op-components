# opc-feedback Component 👋

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
![Build Status](https://travis-ci.org/dwyl/esta.svg?branch=master)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/1-Platform/op-components/graphs/commit-activity)

Feedback Component is used to collect feedback from end user.

## Prerequisites
#### Development Environment
* NodeJS >= 8
* IDE (VSCode/Atom)
* Browser (Mozilla Firefox/Google Chrome)

## Install

```sh
npm install --save @one-platform/opc-feedback 
```

## Usage
### For VanillaJS
- Import component
```js
import '@one-platform/opc-feedback/dist/opc-feedback';
```
#### For Angular
- In your app.module include the `CUSTOM_ELEMENTS_SCHEMA` and import the component
```js
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@one-platform/opc-feedback/dist/opc-feedback';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
- Add component in any component html template

#### For React
- Import the component in App.js
```js
import '@one-platform/opc-feedback/dist/opc-feedback';
```

#### Inject the component to the index of your app

```html
<opc-feedback>
</opc-feedback>
```

### Event Handling
```opc-feedback``` emits the data on submit operation. You can use the data for sending it to backend.

```js
document.querySelector('opc-feedback').addEventListener('opc-feedback:emit', (data) => console.log(data.detail.data) );
```

### Development server

- Run development server

```sh
npm run dev opc-feedback
```

### Build

```sh
npm run build opc-feedback
```

## Run tests

```sh
npm run test
```

## 🤝 Contributors

👤 **Rigin Oommen**

👤 **Sumeet Ingole**
