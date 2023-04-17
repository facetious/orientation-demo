import { Application } from '@nativescript/core';

export function setOrientation(orientation: string = 'portrait', locked: boolean = true): void {
    const LOCK: number = locked === true ? android.content.pm.ActivityInfo.SCREEN_ORIENTATION_LOCKED : 0; // only when explicit true boolean
    switch (orientation) {
    case 'landscape':
        (Application.android.foregroundActivity as android.app.Activity).setRequestedOrientation(
            android.content.pm.ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE | LOCK,
        );
        break;
    case 'portrait':
        (Application.android.foregroundActivity as android.app.Activity).setRequestedOrientation(
            android.content.pm.ActivityInfo.SCREEN_ORIENTATION_PORTRAIT | LOCK,
        );
        break;
    default:
        (Application.android.foregroundActivity as android.app.Activity).setRequestedOrientation(
            android.content.pm.ActivityInfo.SCREEN_ORIENTATION_USER | LOCK,
        );
        break;
    }
}
