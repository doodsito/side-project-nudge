import type { Metadata } from "next";
import Link from "next/link";
import { ConsentDialogLink } from "@c15t/nextjs/components/consent-dialog-link";
import { Button } from "@/components/ui/button";
import { LegalTemplate } from "@/components/layout/legal-template";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { BRAND, CONTACT_EMAIL, SITE_URL } from "@/lib/brand";
import { getVisitorTrack } from "@/lib/auth";
import { llmsTxtAlternate } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await getVisitorTrack()) === "fr";
  return {
    title: `${fr ? "Politique relative aux cookies" : "Cookie Policy"} | ${BRAND}`,
    description: fr
      ? `Quels cookies ${BRAND} utilise, pourquoi et comment modifier ton choix à tout moment.`
      : `Which cookies ${BRAND} uses, why, and how to change your choice at any time.`,
    alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/cookies` },
  };
}

const COOKIES = [
  {
    name: "c15t",
    purpose:
      "Remembers your cookie choice so we don't ask on every page. A copy is kept in your browser's local storage.",
    duration: "6 months",
    category: "Strictly necessary",
  },
  {
    name: "nudge_track",
    purpose:
      "Remembers the version of the site you chose (France or United States), so the right home page and language open next time.",
    duration: "12 months",
    category: "Strictly necessary",
  },
  {
    name: "nudge_access_code",
    purpose: "Remembers the beta access code you entered until you finish signing in.",
    duration: "30 minutes",
    category: "Strictly necessary",
  },
  {
    name: "sb-…-auth-token",
    purpose: "Keeps you signed in to your beta account. Set only when you sign in.",
    duration: "Until you sign out, 400 days at most",
    category: "Strictly necessary",
  },
  {
    name: "sb-…-auth-token-code-verifier",
    purpose:
      "Secures your sign-in while you go through Google or an email link (confirming your email, resetting your password).",
    duration: "Deleted once you are signed in",
    category: "Strictly necessary",
  },
  {
    name: "_ga",
    purpose: "Google Analytics: tells visits from the same browser apart, to count visitors.",
    duration: "13 months",
    category: "Analytics, only if you accept",
  },
  {
    name: `_ga_${GA_MEASUREMENT_ID.replace("G-", "")}`,
    purpose: "Google Analytics: keeps track of the current visit.",
    duration: "13 months",
    category: "Analytics, only if you accept",
  },
];

const FR_COOKIES = [
  {
    name: "c15t",
    purpose:
      "Mémorise ton choix de cookies pour éviter de te le redemander à chaque page. Une copie est conservée dans le stockage local de ton navigateur.",
    duration: "6 mois",
    category: "Strictement nécessaire",
  },
  {
    name: "nudge_track",
    purpose:
      "Mémorise la version choisie (France ou États-Unis) pour ouvrir la bonne page d’accueil et la bonne langue lors de ta prochaine visite.",
    duration: "12 mois",
    category: "Strictement nécessaire",
  },
  {
    name: "nudge_access_code",
    purpose: "Mémorise le code d’accès bêta saisi jusqu’à la fin de ta connexion.",
    duration: "30 minutes",
    category: "Strictement nécessaire",
  },
  {
    name: "sb-…-auth-token",
    purpose: "Te maintient connecté à ton compte bêta. Créé uniquement lorsque tu te connectes.",
    duration: "Jusqu’à la déconnexion, 400 jours au plus",
    category: "Strictement nécessaire",
  },
  {
    name: "sb-…-auth-token-code-verifier",
    purpose:
      "Sécurise la connexion via Google ou un lien e-mail (confirmation d’adresse ou réinitialisation du mot de passe).",
    duration: "Supprimé après la connexion",
    category: "Strictement nécessaire",
  },
  {
    name: "_ga",
    purpose:
      "Google Analytics : distingue les visites provenant d’un même navigateur pour compter les visiteurs.",
    duration: "13 mois",
    category: "Mesure d’audience, seulement avec ton accord",
  },
  {
    name: `_ga_${GA_MEASUREMENT_ID.replace("G-", "")}`,
    purpose: "Google Analytics : suit la visite en cours.",
    duration: "13 mois",
    category: "Mesure d’audience, seulement avec ton accord",
  },
];

export default async function CookiesPage() {
  const track = await getVisitorTrack();
  if (track === "fr") {
    return (
      <LegalTemplate track={track} title="Politique relative aux cookies" updated="10 octobre 2026">
        <p>
          Cette page explique quels cookies {new URL(SITE_URL).host} utilise, pourquoi et comment
          modifier ton choix à tout moment. Le reste des informations sur tes données personnelles
          figure dans notre <Link href="/privacy-policy">politique de confidentialité</Link>.
        </p>
        <h2>En bref</h2>
        <ul>
          <li>
            Sans ton accord, nous ne conservons que ton choix de cookies et, si tu te connectes à la
            bêta, ce qui te permet de rester connecté.
          </li>
          <li>
            Les cookies Google Analytics ne sont créés que si tu cliques sur « Tout accepter » ou
            actives la mesure d’audience dans les réglages.
          </li>
          <li>Nous n’utilisons pas de cookies publicitaires.</li>
        </ul>
        <h2>Cookies utilisés</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border-strong">
                <th className="py-3 pr-4 font-bold">Nom</th>
                <th className="py-3 pr-4 font-bold">Finalité</th>
                <th className="py-3 pr-4 font-bold">Durée</th>
                <th className="py-3 font-bold">Catégorie</th>
              </tr>
            </thead>
            <tbody>
              {FR_COOKIES.map((cookie) => (
                <tr key={cookie.name} className="border-b border-border align-top">
                  <td className="py-3 pr-4 font-mono text-foreground">{cookie.name}</td>
                  <td className="py-3 pr-4 leading-relaxed text-muted-foreground">
                    {cookie.purpose}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">
                    {cookie.duration}
                  </td>
                  <td className="py-3 text-muted-foreground">{cookie.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2>Google Analytics</h2>
        <p>
          Google Analytics est fourni par Google Ireland Limited. Il nous indique combien de
          personnes visitent {BRAND}, quelles pages elles consultent et quelles fonctionnalités
          elles utilisent, comme un choix dans un exercice. Ses cookies durent au plus 13 mois et ne
          sont pas renouvelés à chaque visite. Google Signals et la personnalisation publicitaire
          sont désactivés. Google peut traiter ces données hors de l’Union européenne ; consulte la{" "}
          <a href="https://policies.google.com/privacy">politique de confidentialité de Google</a>.
        </p>
        <h2>Modifier ton choix</h2>
        <p>
          Clique sur « Cookies » en bas de chaque page ou utilise le bouton ci-dessous. Si tu
          retires ton consentement, la page se recharge et Google Analytics ne se charge plus. Tu
          peux aussi supprimer les cookies dans les réglages de ton navigateur.
        </p>
        <ConsentDialogLink asChild>
          <Button
            variant="outline"
            size="lg"
            className="mt-6 border-border-strong bg-surface hover:bg-muted"
          >
            Ouvrir les réglages des cookies
          </Button>
        </ConsentDialogLink>
        <h2>Contact</h2>
        <p>
          Pour toute question sur cette politique ou tes données :{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalTemplate>
    );
  }
  return (
    <LegalTemplate track={track} title="Cookie policy" updated="10 October 2026">
      <p>
        This page explains which cookies {new URL(SITE_URL).host} uses, why, and how to change your
        choice at any time. Everything else about your personal data is in our{" "}
        <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>In short</h2>
      <ul>
        <li>
          Without your permission, we only store your cookie choice and, when you sign in to the
          beta, what keeps you signed in.
        </li>
        <li>
          Google Analytics cookies are set only if you click “Accept all” or turn on Analytics in
          the cookie settings.
        </li>
        <li>We don’t use advertising cookies.</li>
      </ul>

      <h2>Cookies we use</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border-strong">
              <th className="py-3 pr-4 font-bold">Name</th>
              <th className="py-3 pr-4 font-bold">Purpose</th>
              <th className="py-3 pr-4 font-bold">Kept for</th>
              <th className="py-3 font-bold">Category</th>
            </tr>
          </thead>
          <tbody>
            {COOKIES.map((cookie) => (
              <tr key={cookie.name} className="border-b border-border align-top">
                <td className="py-3 pr-4 font-mono text-foreground">{cookie.name}</td>
                <td className="py-3 pr-4 leading-relaxed text-muted-foreground">
                  {cookie.purpose}
                </td>
                <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">
                  {cookie.duration}
                </td>
                <td className="py-3 text-muted-foreground">{cookie.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Google Analytics</h2>
      <p>
        Google Analytics is provided by Google Ireland Limited. It tells us how many people visit{" "}
        {BRAND}, which pages they read and which features they use, such as the practice decision.
        Its cookies last 13 months at most and are not renewed on each visit. Google signals and ad
        personalisation are turned off. Google may process this data outside the European Union; see{" "}
        <a href="https://policies.google.com/privacy">Google’s privacy policy</a>.
      </p>

      <h2>Change your choice</h2>
      <p>
        Click “Cookies” at the bottom of every page, or use the button below. If you withdraw your
        consent, the page reloads and Google Analytics no longer loads. You can also delete cookies
        from your browser settings.
      </p>
      <ConsentDialogLink asChild>
        <Button
          variant="outline"
          size="lg"
          className="mt-6 border-border-strong bg-surface hover:bg-muted"
        >
          Open cookie settings
        </Button>
      </ConsentDialogLink>

      <h2>Contact</h2>
      <p>
        Questions about this policy or your data:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalTemplate>
  );
}
