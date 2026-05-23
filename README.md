# @tiktool/captions

### TikTok Live Captions — Real-Time Speech-to-Text Transcription & Translation

[![npm version](https://img.shields.io/npm/v/@tiktool/captions.svg)](https://www.npmjs.com/package/@tiktool/captions)
[![npm downloads](https://img.shields.io/npm/dm/@tiktool/captions.svg)](https://www.npmjs.com/package/@tiktool/captions)
[![license](https://img.shields.io/npm/l/@tiktool/captions.svg)](https://github.com/tiktool/captions/blob/main/LICENSE)

Turn any TikTok livestream into real-time text. Transcription + translation + speaker identification. Works with any language. Zero config.

> **This package re-exports the captions module from [`@tiktool/live`](https://www.npmjs.com/package/@tiktool/live).** If you also need chat, gifts, viewers, or battle events, install `@tiktool/live` instead — it includes everything.

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
| `uniqueId` | `string` | — | ✅ | TikTok username (with or without `@`) |
| `apiKey` | `string` | — | ✅ | API key from [tik.tools](https://tik.tools) |
| `language` | `string` | auto-detect | | Source language hint (`'en'`, `'ko'`, `'ja'`, etc.) |
| `translate` | `string` | — | | Target language for translation (`'en'`, `'es'`, `'fr'`, etc.) |
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
| `connected` | — | WebSocket connected |
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

Caption Credits are pay-as-you-go top-ups on top of any paid subscription (Pro, Ultra, Global Agency). Starter pack (1k credits), Creator pack (5k), Agency pack (20k) — purchase from the [Captions page](https://tik.tools/captions).

[Get an API key →](https://tik.tools/pricing)

---

## Related

- [`@tiktool/live`](https://www.npmjs.com/package/@tiktool/live) — Full TikTok LIVE API (chat, gifts, viewers, battles, captions, and more)

---

## License

[MIT](./LICENSE)
