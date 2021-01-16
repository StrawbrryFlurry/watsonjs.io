## Error handling

Watson makes it increadibly easy to handle errors during command execution. You can throw an Exception that extends the abstract `EventExecutionException` class in all event related execution contexts like event handlers, command handlers and any kind of `configurable` like `pipes` or `guards`.
