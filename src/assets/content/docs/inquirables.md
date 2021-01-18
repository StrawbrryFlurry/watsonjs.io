# Inquirables

It's not uncommon that you might want to get some data or response from the user when running a command. Watson provides an easy for this - Inquirables. You can inject an inquirable factory through the command arguments using their respective decorator.

## `@InjectAsk()`

The `@InjectAsk` parameter decorator injects a `AskFunction` factory to the parameter decorated. You can use this function to send a message to the same message channel from which the command was executed. Addionally you can specify configurations for the raction listener and it's filter function.

```TS
import { AskFunction, Command, InjectAsk, InjectChannel, Receiver } from '@watsonjs/common';
import { Message, TextChannel } from 'discord.js';

@Receiver()
export class AskInquirableReceiver {
  @Command("ping")
  async askCommand(
    @InjectAsk() ask: AskFunction<Message>,
    @InjectChannel() channel: TextChannel
  ) {
    const response = await ask("Would you like me to reply with `pong`?");

    if (response === undefined) {
      return channel.send("Sorry, you didn't respond in time");
    }

    if (response.content === "Yes") {
      return response.channel.send("pong");
    }

    return channel.send("Okay");
  }
}
```

## `@InjectReact()`

The `@InjectReact` decorator will, despite its name, not inject a <a href="https://reactjs.org"/>reactjs</a> instance. It will give you access to the `ReactFunction` factory to send a message to the command channel. You can then retrieve all reactions for said message within a given timeframe. As with the `AskFunction` you can configure the reaction listener on the message and its filter to fit your needs.

```TS
import { Command, InjectChannel, InjectReact, InjectUser, ReactFunction, Receiver } from '@watsonjs/common';
import { MessageReaction, TextChannel, User } from 'discord.js';

const checkReactionFilter = (reaction: MessageReaction) =>
  reaction.emoji.name === "✅";

@Receiver()
export class ReactInquirableReceiver {
  @Command("verify")
  async verifyCommand(
    @InjectReact() reactFn: ReactFunction<MessageReaction[]>,
    @InjectChannel() channel: TextChannel,
    @InjectUser() user: User
  ) {
    const reactions = await reactFn(
      "React to this message with a ✅ to get verified",
      { time: 60000 },
      checkReactionFilter
    );

    const hasUser = reactions.some((r) => r.users.cache.has(user.id));

    if (reactions.length === 0 || !hasUser) {
      return channel.send("You didn't react in time");
    }

    return channel.send("Congrats you're now verified");
  }
}
```

## `@InjectCollector()`

This decorator will inject the `CollectFunction` factory to the parameter it's decorating. With it you are able

```TS

```
