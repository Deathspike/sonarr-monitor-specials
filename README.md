# sonarr-monitor-specials

A tool for [Sonarr](https://github.com/Sonarr/Sonarr) that periodically scans your library and **monitors "interesting" specials** so they show up as _missing_. By default, Sonarr's all-or-nothing approach means either monitoring every special and getting buried in fluff, or monitoring none and missing OVAs, movies, and other story-relevant extras. This tool takes the middle ground, monitoring the ones likely worth your time so you can choose to grab them or unmonitor them.

## How

This tool scans your Sonarr library on a schedule and checks each special's runtime. When it's at least half the length of a normal episode, it's marked as monitored so it appears as _missing_. From there, you choose whether to grab it or unmonitor it, and this tool will never change that choice. This simple heuristic surfaces OVAs, movies, and other story-relevant extras while skipping most of the fluff. Sure, it's not perfect and might still flag a few you don't care about, but it's a far better trade-off than Sonarr's default all-or-nothing approach.

## Installation

### Docker

```yaml
services:
  sonarr.monitor.specials:
    image: deathspike/sonarr-monitor-specials
    container_name: sonarr.monitor.specials
    restart: always
    depends_on:
      - sonarr
    environment:
      - API_KEY=your-api-key
      - BASE_URL=http://sonarr:8989/
    volumes:
      - sonarr.monitor.specials.data:/app/data
volumes:
  sonarr.monitor.specials.data:
    name: sonarr.monitor.specials.data
```

### Node.js

```bash
git clone https://github.com/Deathspike/sonarr-monitor-specials
cd sonarr-monitor-specials
npm install --omit=dev
node .
```

## Environment Variables

| Name            | Default                  | Description                                                                                                                                                                                        |
| --------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`API_KEY`**   | (empty)                  | **Required.** Your Sonarr API key, found under **Sonarr → Settings → General → Security**. Without it, this tool cannot access your library.                                                       |
| **`BASE_URL`**  | `http://localhost:8989/` | The base URL of your Sonarr instance, including protocol and port. For Docker setups, this may be something like `http://sonarr:8989/`.                                                            |
| **`FILE_PATH`** | `data/episodes.jsonl`    | Path to the file where this tool stores specials it has flagged. This prevents re-flagging the same special again. **Important:** If you remove or reset this file, specials may be flagged again. |

## Contributions

Pull requests are welcome! Please open an issue first to discuss major changes.
