# Async SVC Flow with Recovery

# ENV

```
docker compose -f etc/docker/nats.yml --env-file .env up -d
```

```
npm i
```

```
npm run app
```

# Management utility

## data cleaner

```
npm run clean -w @at/control
```

## perf post COMMAND

```
npm run clean -w @at/command
```

## loader post COMMAND

```
npm run clean -w @at/loader
```

## check state after restart

```
npm run clean -w @at/inspect
```

# Flow

    Client sendPayload |>

    svc:A SetRegisterResponse |>
    svc:A PublishCommand |

    svc:B ProcessCommand |>
    svc:B SetStateTask |>
    svc:B PublishResult |

    svc:A ProcessResult |>
    svc:A GetResponseByTaskId |>
    svc:A ClearRegisterResponse |>
    svc:A SendResultClient |>

    Client: replyResult |
