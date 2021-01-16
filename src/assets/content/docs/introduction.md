# Introduction

Watson is a Discord bot framework heavily inspired by the architecture of NestJS and Angular. It uses TypeScript to provide an easy to use API to scale along with the growth and complexity of your application.

We use <a href="https://discord.js.org">discord.js</a> as an interface to the Discord API. You will still have access to both the client and it's full functionality whilst working with watson components.

## Installation

To get started we provide you with multiple options to create a new project. The simplest way is using our scaffolding CLI which you can install from npm or yarn.

The cli will automatically create a folder for your project, install all the necessairy packages and create some default files to get you started with Watson. You find additional information in the First Steps page.

```Bash
npm i -g @watson/cli
cd 'my-new-projectdir'
watson new project-name
```

You can also add Watson to an existing project by installing our packages using npm or yarn.

```Bash
npm i @watson/core @watson/common rxjs reflect-meta
```
