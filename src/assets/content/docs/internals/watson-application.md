# Watson Application

Let's take a closer look at what the `WatsonApplication` class is and what it can be used for. Starting off with how you can create an instance of it. To do so we use the `WatsonFactory` class which has a static method `create` for exactly that purpose. The reason we're taking this extra step is that TypeScript or JavaScript for that matter does not support asynchronous constructors. In addition, the factory creates some necessairy components that it initializes the application class with.

## Module bootstrapping

During the module bootstrapping process the `WatsonFactory` will resolve all modules and their imports from either the metadata of the `@Module` decorator or the `imports` property of custom modules. This process takes part in the `initialize` method of the class. After this process is completed Watson will resolve and create instances of all module components like receivers and providers. These instances are stored in the `WatsonContainer` and linked to their respective module. If you wish to have access to either the module or the whole container instance you can use their respective injection token which is by default defined for each module.

### Module specific providers

| Name                   | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `@inject("MODULE")`    | Injects the current module in the constructor parameter        |
| `@inject("CONTAINER")` | Injects the application container in the constructor parameter |
| `@inject("ADAPTER")`   | Injects the DiscordJs adapter in the constructor parameter     |

The code example below will show how you can access module specific data using one of these injection tokens. In the example we're getting all injectables from the module. The `injectables` property is a map. Therefore we need a library like `iterare` to loop over the map entries using common array methods. We are then returning the instance of the injectable `InstanceWrapper` which holds a bunch of metadata about the injectable as well as it's instance.

```TS
import { Inject, Injectable } from '@watsonjs/common';
import { Module } from '@watsonjs/core';
import iterate from 'iterare';

@Injectable()
export class ModuleService {
  constructor(@Inject("MODULE") private module: Module) {}

  public getModuleInjectables() {
    return iterate(this.module.injectables).map(
      ([type, wrapper]) => wrapper.instance
    );
  }
}
```

## Configuration

After the module bootstrapping is completet the factory will return an instance of the `WatsonApplication` class. This instance will serve as your main application and holds all its configuration. You are then able to apply additional configuration before the app is started.

### Configuration methods

| Name                                                               | Description                                                                                                                |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `getProviderInstance<T>(token: Type<T>, string): T`                | Returns a provider instance                                                                                                |
| `addGlobalPrefix(prefix: string): void`                            | Sets a global prefix for all commands. It it will only be applied if none is specified for either a receiver or a command. |
| `addGlobalExceptionsHandler(handler: EventExceptionHandler): void` | Adds a global exceptions handler that will be added to every event handler.                                                |
| `setAcknowledgeReaction(reaction: string, Snowflake): void`        | Reacts with this emote to any command message that is valid                                                                |
| `setActivity(options: ActivityOptions): void `                     | Sets the user activity of the bot                                                                                          |
| `setClient(client: Client): void `                                 | Sets an existing client for the discord adapter                                                                            |
| `setAuthToken(token: string): void `                               | Set the auth token for the discord application                                                                             |

In the example code below we used some common configuration settings as well as showcasing how you can access providers registered in the application by using the `getProviderInstance` on the application instance.

```TS
import { ConfigService } from '@watsonjs/common';
import { WatsonFactory } from '@watsonjs/core';

import { ApplicationModule } from './app.module';

const bootstrap = async () => {
  const app = await WatsonFactory.create(ApplicationModule);

  // Gets the ConfigService provider registered in the app module
  const configService = app.getProviderInstance(ConfigService);
  // Get the token resolved by dotenv
  const token = configService.get("DISCORD_TOKEN");

  // Sets the auth token used by the client
  app.setAuthToken(token);

  // Adds a global prefix
  app.addGlobalPrefix("!");

  // Sets the bot user activity
  app.setActivity({
    name: "Watson testing bot",
    type: "PLAYING",
  });

  app.start().then((res) => console.log("started"));
};

bootstrap();
```

## Applicaiton bootstrapping

With your app being configured now you can use it's `start` method to start your application. During the application bootstrapping / startup, Watson is going to resolve all event handlers for the registered receivers using the `RouteExplorer`. These handlers e.g methods decorated with either `@Commnad`, `@Event` or `@SlashCommand` are then mapped to a internal route. For each a seperate route type exists which derives from the abstract `EventRoute` class: `ConcreteEventRoute`, `CommandRoute` and `SlashRoute`. These routes handle the process of matching client events with thier handler. If they do match the event data is parsed by the route and then used with the handler to execute it. These event routes will then be used by the `RouteHandlerFactory` to create the handler function which will be executed when an event is received. The handler function also includes all guards, pipes and filters for the handler.

> Note that this section is solely a deep dive into the inner workings of Watson and not necessarily required to use any feature of this framework.

Each resulting handler will be added to an `EventProxy` with the exception handlers configured for the route. EventProxies handle client events and call their handler functions with the events received. During the bootstrapping process Watson will create one `EventProxy` for every event listener present in the app. All handlers are then added to the proxy which is responsible for thier event.

All this takes part in the `init` method of the application which is called when the app is started. After all routes are resolved Watson will bind the created event proxies to the client adapter which will register an event listener on the DiscordJs client.
