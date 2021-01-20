# Receivers

Receivers are the component of your application that will handle all incomming events from the Discord API. They are responsible for executing the event handlers that you register throughout your application.

## Getting started

A basic Receiver could look like this:

```TS
import { Receiver, Command, toReply } from '@watsonjs/common';

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

| Name            | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `prefix`        | If no prefix is set for a command in the receiver, this prefix will be used. |
| `caseSensitive` | Requires all commands to be caseSensitive.                                   |
