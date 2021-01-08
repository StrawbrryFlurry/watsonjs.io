# Receivers

Receivers are the component of your application that will handle all incomming events from the Discord API. They are responsible for executing code for commands registered for the application as well as custom event listeners.

## Getting started

A basic Receiver could look like this

```TS
@Receiver()
export class HatReceiver {  }
```

You are now able to add this Receiver to a Module. As of now it won't have any funcitonality to it though. We provide two main ways to handle Discord Events in Watson, Commands and Events. We'll take a closer look at both of them below.

## Events
