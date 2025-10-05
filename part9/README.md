# about project

```
npm run calculateBmi 180 91
npm run calculateExercises -- "[2,1,0,2,4.5,0,3,1,0,4]"
```

# TypeScript

[TypeScript](https://www.typescriptlang.org/) is a programming language designed for large-scale JavaScript development created by Microsoft.

TypeScript is a typed superset of JavaScript, and eventually, it's compiled into plain JavaScript code. The programmer is even able to decide the version of the generated code, as long as it's ECMAScript 3 or newer. TypeScript being a superset of JavaScript means that it includes all the features of JavaScript and its additional features as well. In other words, all existing JavaScript code is valid TypeScript.

TypeScript consists of three separate, but mutually fulfilling parts:

![diagram of typescript components](https://s2.loli.net/2025/10/05/Lbv8P3t1SYeNgFk.png)

The _language_ consists of syntax, keywords and type annotations. The syntax is similar to but not the same as JavaScript syntax. From the three parts of TypeScript, programmers have the most direct contact with the language.

The _compiler_ is responsible for type information erasure (i.e. removing the typing information) and for code transformations. The code transformations enable TypeScript code to be transpiled into executable JavaScript. Everything related to the types is removed at compile-time, so TypeScript isn't genuine statically typed code.

Traditionally, _compiling_ means that code is transformed from a human-readable format to a machine-readable format. In TypeScript, human-readable source code is transformed into another human-readable source code, so the correct term would be _transpiling_. However, compiling has been the most commonly used term in this context, so we will continue to use it.

The compiler also performs a static code analysis. It can emit warnings or errors if it finds a reason to do so, and it can be set to perform additional tasks such as combining the generated code into a single file.

The _language service_ collects type information from the source code. Development tools can use the type information for providing intellisense, type hints and possible refactoring alternatives.

The _@types/_ are maintained by [Definitely typed](https://github.com/DefinitelyTyped/DefinitelyTyped), a community project to maintain types of everything in one place.

Since version 10.0 _ts-node_ has defined _@types/node_ as a [peer dependency](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies). If the version of npm is at least 7.0, the peer dependencies of a project are automatically installed by npm. If you have an older npm, the peer dependency must be installed explicitly:

```
npm install --save-dev @types/node
```

https://typescript-eslint.io/rules/array-type/#array-simple

### More about tsconfig

As mentioned, the [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file contains all your core configurations on how you want TypeScript to work in your project.

You can find explanations for each of the configurations from the TypeScript documentation or from the really handy [tsconfig page](https://www.typescriptlang.org/tsconfig), or from the tsconfig [schema definition](http://json.schemastore.org/tsconfig), which unfortunately is formatted a little worse than the first two options.

auto-reloading development environment for our project

```
npm install --save-dev ts-node-dev
```

```
{
  // ...
  "scripts": {
      // ...

      "dev": "ts-node-dev index.ts",
  },
  // ...
}
```
