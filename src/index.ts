export { TikTokCaptions } from '@tiktool/live';

export type {
    TikTokCaptionsOptions,
    TikTokCaptionsEventMap,
    CaptionEvent,
    TranslationEvent,
    CreditsEvent,
    ErrorEvent,
} from '@tiktool/live';

import type {
    TikTokCaptionsEventMap,
    CaptionEvent,
    TranslationEvent,
    CreditsEvent,
    ErrorEvent,
} from '@tiktool/live';

// Backward-compatible aliases for the pre-1.0.1 export names.
export type TikTokCaptionsEvents = TikTokCaptionsEventMap;
export type CaptionData = CaptionEvent;
export type TranslationData = TranslationEvent;
export type CaptionCredits = CreditsEvent;
export type CaptionError = ErrorEvent;

// Connection/caption lifecycle status. Kept as a local type since the upstream
// package no longer exports a dedicated status type.
export type CaptionStatus = 'idle' | 'connecting' | 'active' | 'stopped' | 'error';
