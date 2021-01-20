# First steps

Hey there, we're excited to see you've chosen Watson to build your Discord bot! The next couple of articles will cover all the basics you need to understand while working with Watson. If you have already worked with either Angular or NestJS most of these concepts should feel very familiar to you.

## Language

Watson purely relies on TypeScript and a lot of its features like experimental decorator support to work. Be sure go get comfortable with working with TypeScript before starting with Watson. You don't need to be an expert but a basic understanding of TypeScript will help greatly ;).

## Setup

Let's set up a new project using the Watson CLI. You can install it using either npm or yarn.

```BASH
npm i @watsonjs/cli -g
watson new `project-name`
```

The newly generated project structure will look like this:

```
src
 |- app.receiver.ts // A basic receiver with a `ping` command
 |- app.service.ts  // A basic service for the `ping` command
 |- app.module.ts   // The root module of the application
 |- main.ts         // Application entry point that will start the application
```

The main.ts includes an async function that will bootstrap our application:

```TS
import { WatsonFactory } from '@watsonjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await WatsonFactory.create(AppModule, {
    discordAuthToken: '',
  });

  app.start()
    .then((res) => console.log("Heya, Watson!"));
};

bootstrap();
```

## Running the application

Having completet the initial setup you are able to start your basic Discord bot by running the following command:

```
watson start [--watch]
```
