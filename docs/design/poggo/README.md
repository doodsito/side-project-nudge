# Poggo animation assets

Prepared in the recovered Photopea project on 2026-11-13 and used by the Nudge landing Hero. The original artwork remains intact.

Editable source: `poggo-animation.psd`. Original artwork and earlier eyelid layers remain hidden as references. Use `Body_Main`, `Eye_Left_Open`, `Eye_Right_Open`, `Eyelid_Left_Closed`, and `Eyelid_Right_Closed`; earlier `Source_*` and half-closed layers are not production assets.

Web PNGs: `apps/web/public/assets/poggo/prepared/`. This separate folder preserves the exports already present in `assets/poggo/`.

Every PNG has the same **1254 x 1254 px** transparent canvas. Left and right mean the viewer's left and right. Keep every image at top: 0, left: 0, width: 100%, height: 100% in one square container. Do not trim or independently position eyes.

| State | Visible layers above `poggo-body.png` |
| --- | --- |
| Normal | `poggo-eye-left-open.png`, `poggo-eye-right-open.png` |
| Blink | `poggo-eye-left-closed.png`, `poggo-eye-right-closed.png` |
| Left wink | `poggo-eye-left-closed.png`, `poggo-eye-right-open.png` |
| Right wink | `poggo-eye-left-open.png`, `poggo-eye-right-closed.png` |

Use exactly one state per eye. Closed eye patches include surrounding skin to cover the original eye edges. The mouth and eyebrows remain in the body. `poggo-normal.png`, `poggo-blink.png`, `poggo-wink-left.png`, and `poggo-wink-right.png` are complete composites for reference or frame switching.

`poggo-animation-preview.webp` shows a timing preview on white: a 110 ms blink and 180 ms winks, separated by 2.2-2.4 second pauses. The preview is not a transparent production asset. For implementation, switch eye states without crossfading, support reduced motion, and keep the normal pose as the fallback.

Checked: normal Photopea composite is pixel-identical to the preserved original export; all nine PNGs have aligned transparent canvases; blink and both winks inspected on white; original open-eye arch no longer protrudes above the right closed eyelid. PNG compression is lossless and was checked against the Photopea exports. Original artwork includes slight interior transparency, which remains intact.

The website uses Next.js under `apps/web`. The Hero stacks the body and eye PNGs at identical positions and switches eye layers without crossfading.
