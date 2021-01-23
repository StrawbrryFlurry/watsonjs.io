# Commands

Commands can be used to specifically handle message events from both guild and direct message channels. You are given the option to specify close to all the metadata that you require the command to look like.

## Usage

Commands are methods decorated with the `@Command` decorator within a receiver class. To create a command you only have to specify a name which will be the value the command parser is checking incomming messages for.

A simple command could look like this:

```TS
import { Receiver, Command } from '@watsonjs/common';

@Receiver()
export class PingReceiver {

  @Command('ping')
  handlePing() {
    return 'pong';
  }
}
```

Watsons event proxy will filter all messages that start with 'ping' and then call the `handlePing` method of the receiver with the requested data of the current execution context.

## Configuration

The command decorator supports a bunch of configurable options for the command and how it is going to be parsed by the framework.

### Command options

| Name             | Type              | Description                                                           | default?                   |
| ---------------- | ----------------- | --------------------------------------------------------------------- | -------------------------- |
| `command?`       | `string`          | Name of the command                                                   | The name of the descriptor |
| `alias?`         | `string[]`        | Aliases under which the command is available                          |
| `pramDelimiter?` | `string`          | The delimiter used to parse arguments                                 | `" "`                      |
| `params?`        | `ICommandParam[]` | Parameters of the command                                             |
| `prefix?`        | `string`          | Sets the prefix for the command                                       |
| `caseSensitive?` | `boolean`         | Requires the command in the message to exactly match the command name | `false`                    |

### Param options

| Name            | Type                  | Description                                                                                                                            | default? |
| --------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `name`          | `string`              | Internal name the parameter should be reffered as. It can then also be used to get the pram data using the `@Param()` decorator        |
| `type`          | `CommandArgumentType` | Internal type the parameter should be parsed as                                                                                        |
| `optional?`     | `boolean`             | Makes the parameter optional. Optional parameters cannot be followed by mandatory ones.                                                | `false`  |
| `hungry?`       | `boolean`             | Uses the rest of the message content. This option can only be used for the last parameter.                                             | `false`  |
| `encapsulator?` | `string`              | If the hungry options was not set and the command should listen for a sentence you'll need to specify an encapsulator for the sentence | `"`      |
| `default?`      | `any`                 | The default value if none was provided                                                                                                 |
| `dateFormat?`   | `string`              | If the type a date this parameter is required to parse the date.                                                                       |

## Command parameters

Command parameters are the part of a command message after the command name. `"!COMMAND PARAM1 PARAM2"` They are a way for a user to provide you with additional information to execute a command. By default Watson will parse arguments from a message if they were specified in the command options. You can also use the `@UseParser` decorator to use your own parser for any given commands. You can find more information about `UseParser` and other configurables in their respective article.

This would be a simple command that takes one `number` as a parameter.

```TS
import { Command, CommandArgumentType, Param, Receiver } from '@watsonjs/common';

@Receiver()
export class RandomReceiver {

 @Command({
    command: "random",
    prefix: '!',
    params: [
      {
        name: "max",
        type: CommandArgumentType.NUMBER,
      },
    ],
  })
  handleMax(@Param("max") max: number) {
    return Math.floor(Math.random() * max) + 1;
  }
}
```

We can then use the `@Param` parameter decorator to access the parameters by their name. Also, if no name is provided it will set the parameter to an object whose keys are the param name and the values are the parsed values.

## Response handling

During the execution of a command you likely want to send some data back to the user by printing a result for their command. In Watson, simply returning a value from a command handler will send this data directly to the channel that the command originated from. The data should be either a `string` value, a discordjs `MessageEmbed` instance or a `Promise` / `Observable` that resolves to one of these types.

> Returning invalid data types will `NOT` throw an error and the value will simply be ignored when finishing the command execution.

For certain use cases this will not be enought though. That's why Watson provides you with some `returnables` functions that will tell the response controller how to handle the data returned from the handler.

## Parmeter decorators

# Slash commands
