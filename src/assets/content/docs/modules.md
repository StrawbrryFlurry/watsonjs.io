# Modules

Modules are that part of your application that tie everything together. In them you register all components for a feature of your app. To create a module you use the `@Module` decorator or use a custom module which we'll cover later. We recommend that you split your application in different parts (modules) that each cover one feature rather than only using the default `AppModule`. E.g. if you have multiple providers that handle database connectivity or manipulation you shoul abstract them into their seperate module let's call it `DatabaseModule`, which can be imported by other modules if they need access to those providers.

## Components

Modules can be configured with the following four types.

| Name        | Description                                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `providers` | Providers that will be available in the module                                                                    |
| `receivers` | A set of receivers that will be instanciated by the module.                                                       |
| `imports`   | A list of modules whose exported providers should be imported.                                                    |
| `exports`   | A list of Providers that are registered in this module and should be available in modules who import this module. |

## Usage

As mentioned earlier you create a module by decorating a class with the `@Module` decorator:

```TS
import { Module } from '@watson/common';

import { PingReceiver } from './ping.receiver';
import { PingService } from './ping.service';

@Module(
  receivers: [ PingReceiver ],
  providers: [ PingService ]
)
export class PingModule {  }
```

You can now import this module in a root module which could either be another module or the `AppModule`.

> Every module has at some point have to be imported by the AppModule to be registered in the application.

```TS
import { Module } from '@watson/common';

import { PingModule } from './ping.module';

@Module(
  imports: [ PingModule ]
)
export class PingModule {  }
```

## Module re-exporting

When you're working with a lot of different modules you might want to export all providers from an imported module or just all providers of the current module itself. For this you can specify the module as an `export` of the module. This example will export all providers of both `PingModule` and `PongModule`.

```TS
import { Module } from '@watson/common';

import { PingModule } from './ping.module';

@Module(
  imports: [ PingModule ],
  exports: [ PingModule, PongModule ]
)
export class PingModule {  }
```

## Global modules

If you rely on a provider of a module in a lot of modules it might be worth marking the module as global. You can do this using the `@Global` decorator. When a module is marked as a global module all it's exported providers can be accessed by every module.

```TS
import { Module, Global } from '@watson/common';

import { ConnectionProvider } from './connection.provider';

@Global()
@Module(
  providers: [ ConnectionProvider ],
  exports: [ ConnectionProvider ]
)
export class DatabaseModule {  }
```

## Dynamic modules

Dynamic modules allow you to configure a module before it's being added to the application. Any class can be used as a dynamic module as long as it has one static method that returns a an object that is compliant with the `DynamicModule` interface.

```TS
import { Module, DynamicModule, ValueProvider } from '@watson/common';

export class ConfigModule {

  public static forRoot(config: string): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: "VALUE",
          value: config
        } as ValueProvider
      ]
    }
  }
}
```

To add a dynamic module you have to call the static method when adding it as an import.

```TS
import { Module } from '@watson/common';

import { ConfigModule } from './config.module';

@Module(
  imports: [ ConfigModule.forRoot('Hey!') ],
)
export class AppModule {  }
```

> Note that the configuration module can also return a promise that resolves to a dynamic module.
