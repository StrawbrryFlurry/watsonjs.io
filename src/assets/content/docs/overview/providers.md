# Providers

Providers are class instances or values that can be injected into a variety of components of the Watson framework. Providers instances are shared across modules and module imports.

## Services

Services are the most common provider type. They can be used to abstract reusable logic into a component that can be used across almost any part of your application.

To create a basic service we start off with a class that is decorated with the `@Injectable` decorator.

```TS
import { Injectable } from '@watsonjs/common';

@Injectable()
export class PingService {
  public pong(): string {
    return 'pong';
  }
}
```

> Currently the decorator can be omitted as it doesn't provide any configuration options to the underlying class. In future releases this might change so we recommend getting into the habit of using it anyways.

With the basics covered, let's build a more sophisticated service that stores users from a command.

```TS
import { Injectable } from '@watsonjs/common';

export interface IUser {
  username: string
}

@Injectable()
export class UserService {
  private readonly users: Set<IUser[]> = new Set();

  public addUser(user: IUser) {
    this.users.add(user);
  }

  public getUser(user: IUser) {
    this.users.get(user);
  }

  public removeUser(user: IUser) {
    if(users.has(user)) {
      user.delete(user);
    }
  }
}
```

## Dependecy injection

Now that we have some basic providers to use across our app we need a way to get access to the provider instance. Watson provides two main ways of handling dependency injection for its components. For both the constructor of the target component is used.

### Type injection

When using type injection the `type` of the parameter in the constructor is being used as a reference on which provider to inject to this parameter in the constructor. You will then be able to use the provider like any other property of the class.

```TS
import { Receiver, Command } from '@watsonjs/common';
import { PingService } from './ping.service';

@Receiver({ prefix: '!' })
export class PingReceiver {
  constructor(private pingService: PingService) {  }

  @Command('ping')
  handlePing() {
    return this.pingService.pong();
  }
}
```

### Token injection

Token injection works very similar to type injection. Here we're using the `@Inject` decorator to tell Watson what provider to inject by referencing it's injection token. For service providers you can either use their calss type `PingService` or it's name `'PingService'` as the injection token. When using custom components you have to specify the token while creating the provider using the `provide` property of a `CustomProvider`.

> Custom injection tokens are full caps and underscore seperated by convention.

```TS
import { Receiver, Command } from '@watsonjs/common';
import { PingService } from './ping.service';

@Receiver({ prefix: '!' })
export class PingReceiver {
  constructor(private @Inject('PingService') pingService: PingService) {  }

  @Command('ping')
  handlePing() {
    return this.pingService.pong();
  }
}
```

## Custom providers

Custom providers are increadibly useful when you have to provide a specific value across your app. You can chose between the following types of custom providers which serve differente purposes. The provider can be used as a provider in a module declaration. You'll then be able to inject it to other components in the module by using `token injection`.

### Factory providers

Factory providers can be used when you first need to complete some action before a value can be provided. This could be the case when you want to share a database connection for say TypeORM. For this to work the db connection has to be created first. Because this is an asynchronous action we have to `await` the creation of the connection first before we are ready to use it. The factory for this kind of provider can therefore return either a `Promise` an `Observable` or an already resolved value.

Let us now create such a provider for a TypeORM database connection:

```TS
import { FactoryProvider } from '@watsonjs/common';
import { createConnection } from 'typeorm';

const connectionFactory = () => {
  return createConnection({
    name: "dogs",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "dogs",
    entities: [__dirname + "/entity/*.ts"],
    synchronize: true,
  });
}

export const ConnectionProvider: FactoryProvider = {
  provide: 'CONNECTION',
  useFactory: connectionFactory,
  inject: []
}
```

Use the `ClassProvider` from the `@watsonjs/common` module to easily create a class provider.

### Class providers

This kind of provider creates a new class instance of the class specified in the provide configuration. You will also be able to inject services or other providers into the constructor of the class by using the `inject` property.

```TS
import { ClassProvider } from '@watsonjs/common';
import { Connection, Entity, Repository } from 'typeorm';

class RepositoryFactory {
  private connection: Connection;

  constructor(connection: Connection) {  }

  public createFactory<T extends Entity>(entity: T): Repository<T> {
    return this.connection.getRepository(entity)
  }
}

export const RepositoryFactoryProvider: ClassProvider = {
  provide: RepositoryFactory,
  class: RepositoryFactory,
  inject: [ 'CONNECTION' ]
}
```

Use the `ClassProvider` from the `@watsonjs/common` module to easily create a class provider.

### Value providers

Value providers can be used to provide a static vlaue via dependency injection.

```TS
import { ValueProvider } from '@watsonjs/common';

const config = {
  /* Static value */
}

export const ConfigurationProvider: ValueProvider = {
  provide: 'CONFIGURATION',
  value: config
}
```

Use the `ValueProvider` from the `@watsonjs/common` module to easily create a value provider.

## Making providers available

To make a provider available to components in a module it has to be registered as such in the module declaration.

```TS
import { Module } from '@watsonjs/common';

import { ConnectionProvider } from './connection.provider';
import { RepositoryFactoryProvider } from './connection.provider';

@Module(
  providers: [ RepositoryFactoryProvider, ConnectionProvider ],
  exports: [ ConnectionProvider ]
)
export class DatabaseModule {  }
```

> To make providers globally available without having to import the host module first you can mark the module as global using the <code>@Global()</code> decorator.

If you need to access a provider from another module import the host module of the provider to get access to its provider instance.

```TS
import { Module } from '@watsonjs/common';

import { DatabaseModule } from '../db/database.module';

@Module(
  imports: [ DatabaseModule ]
)
export class CommonModule {  }
```
