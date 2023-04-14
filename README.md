# Async SVC Flow with Recovery

# ENV

```
docker compose -f etc/docker/nats.yml --env-file .env up -d
```

```
npm i
```

```
npm run app:flow
```

# Flow

    Client sendPayload |>

    svc:A CreateTask |>
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
