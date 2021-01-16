# Receivers

Receivers are the component of your application that will handle all incomming events from the Discord API. They are responsible for executing the event handlers that you register throughout your application.

## Getting started

A basic Receiver could look like this:

```TS
import { Receiver, Command, toReply } from '@watson/common';

@Receiver({
  prefix: '!'
})
export class PingReceiver {

  @Command('ping')
  handlePing() {
    return 'pong!';
  }
}
```

It will call the receiver method `handlePing` whenever a message with the content `!ping` is being received by the client. Receivers are also able to handle both raw client events and slash commands. Refer tho their seperate articles for an in depth overview.

## Receiver configuration

Receivers provide you with a few ways of applying configurations to all its underlying event handlers.

```TS
export interface IReceiverCommandOptions {
  casesensitive?: boolean;
}

export interface IReceiverOptions {
  commandOptions?: IReceiverCommandOptions;
  prefix?: string;
}

/**
 * @param prefix The prefix to be used by the underlying commands
 * @param commandOptions Configurable options for the underlying commands
 */
export function Receiver(): ClassDecorator;
```
