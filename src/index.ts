// The caption client lives in @tiktool/live 2.6.x; later majors dropped it when
// Live Captions became a legacy service, so the dependency is pinned below 2.7.
export { TikTokCaptions } from '@tiktool/live';

export type {
    TikTokCaptionsOptions,
    TikTokCaptionsEvents,
    CaptionData,
    TranslationData,
    CaptionCredits,
    CaptionError,
    CaptionStatus,
} from '@tiktool/live';

import type {
    TikTokCaptionsEvents,
    CaptionData,
    TranslationData,
    CaptionCredits,
    CaptionError,
} from '@tiktool/live';

// Aliases for the names 1.0.1 and 1.0.2 exported.
export type TikTokCaptionsEventMap = TikTokCaptionsEvents;
export type CaptionEvent = CaptionData;
export type TranslationEvent = TranslationData;
export type CreditsEvent = CaptionCredits;
export type ErrorEvent = CaptionError;
