

# More about hooks
React offers 15 different built-in hooks, of which the most popular ones are the useState and useEffect hooks that we have already been using extensively.

React offers the option to create custom hooks. According to React, the primary purpose of custom hooks is to facilitate the reuse of the logic used in components.

Building your own Hooks lets you extract component logic into reusable functions.

Custom hooks are regular JavaScript functions that can use any other hooks, as long as they adhere to the rules of hooks. Additionally, the name of custom hooks must start with the word use.

The internet is starting to fill up with more and more helpful material related to hooks. The following sources are worth checking out:

- [Awesome React Hooks Resources](https://github.com/rehooks/awesome-react-hooks)
- [Easy to understand React Hook recipes by Gabe Ragland](https://usehooks.com/)
- [Why Do React Hooks Rely on Call Order?](https://overreacted.io/why-do-hooks-rely-on-call-order/)

# webpack

Both Vite and Create React App use *bundlers* to do the actual work. We will now familiarize ourselves with the bundler called [Webpack](https://webpack.js.org/) used by Create React App. Webpack was by far the most popular bundler for years. Recently, however, there have been several new generation bundlers such as [esbuild](https://esbuild.github.io/) used by Vite, which are significantly faster and easier to use than Webpack. However, e.g. esbuild still lacks some useful features (such as hot reload of the code in the browser), so next we will get to know the old ruler of bundlers, Webpack.

## Bundling

We have implemented our applications by dividing our code into separate modules that have been *imported* to places that require them. Even though ES6 modules are defined in the ECMAScript standard, the older browsers do not know how to handle code that is divided into modules.

For this reason, code that is divided into modules must be *bundled* for browsers, meaning that all of the source code files are transformed into a single file that contains all of the application code. 

> The old way of dividing the application's code into multiple files was based on the fact that the *index.html* file loaded all of the separate JavaScript files of the application with the help of script tags. This resulted in decreased performance, since the loading of each separate file results in some overhead. For this reason, these days the preferred method is to bundle the code into a single file.

## Loaders

The error message from webpack states that we may need an appropriate *loader* to bundle the *App.js* file correctly. By default, webpack only knows how to deal with plain JavaScript. Although we may have become unaware of it, we are using [JSX](https://facebook.github.io/jsx/) for rendering our views in React. To illustrate this, the following code is not regular JavaScript:

We can use [loaders](https://webpack.js.org/concepts/loaders/) to inform webpack of the files that need to be processed before they are bundled.

```js
const path = require('path')

const config = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },

    module: {
      rules: [
        {
          // The test property specifies that the loader is for files that have names ending with .js.
          test: /\.js$/,
          // loader property specifies that the processing for those files will be done with babel-loader.
          loader: 'babel-loader',
          // The options property is used for specifying parameters for the loader, which configure its functionality.
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    },
  }
}

module.exports = config
```

install the loader and its required packages ==as a *development dependency*:==

## Transpilers

The process of transforming code from one form of JavaScript to another is called [transpiling](https://en.wiktionary.org/wiki/transpile).

The general definition of the term is to compile source code by transforming it from one language to another.

By using the configuration from the previous section, we are *transpiling* the code containing JSX into regular JavaScript with the help of [babel](https://babeljs.io/)

use babel with loader transpailing the jsx to regular js for compatible with the ES5 standard

The transpilation process that is executed by Babel is defined with [plugins](https://babeljs.io/docs/plugins/). In practice, most developers use ready-made [presets](https://babeljs.io/docs/plugins/) that are groups of pre-configured plugins.

```js
{
  test: /\.js$/,
  loader: 'babel-loader',
  options: {

    presets: ['@babel/preset-react']
  }
}
```

## Webpack-dev-server

The current configuration makes it possible to develop our application but the workflow is awful (to the point where it resembles the development workflow with Java). Every time we make a change to the code, we have to bundle it and refresh the browser to test it.

for hot render and hot bundle.

```json
// npm install --save-dev webpack-dev-server

{
  // ...
  "scripts": {
    "build": "webpack --mode=development",

    "start": "webpack serve --mode=development"
  },
  // ...
}

// webpack.config.js
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },

  devServer: {
    static: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
  },
  // ...
};
```

The process for updating the code is fast. When we use the dev-server, the code is not bundled the usual way into the *main.js* file. The result of the bundling exists only in memory.

## Source maps

we want to see our actual source code in the error message.

Luckily, fixing this error message is quite easy. We will ask webpack to generate a so-called [source map](https://webpack.js.org/configuration/devtool/) for the bundle, which makes it possible to *map errors* that occur during the execution of the bundle to the corresponding part in the original source code.

The source map can be generated by adding a new *devtool* property to the configuration object with the value 'source-map':

```js
const config = {
  entry: './src/index.js',
  output: {
    // ...
  },
  devServer: {
    // ...
  },

  devtool: 'source-map',
  // ..
};
```

## Minifying the code

The large file size is because the bundle also contains the source code for the entire React library. The size of the bundled code matters since the browser has to load the code when the application is first used. 

The optimization process for JavaScript files is called *minification*. One of the leading tools intended for this purpose is [UglifyJS](https://github.com/mishoo/UglifyJS/).

```json
{
  "name": "webpack-part7",
  "version": "0.0.1",
  "description": "practicing webpack",
  "scripts": {
	// It is enough to modify the npm script in the package.json file to specify that webpack will execute the bundling of the code in production mode
    "build": "webpack --mode=production",
    "start": "webpack serve --mode=development"
  },
  "license": "MIT",
  "dependencies": {
    // ...
  },
  "devDependencies": {
    // ...
  }
}
```

## Development and production configuration

The address of the backend server is currently hardcoded in the application code. How can we change the address in a controlled fashion to point to the production backend server when the code is bundled for production?

Webpack's configuration function has two parameters, *env* and *argv*. We can use the latter to find out the *mode* defined in the npm script:

```js
const path = require('path')

const webpack = require('webpack')

const config = (env, argv) => {
  console.log('argv', argv.mode)


  const backend_url = argv.mode === 'production'
    ? 'https://notes2023.fly.dev/api/notes'
    : 'http://localhost:3001/notes'

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    devtool: 'source-map',
    module: {
      // ...
    },

    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}

module.exports = config
```

We can also use webpack's [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) for defining *global default constants* that can be used in the bundled code. Let's define a new global constant *BACKEND_URL* that gets a different value depending on the environment that the code is being bundled for:

```js
const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

  const notes = useNotes(BACKEND_URL)

  // ...
  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick} >press</button>

      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
}
```

If the configuration for development and production differs a lot, it may be a good idea to [separate the configuration](https://webpack.js.org/guides/production/) of the two into their own files.

We can inspect the bundled production version of the application locally by executing the following command in the *build* directory

```
npx static-server
```

## Polyfill

There are many other things in the standard that IE does not support.

If we want the application to be IE-compatible, we need to add a [polyfill](https://remysharp.com/2010/10/08/what-is-a-polyfill), which is code that adds the missing functionality to older browsers.

Polyfills can be added with the help of [webpack and Babel](https://babeljs.io/docs/usage/polyfill/) or by installing one of many existing polyfill libraries.

```js
import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}
```

One exhaustive list of existing polyfills can be found [here](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills).

The browser compatibility of different APIs can be checked by visiting [https://caniuse.com](https://caniuse.com/) or [Mozilla's website](https://developer.mozilla.org/en-US/).

# Organization of code in React application

There is no one correct way to organize a project. The article [The 100% correct way to structure a React app (or why there’s no such thing)](https://medium.com/hackernoon/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed) provides some perspective on the issue.

## Changes on the server

If there are changes in the state on the server, e.g. when new blogs are added by other users to the bloglist service, the React frontend we implemented during this course will not notice these changes until the page reloads. 

One way is to execute [polling](https://en.wikipedia.org/wiki/Polling_(computer_science)) on the frontend, meaning repeated requests to the backend API e.g. using the [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) command.

A more sophisticated way is to use [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) which allow for establishing a two-way communication channel between the browser and the server. In this case, the browser does not need to poll the backend, and instead only has to define callback functions for situations when the server sends data about updating state using a WebSocket.

WebSockets is an API provided by the browser, which is not yet fully supported on all browsers:

Instead of directly using the WebSocket API, it is advisable to use the [Socket.io](https://socket.io/) library, which provides various *fallback* options in case the browser does not have full support for WebSockets.

In [part 8](https://fullstackopen.com/en/part8), our topic is GraphQL, which provides a nice mechanism for notifying clients when there are changes in the backend data.

# React/node-application security

So far during the course, we have not touched on information security much. We do not have much time for this now either, but fortunately, University of Helsinki has a MOOC course [Securing Software](https://cybersecuritybase.mooc.fi/module-2.1) for this important topic.


# React/node-application security

So far during the course, we have not touched on information security much. We do not have much time for this now either, but fortunately, University of Helsinki has a MOOC course [Securing Software](https://cybersecuritybase.mooc.fi/module-2.1) for this important topic.

# current trend

## Server-side rendering, isomorphic applications and universal code

One motivation for server-side rendering is Search Engine Optimization (SEO). Search engines have traditionally been very bad at recognizing JavaScript-rendered content. However, the tide might be turning, e.g. take a look at [this](https://www.javascriptstuff.com/react-seo/) and [this](https://medium.freecodecamp.org/seo-vs-react-is-it-neccessary-to-render-react-pages-in-the-backend-74ce5015c0c9).

Of course, server-side rendering is not anything specific to React or even JavaScript. Using the same programming language throughout the stack in theory simplifies the execution of the concept because the same code can be run on both the front- and backend.

Along with server-side rendering, there has been talk of so-called *isomorphic applications* and *universal code*, although there has been some debate about their definitions. According to some [definitions](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb), an isomorphic web application performs rendering on both frontend and backend. On the other hand, universal code is code that can be executed in most environments, meaning both frontend and backend.

React and Node provide a desirable option for implementing an isomorphic application as universal code.

Writing universal code directly using React is currently still pretty cumbersome. Lately, a library called [Next.js](https://github.com/vercel/next.js), which is implemented on top of React, has garnered much attention and is a good option for making universal applications.

## Microservice architecture

 In our applications, we had a *monolithic* backend, meaning one application making up a whole and running on a single server, serving only a few API endpoints.

As the application grows, the monolithic backend approach starts turning problematic both in terms of performance and maintainability.

A [microservice architecture](https://martinfowler.com/articles/microservices.html) (microservices) is a way of composing the backend of an application from many separate, independent services, which communicate with each other over the network. An individual microservice's purpose is to take care of a particular logical functional whole. In a pure microservice architecture, the services do not use a shared database.

For example, the bloglist application could consist of two services: one handling the user and another taking care of the blogs. The responsibility of the user service would be user registration and user authentication, while the blog service would take care of operations related to the blogs.

The image below visualizes the difference between the structure of an application based on a microservice architecture and one based on a more traditional monolithic structure:

![](https://s2.loli.net/2025/09/17/nqezYQN72FpJ3tP.png)

The role of the frontend (enclosed by a square in the picture) does not differ much between the two models. There is often a so-called [API gateway](http://microservices.io/patterns/apigateway) between the microservices and the frontend, which provides an illusion of a more traditional "everything on the same server" API. [Netflix](https://medium.com/netflix-techblog/optimizing-the-netflix-api-5c9ac715cf19), among others, uses this type of approach.

Microservice architectures emerged and evolved for the needs of large internet-scale applications. The trend was set by Amazon far before the appearance of the term microservice. The critical starting point was an email sent to all employees in 2002 by Amazon CEO Jeff Bezos:

## Serverless


After the release of Amazon's [lambda](https://aws.amazon.com/lambda/) service at the end of 2014, a new trend started to emerge in web application development: [serverless](https://serverless.com/).

The main thing about lambda, and nowadays also Google's [Cloud functions](https://cloud.google.com/functions/) as well as [similar functionality in Azure](https://azure.microsoft.com/en-us/services/functions/), is that it enables *the execution of individual functions* in the cloud. Before, the smallest executable unit in the cloud was a single *process*, e.g. a runtime environment running a Node backend.

E.g. Using Amazon's [API gateway](https://aws.amazon.com/api-gateway/) it is possible to make serverless applications where the requests to the defined HTTP API get responses directly from cloud functions. Usually, the functions already operate using stored data in the databases of the cloud service.

Serverless is not about there not being a server in applications, but about how the server is defined. Software developers can shift their programming efforts to a higher level of abstraction as there is no longer a need to programmatically define the routing of HTTP requests, database relations, etc., since the cloud infrastructure provides all of this. Cloud functions also lend themselves to creating a well-scaling system, e.g. Amazon's Lambda can execute a massive amount of cloud functions per second. All of this happens automatically through the infrastructure and there is no need to initiate new servers, etc.

# Useful libraries and interesting links

If your application has to handle complicated data, [lodash](https://www.npmjs.com/package/lodash), which we recommended in [part 4](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#exercises-4-3-4-7), is a good library to use. If you prefer the functional programming style, you might consider using [ramda](https://ramdajs.com/).

If you are handling times and dates, [date-fns](https://github.com/date-fns/date-fns) offers good tools for that.

If you have complex forms in your apps, have a look at whether [React Hook Form](https://react-hook-form.com/) would be a good fit.

If your application displays graphs, there are multiple options to choose from. Both [recharts](https://recharts.org/en-US/) and [highcharts](https://github.com/highcharts/highcharts-react) are well-recommended.

The [Immer](https://github.com/mweststrate/immer) provides immutable implementations of some data structures. The library could be of use when using Redux, since as we [remember](https://fullstackopen.com/en/part6/flux_architecture_and_redux#pure-functions-immutable) from part 6, reducers must be pure functions, meaning they must not modify the store's state but instead have to replace it with a new one when a change occurs.

[Redux-saga](https://redux-saga.js.org/) provides an alternative way to make asynchronous actions for [Redux Thunk](https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application#asynchronous-actions-and-redux-thunk) familiar from part 6. Some embrace the hype and like it. I don't.

For single-page applications, the gathering of analytics data on the interaction between the users and the page is [more challenging](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?implementation=browser-history) than for traditional web applications where the entire page is loaded. The [React Google Analytics 4](https://github.com/codler/react-ga4) library offers a solution.

You can take advantage of your React know-how when developing mobile applications using Facebook's extremely popular [React Native](https://facebook.github.io/react-native/) library, which is the topic of [part 10](https://fullstackopen.com/en/part10) of the course.

When it comes to the tools used for the management and bundling of JavaScript projects, the community has been very fickle. Best practices have changed rapidly (the years are approximations, nobody remembers that far back in the past):

- 2011 [Bower](https://www.npmjs.com/package/bower)
- 2012 [Grunt](https://www.npmjs.com/package/grunt)
- 2013-14 [Gulp](https://www.npmjs.com/package/gulp)
- 2012-14 [Browserify](https://www.npmjs.com/package/browserify)
- 2015-2023 [Webpack](https://www.npmjs.com/package/webpack)
- 2023- [esbuild](https://esbuild.github.io/)

Hipsters seemed to have lost their interest in tool development after webpack started to dominate the markets. A few years ago, [Parcel](https://parceljs.org/) started to make the rounds marketing itself as simple (which Webpack is not) and faster than Webpack. However, after a promising start, Parcel has not gathered any steam. But recently, [esbuild](https://esbuild.github.io/) has been on a high rise and is already replacing Webpack.

The site https://reactpatterns.com/ provides a concise list of best practices for React, some of which are already familiar from this course. Another similar list is [react bits](https://vasanthk.gitbooks.io/react-bits/).

[Reactiflux](https://www.reactiflux.com/) is a big chat community of React developers on Discord. It could be one possible place to get support after the course has concluded. For example, numerous libraries have their own channels.
