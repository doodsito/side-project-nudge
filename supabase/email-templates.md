# Email templates (Robin pastes them in Supabase)

Supabase has one template per email. Each template below picks the language
from the account's track (`user_metadata.track`, saved by the website at
sign-up and when the member changes version): English for `us`, French
otherwise, since France is the default track.

Paste each one in the Supabase dashboard: Authentication > Emails > Templates.

## Confirm signup

Subject:

```
{{ if eq .Data.track "us" }}Confirm your Nudge account{{ else }}Confirme ton compte Nudge{{ end }}
```

Body (HTML):

```html
{{ if eq .Data.track "us" }}
<h2>Welcome to Nudge</h2>
<p>Confirm your email address to start practicing investing decisions with virtual money.</p>
<p><a href="{{ .ConfirmationURL }}">Confirm my email</a></p>
<p>If you didn’t create a Nudge account, you can ignore this email.</p>
{{ else }}
<h2>Bienvenue sur Nudge</h2>
<p>Confirme ton adresse e-mail pour commencer à t’entraîner à investir avec de l’argent virtuel.</p>
<p><a href="{{ .ConfirmationURL }}">Confirmer mon e-mail</a></p>
<p>Si tu n’as pas créé de compte Nudge, tu peux ignorer cet e-mail.</p>
{{ end }}
```

## Reset password

Subject:

```
{{ if eq .Data.track "us" }}Reset your Nudge password{{ else }}Réinitialise ton mot de passe Nudge{{ end }}
```

Body (HTML):

```html
{{ if eq .Data.track "us" }}
<h2>Choose a new password</h2>
<p>Someone asked to reset the password of your Nudge account. Open this link in the browser where you asked for it:</p>
<p><a href="{{ .ConfirmationURL }}">Choose a new password</a></p>
<p>If it wasn’t you, ignore this email: your password stays the same.</p>
{{ else }}
<h2>Choisis un nouveau mot de passe</h2>
<p>Quelqu’un a demandé à réinitialiser le mot de passe de ton compte Nudge. Ouvre ce lien dans le navigateur où tu l’as demandé&nbsp;:</p>
<p><a href="{{ .ConfirmationURL }}">Choisir un nouveau mot de passe</a></p>
<p>Si ce n’était pas toi, ignore cet e-mail&nbsp;: ton mot de passe ne change pas.</p>
{{ end }}
```

Members who joined before the tracks have no `track` yet and get the French
version; their track is saved the next time they log in.
