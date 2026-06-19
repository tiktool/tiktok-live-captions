<p align="center">
  <a href="https://discord.com/oauth2/authorize?client_id=1482386543233597470">
    <img src="https://img.shields.io/badge/Add%20TikTool%20Bot%20to%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Add TikTool Bot to Discord" height="46">
  </a>
</p>

Agency rank feeds in Discord: gaming ranks, creator ranks and 99+ movers across all 30 regions, copy-paste usernames for backstage. /ranks to start (Global Agency).

# @tiktool/captions

### TikTok Live Captions - Real-Time Speech-to-Text Transcription & Translation

[![npm version](https://img.shields.io/npm/v/@tiktool/captions.svg)](https://www.npmjs.com/package/@tiktool/captions)
[![npm downloads](https://img.shields.io/npm/dm/@tiktool/captions.svg)](https://www.npmjs.com/package/@tiktool/captions)
[![license](https://img.shields.io/npm/l/@tiktool/captions.svg)](https://github.com/tiktool/captions/blob/main/LICENSE)

Turn any TikTok livestream into real-time text. Transcription + translation + speaker identification. Works with any language. Zero config.

> **This package re-exports the captions module from [`@tiktool/live`](https://www.npmjs.com/package/@tiktool/live).** If you also need chat, gifts, viewers, or battle events, install `@tiktool/live` instead - it includes everything.

---

## Install

```bash
npm install @tiktool/captions
```

---

## Usage

```typescript
import { TikTokCaptions } from '@tiktool/captions';

const captions = new TikTokCaptions({
  uniqueId: 'username',
  apiKey: 'tk_your_api_key',
  translate: 'en',
});

captions.on('caption', (data) => {
  console.log(`[${data.language}] ${data.text}`);
});

captions.on('translation', (data) => {
  console.log(`[${data.language}] ${data.text}`);
});

captions.on('credits', (credits) => {
  console.log(`${credits.remaining}/${credits.total} credits left`);
});

captions.on('error', (err) => {
  console.error(err.code, err.message);
});

await captions.start();
```

That's it. Captions start flowing.

---

## Options

All options are passed to the constructor as a single object.

| Option | Type | Default | Required | Description |
|---|---|---|---|---|
| `uniqueId` | `string` | - | Yes | TikTok username (with or without `@`) |
| `apiKey` | `string` | - | Yes | API key from [tik.tools](https://tik.tools) |
| `language` | `string` | auto-detect | | Source language hint (`'en'`, `'ko'`, `'ja'`, etc.) |
| `translate` | `string` | - | | Target language for translation (`'en'`, `'es'`, `'fr'`, etc.) |
| `diarization` | `boolean` | `true` | | Identify individual speakers |
| `maxDurationMinutes` | `number` | `60` | | Auto-disconnect after N minutes (max 300) |
| `signServerUrl` | `string` | `wss://api.tik.tools` | | Custom server URL |
| `autoReconnect` | `boolean` | `true` | | Reconnect on disconnect |
| `maxReconnectAttempts` | `number` | `5` | | Retry limit before giving up |
| `debug` | `boolean` | `false` | | Log raw WebSocket messages |

---

## Events

| Event | Payload | When |
|---|---|---|
| `caption` | `CaptionData` | New transcription segment |
| `translation` | `TranslationData` | Translated segment |
| `status` | `CaptionStatus` | Connection state changes |
| `credits` | `CaptionCredits` | Credit balance update |
| `credits_low` | `{ remaining, total, percent }` | Credits below threshold |
| `error` | `CaptionError` | Something went wrong |
| `connected` | - | WebSocket connected |
| `disconnected` | `(code, reason)` | WebSocket closed |

---

## Methods

| Method | Returns | Description |
|---|---|---|
| `start()` | `Promise<void>` | Connect and begin transcription |
| `stop()` | `void` | Disconnect and stop |

---

## Types

```typescript
interface CaptionData {
  text: string;
  language: string;
  isFinal: boolean;
  confidence: number;
  speaker?: string;
  startMs?: number;
  endMs?: number;
}

interface TranslationData {
  text: string;
  language: string;
  isFinal: boolean;
  confidence: number;
  speaker?: string;
}

interface CaptionCredits {
  remaining: number;
  total: number;
  used: number;
  warning: boolean;
}

interface CaptionStatus {
  status: 'connecting' | 'waiting' | 'live' | 'transcribing' |
          'ended' | 'switching_language' | 'language_switched' | 'stream_ended';
  uniqueId?: string;
  roomId?: string;
  language?: string;
  message?: string;
}

interface CaptionError {
  code: string;
  message: string;
}
```

---

## Languages

Auto-detection works out of the box. No config needed.

Supported: Chinese, English, Korean, Japanese, Spanish, French, German, Portuguese, Russian, Arabic, Hindi, Thai, Vietnamese, Indonesian, Turkish, Italian, Dutch, Polish, Swedish, Greek, Czech, Romanian, Hungarian, Finnish, Danish, Norwegian, Hebrew, Malay, Filipino, Ukrainian, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu, Persian, and more.

Translation works between any supported pair.

---

## Credits

1 credit = 1 minute of audio in 1 language.

| Scenario | Credits used |
|---|---|
| 10 min transcription only | 10 |
| 10 min + translation to 1 language | 20 |
| 10 min + translation to 2 languages | 30 |

| Plan | Credits | Billing |
|---|---|---|
| Community | 0 (subscription required) | Free forever |
| Pro | 2,000/month | Monthly |
| Ultra | 10,000/month | Monthly |
| Global Agency | 10,000/month + add-on packs | Monthly |

Caption Credits are pay-as-you-go top-ups on top of any paid subscription (Pro, Ultra, Global Agency). Starter pack (1k credits), Creator pack (5k), Agency pack (20k) - purchase from the [Captions page](https://tik.tools/captions).

[Get an API key](https://tik.tools/pricing)

---

## Pricing (USD)
| Tier | Weekly | Monthly |
|------|--------|---------|
| Sandbox / Free | $0 | $0 |
| Basic | $7 | $19 |
| Pro | $15 | $49 |
| Ultra | $45 | $149 |
| Global Agency | $119 | $399 |

Full pricing + checkout: https://tik.tools/pricing

## Tiers
Tier ladder (each includes everything below it): Sandbox -> Basic -> Pro -> Ultra -> Global Agency. Sandbox is free with reduced rate limits + masked identifiers on intelligence endpoints; paid tiers raise limits and unmask data. Outgoing webhooks need Basic+. The agency intelligence endpoints (gaming ranks, movers, eligible-creator finder, gifter intel) need Global Agency.

## Endpoints and required tier
| Endpoint | Min tier |
|---|---|
| POST /webcast/sign_url | Sandbox |
| POST /webcast/sign_websocket | Sandbox |
| GET /webcast/ws_credentials | Sandbox |
| GET /webcast/fetch | Sandbox |
| GET /webcast/room_id | Sandbox |
| GET /webcast/room_info | Sandbox |
| GET /webcast/room_video | Sandbox |
| GET /webcast/room_cover | Sandbox |
| GET /webcast/check_alive | Sandbox |
| POST /webcast/bulk_live_check | Sandbox |
| GET /webcast/live_status | Sandbox |
| GET /webcast/live-counts | Sandbox |
| POST /webcast/resolve_user_ids | Sandbox |
| GET /webcast/rankings | Sandbox |
| GET /webcast/leaderboard | Sandbox |
| GET /webcast/leaderboard/league | Sandbox |
| GET /webcast/leaderboard/leagues | Sandbox |
| GET /webcast/gift_info | Sandbox |
| GET /webcast/gift_gallery | Sandbox |
| GET /webcast/hashtag_list | Sandbox |
| GET /webcast/user_earnings | Sandbox |
| GET /webcast/live_analytics/video_list | Sandbox |
| GET /webcast/live_analytics/video_detail | Sandbox |
| GET /webcast/live_analytics/user_interactions | Sandbox |
| GET /webcast/rate_limits | Sandbox |
| POST /authentication/jwt | Sandbox |
| GET /api/live/connect | Sandbox |
| POST /chat-send | Basic |
| GET/POST /api/webhooks | Basic |
| POST /api/webhooks/{id}/test | Basic |
| GET /ws/sweep | Basic |
| GET /webcast/feed | Pro |
| POST /webcast/ranklist/regional | Pro |
| GET /webcast/user_profile | Pro |
| GET /api/leaderboards/country/:slug | Pro |
| GET /webcast/gifts_by_country | Ultra |
| GET /api/leaderboards/leagues/:region | Ultra |
| GET /api/leaderboards/league/:region/:classType | Ultra |
| GET /webcast/ranklist/gaming | Global Agency |
| GET /webcast/ranklist/gaming_movers | Global Agency |
| GET /webcast/ranklist/region_movers | Global Agency |
| GET /webcast/eligible_creators | Global Agency |
| GET /api/gifters/top | Global Agency |
| GET /api/gifters/leaderboard | Global Agency |
| GET /api/gifters/profile | Global Agency |

Full docs with request/response shapes and examples: https://tik.tools/docs

## What you get
**Creators**: real-time live events (gifts, chat, viewers), your own live status + room info, earnings + analytics, signed CDN/stream URLs that do not expire.
**Developers**: drop-in signing (works as a tiktok-live-connector backend - point the sign base at api.tik.tools), one-WebSocket fan-out (your IP never touches TikTok), bulk live checks, leaderboards, webhooks (HMAC-signed live.start/live.end and more), SDKs across languages.
**Agencies (Global Agency)**: TikTok LIVE gaming ranks + creator ranks + 99+ movers across all 30 regions, eligible-creator recruiting finder, gifter intelligence (top gifters, profiles, leaderboards), and the Discord bot that posts copy-paste username batches for backstage.

---

## Related

- [`@tiktool/live`](https://www.npmjs.com/package/@tiktool/live) - Full TikTok LIVE API (chat, gifts, viewers, battles, captions, and more)

---

## License

[MIT](./LICENSE)
