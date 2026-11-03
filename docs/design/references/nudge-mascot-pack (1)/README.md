# Nudge mascot pack

Six coherent poses derived from the existing Nudge pig, generated using the built-in image-generation tool. Pink/lilac satin 3D character with piggy-bank coin slot, starry eyes, round silhouette and lilac hooves. No outfit or prop changes.

## Files
- png/: six full-resolution RGBA transparent PNG assets.
- webp/: six alpha-preserving quality-90 WebP versions for delivery.
- nudge-mascot-overview.png: review sheet on a cream background.
- manifest.json: state map, dimensions, English/French alt text, placement and motion guidance.

All images are STATIC. The walking pose is a still illustration, not an animated walk cycle. No animation rig or video is included.

## Integration
Use object-fit: contain; keep the original aspect ratio. Reserve image dimensions to avoid layout shifts. Leave clear space around the silhouette. Use the guide beside the next-step control without covering its label; avoid floating characters obscuring content on mobile. Use only one pose per major interaction area. Aim for roughly 80–160 CSS pixels in contextual UI and 220–360 in hero sections.

When the mascot repeats information already provided in adjacent copy, use alt="". When the image carries meaningful information, use the manifest alt text. Always provide success, error and progress information as real text; never rely on the mascot alone.

## Optional motion
These are suggestions for future CSS integration, not animation already embedded in the assets. Keep motion short and event-triggered; no endless bouncing. On prefers-reduced-motion: reduce, disable animation and transforms and show the static state. Never shake the mascot to shame a user after an error.

## State map

### welcome / Bienvenue
Placement: Accueil et onboarding.
EN alt: Nudge the pink pig waves hello.
FR alt: Nudge, le cochon rose, fait un signe de bienvenue.
Optional motion: One gentle entrance, 220 ms.

### curious / Curieux
Placement: Choix, apprentissage et aide.
EN alt: Nudge tilts its head thoughtfully.
FR alt: Nudge penche la tête avec curiosité.
Optional motion: Optional one-time 2-degree tilt, 250 ms.

### encourage / Encourageant
Placement: Erreur et nouvel essai.
EN alt: Nudge offers a reassuring smile.
FR alt: Nudge sourit pour vous encourager.
Optional motion: Static by default; no shaking or negative motion.

### celebrate / Bravo !
Placement: Objectif ou étape réussie.
EN alt: Nudge celebrates with raised hooves.
FR alt: Nudge célèbre la réussite, les sabots levés.
Optional motion: Optional one-time 8 px hop, 350 ms.

### guide / Par ici
Placement: Prochaine étape et tutoriel.
EN alt: Nudge points toward the next step.
FR alt: Nudge indique la prochaine étape.
Optional motion: Optional one-time 4 px nudge toward the action, 250 ms.

### walk / En route
Placement: Progression et accompagnement.
EN alt: Nudge takes a cheerful step forward.
FR alt: Nudge avance avec un pas joyeux.
Optional motion: Still walking pose; optional whole-image 4 px slide, 250 ms. Not a walk-cycle animation.

## Generation specification
Each pose was generated as an identity-preserving edit using the original image as visual reference. Shared prompt: preserve the same single round pink piggy-bank body/head, top coin slot, triangular pink/lilac ears, huge dark glassy eyes with cream star highlights, rosy cheeks, oval snout, tiny eyebrows and curly tail, short limbs and lilac cloven hooves, satin 3D material and lighting. No clothes, fingers, text, props or environment. Full character on transparent alpha. Pose instructions: welcoming wave; thoughtful curious tilt and hoof to cheek; open reassuring gesture; success hop with raised forehooves; presenting next step to the right; cheerful mid-step walking still. The guide was regenerated to ensure four limbs total.
