# sonarr-monitor-specials

A tool for [Sonarr](https://github.com/Sonarr/Sonarr) that periodically scans your library and **monitors "interesting" specials** so they show up as _missing_. By default, Sonarr's all-or-nothing approach means either monitoring every special and getting buried in fluff, or monitoring none and missing OVAs, movies, and other story-relevant extras. This tool takes the middle ground by monitoring specials that run at least half the length of a normal episode. Sure, it's not perfect and might still monitor a few you don't care about, but it's a far better trade-off than Sonarr's defaults.

## Quick Start

Run with **docker**:

```bash
docker run -e API_KEY=your-api-key -e BASE_URL=http://sonarr:8989/ deathspike/sonarr-monitor-specials
```

Or run with **npm (using npx)**:

```bash
npx sonarr-monitor-specials --api-key=your-api-key --base-url=http://localhost:8989/
```

## Installation

The _Quick Start_ commands are for one-off runs to quickly try the tool, while the options below are intended for regular use. You can set up a persistent environment with **Docker Compose**, install the CLI globally with **npm**, or clone **from source** if you want full control or plan to contribute.

### Docker Compose

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

### npm

Install globally with **npm**:

```bash
npm install -g sonarr-monitor-specials
```

Then run:

```bash
sonarr-monitor-specials --api-key=your-api-key --base-url=http://localhost:8989/
```

### From Source

Install from source with **git** and **npm**:

```bash
git clone https://github.com/Deathspike/sonarr-monitor-specials
cd sonarr-monitor-specials
npm install
```

Then run with **node**:

```bash
node bin/cli.js --api-key=your-api-key --base-url=http://localhost:8989/
```

## Configuration

You can configure this tool either with CLI options or with environment variables. CLI options are typically used when running from the command line, while environment variables are more convenient in Docker. If you provide both, CLI options take precedence. If neither is set, the tool falls back to the default values shown in the table below.

| CLI               | ENV             | Default                  | Description                                                                                                                                                                                                 |
| ----------------- | --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`--api-key`**   | **`API_KEY`**   | (empty)                  | **Required.** Your Sonarr API key, found under **Sonarr → Settings → General → Security**. Without it, this tool cannot access your library.                                                                |
| **`--base-url`**  | **`BASE_URL`**  | `http://localhost:8989/` | The base URL of your Sonarr instance, including protocol and port. For Docker setups, this may be something like `http://sonarr:8989/`.                                                                     |
| **`--file-path`** | **`FILE_PATH`** | `data/episodes.jsonl`    | Path to the file where this tool stores specials it has flagged. This prevents re-flagging the same special again. **Important:** If you remove or reset this file, specials may be flagged again.          |
| **`--interval`**  | **`INTERVAL`**  | `0` or `86400000`        | Interval between runs, in milliseconds. A value of `0` runs once and exits (default for CLI). Any positive value repeats after that many milliseconds, with Docker defaulting to `86400000` (once per day). |

## Contributions

Pull requests are welcome! Please open an issue first to discuss major changes.
