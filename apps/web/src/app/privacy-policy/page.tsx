import type { Metadata } from "next";
import Link from "next/link";
import { LegalTemplate } from "@/components/layout/legal-template";
import { BRAND, CONTACT_EMAIL, PUBLISHER, SITE_URL } from "@/lib/brand";
import { getVisitorTrack } from "@/lib/auth";
import { llmsTxtAlternate } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await getVisitorTrack()) === "fr";
  return {
    title: `${fr ? "Politique de confidentialité" : "Privacy Policy"} | ${BRAND}`,
    description: fr
      ? `Quelles données personnelles ${BRAND} recueille, pourquoi, combien de temps elles sont conservées et comment exercer tes droits.`
      : `What personal data ${BRAND} collects, why, how long we keep it and how to use your rights.`,
    alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/privacy-policy` },
  };
}

export default async function PrivacyPolicyPage() {
  const track = await getVisitorTrack();
  const contact = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  if (track === "fr") {
    return (
      <LegalTemplate track={track} title="Politique de confidentialité" updated="3 novembre 2026">
        <p>
          Cette politique explique quelles données personnelles {BRAND} recueille sur{" "}
          {new URL(SITE_URL).host}, pourquoi, combien de temps nous les conservons et comment
          exercer tes droits. Nous ne vendons jamais tes données et ne les utilisons pas pour la
          publicité.
        </p>
        <h2>Responsable du traitement</h2>
        <p>
          Le responsable du traitement est {PUBLISHER}, qui édite {BRAND} à titre individuel (voir
          les <Link href="/legal-notice">mentions légales</Link>). Pour toute question sur tes
          données, écris à {contact}.
        </p>
        <h2>Données recueillies et finalités</h2>
        <ul>
          <li>
            <strong>Liste d’accès anticipé.</strong> Lorsque tu t’inscris, nous conservons ton
            adresse e-mail, le profil choisi (étudiant, jeune actif ou autre), l’endroit du site où
            tu t’es inscrit et la date. Nous les utilisons uniquement pour te prévenir de
            l’ouverture de l’accès anticipé et du lancement de {BRAND} ; le profil nous aide à
            comprendre qui s’intéresse au projet. Base légale : ton consentement, donné en envoyant
            le formulaire.
          </li>
          <li>
            <strong>Ton compte bêta.</strong> Lorsque tu crées un compte avec un code d’accès, nous
            conservons ton adresse e-mail, ton mode de connexion (mot de passe ou Google), le code
            utilisé, la date de ton inscription et celle de ta dernière connexion. Ton mot de passe
            est conservé uniquement sous forme hachée, illisible même pour nous. Si tu utilises
            Google, celui-ci nous transmet aussi ton nom et ta photo de profil. Ces données servent
            uniquement à te connecter et à utiliser la bêta. Base légale : les conditions que tu
            acceptes lors de la création du compte.
          </li>
          <li>
            <strong>Tes retours.</strong> Lorsque tu envoies un retour depuis le tableau de bord ou
            réponds au questionnaire de la bêta, nous conservons tes réponses, ton message écrit ou
            ton enregistrement vocal, sa catégorie, ton compte et la date. Si tu laisses ton nom à
            la fin du questionnaire, nous le conservons pour te recontacter. Nous les utilisons
            uniquement pour améliorer {BRAND}. Le micro s’active seulement après ton autorisation,
            quand tu lances un enregistrement. Base légale : ton consentement, donné en envoyant le
            retour.
          </li>
          <li>
            <strong>Mesure d’audience.</strong> Si tu acceptes les cookies analytiques, Google
            Analytics enregistre ta visite : pages consultées, fonctionnalités utilisées (comme ton
            choix dans un exercice ou le profil choisi pour rejoindre la liste, jamais ton e-mail),
            localisation approximative, appareil et navigateur. Base légale : ton consentement. Les
            détails figurent dans la <Link href="/cookies">politique relative aux cookies</Link>.
          </li>
          <li>
            <strong>Ton choix de cookies.</strong> Nous le conservons dans un cookie et dans le
            stockage local de ton navigateur pour ne pas te reposer la question à chaque page. Il
            reste dans ton navigateur ; nous ne le recevons pas.
          </li>
          <li>
            <strong>Données techniques.</strong> Notre hébergeur, Vercel, traite des données
            techniques comme ton adresse IP, ton navigateur et les pages demandées pour afficher le
            site et le protéger contre les abus. Base légale : notre intérêt légitime à exploiter un
            site fonctionnel et sécurisé.
          </li>
        </ul>
        <p>
          Ce que tu saisis dans l’exercice reste dans l’onglet de ton navigateur et disparaît quand
          tu quittes la page : nous ne le conservons pas.
        </p>
        <h2>Destinataires</h2>
        <p>
          Seule l’équipe {BRAND} peut consulter la liste d’accès anticipé, les comptes et les
          retours. Ces prestataires traitent des données pour notre compte, dans le cadre d’un
          accord de sous-traitance :
        </p>
        <ul>
          <li>Vercel Inc., États-Unis : hébergement du site.</li>
          <li>
            Supabase : connexion, base de données de la liste d’accès anticipé, des comptes et des
            retours, et stockage des enregistrements vocaux, hébergés dans l’Union européenne
            (Paris).
          </li>
          <li>
            Google Ireland Limited : Google Analytics uniquement si tu l’acceptes, et connexion avec
            Google uniquement si tu la choisis.
          </li>
          <li>
            Resend, Inc., États-Unis : envoi des e-mails du compte (confirmation de l’adresse,
            réinitialisation du mot de passe) depuis des serveurs dans l’Union européenne (Irlande).
          </li>
        </ul>
        <h2>Transferts hors de l’Union européenne</h2>
        <p>
          Certains de ces prestataires peuvent traiter des données aux États-Unis. Ces transferts
          reposent sur la décision d’adéquation de la Commission européenne concernant le cadre de
          protection des données UE–États-Unis, ou sur ses clauses contractuelles types.
        </p>
        <h2>Durée de conservation</h2>
        <ul>
          <li>
            Liste d’accès anticipé : jusqu’à ta demande de retrait, et au plus 3 ans après ton
            inscription.
          </li>
          <li>Compte bêta et retours écrits : jusqu’à ta demande de suppression.</li>
          <li>Enregistrements vocaux : 12 mois au plus, ou jusqu’à ta demande de suppression.</li>
          <li>
            Google Analytics : ses cookies durent au plus 13 mois et les données recueillies sont
            conservées au plus 14 mois.
          </li>
          <li>Ton choix de cookies : 6 mois, puis nous te redemandons.</li>
          <li>
            Données techniques : pendant la courte durée nécessaire à Vercel pour exploiter et
            sécuriser le site.
          </li>
        </ul>
        <h2>Tes droits</h2>
        <p>
          Tu peux demander l’accès à tes données, leur rectification ou leur suppression, limiter
          leur utilisation ou t’y opposer, et les recevoir dans un format portable. Tu peux aussi
          donner des instructions sur le sort de tes données après ton décès. Lorsque le traitement
          repose sur ton consentement, tu peux le retirer à tout moment : pour quitter la liste
          d’accès anticipé ou supprimer ton compte, écris-nous depuis l’adresse concernée ; pour
          désactiver la mesure d’audience, clique sur « Cookies » en bas de n’importe quelle page.
        </p>
        <p>
          Pour exercer tes droits, écris à {contact}. Nous répondons sous un mois. Si tu estimes que
          tes droits ne sont pas respectés, tu peux saisir la CNIL, l’autorité française de
          protection des données (<a href="https://www.cnil.fr">cnil.fr</a>).
        </p>
        <h2>Mineurs</h2>
        <p>
          Tu dois avoir au moins 15 ans pour rejoindre la liste d’accès anticipé ou créer un compte
          : en dessous de cet âge, la loi française exige le consentement d’un parent. Le reste du
          site fonctionne sans fournir de données personnelles.
        </p>
        <h2>Modification de cette politique</h2>
        <p>
          Lorsque cette politique change, nous mettons à jour la date en haut de cette page. Si un
          changement concerne l’utilisation de ton e-mail, nous prévenons les personnes inscrites
          sur la liste d’accès anticipé avant son entrée en vigueur.
        </p>
      </LegalTemplate>
    );
  }
  return (
    <LegalTemplate track={track} title="Privacy policy" updated="3 November 2026">
      <p>
        This policy explains what personal data {BRAND} collects on {new URL(SITE_URL).host}, why,
        how long we keep it and how to use your rights. We never sell your data and never use it for
        advertising.
      </p>

      <h2>Who is responsible</h2>
      <p>
        The data controller is {PUBLISHER}, who publishes {BRAND} as an individual (see the{" "}
        <Link href="/legal-notice">legal notice</Link>). For anything about your data, write to{" "}
        {contact}.
      </p>

      <h2>What we collect and why</h2>
      <ul>
        <li>
          <strong>Early access list.</strong> When you join, we keep your email address, the profile
          you choose (student, young professional or other), where on the site you signed up and
          when. We use them only to tell you when early access opens and when {BRAND} launches; the
          profile helps us understand who is interested. Legal basis: your consent, given by
          submitting the form.
        </li>
        <li>
          <strong>Your beta account.</strong> When you create an account with an access code, we
          keep your email address, how you sign in (password or Google), the access code you used,
          when you joined and when you last signed in. Your password is stored only in a scrambled
          form (hashed) that nobody, us included, can read. If you sign in with Google, Google also
          shares your name and profile picture with us. We use this only to let you sign in and use
          the beta. Legal basis: the terms you accept when you create the account.
        </li>
        <li>
          <strong>Audience measurement.</strong> Only if you accept analytics cookies, Google
          Analytics records your visit: pages viewed, features used (such as the decision you make
          in the practice, or the profile you choose when you join the list, never your email),
          approximate location, device and browser. Legal basis: your consent. Details are in the{" "}
          <Link href="/cookies">cookie policy</Link>.
        </li>
        <li>
          <strong>Your feedback.</strong> When you send feedback from the dashboard or answer the
          beta survey, we keep your answers, written message or voice recording, any category, your
          account and the date. If you leave your name at the end of the survey, we keep it to get
          back to you. We use them only to improve {BRAND}. The microphone turns on only with your
          permission, when you start a recording. Legal basis: your consent, given by sending the
          feedback.
        </li>
        <li>
          <strong>Your cookie choice.</strong> We keep it in a cookie and in your browser’s local
          storage so we don’t ask on every page. It stays in your browser; we don’t receive it.
        </li>
        <li>
          <strong>Technical data.</strong> Our host, Vercel, processes technical data such as your
          IP address, browser and the pages requested, to deliver the site and protect it against
          abuse. Legal basis: our legitimate interest in running a working, secure site.
        </li>
      </ul>
      <p>
        What you enter in the practice stays in your browser tab and disappears when you leave the
        page: we don’t store it.
      </p>

      <h2>Who receives it</h2>
      <p>
        Only the {BRAND} team can see the early access list, the accounts and the feedback. These
        providers process data on our behalf, under a data processing agreement:
      </p>
      <ul>
        <li>Vercel Inc., United States: hosting of the site.</li>
        <li>
          Supabase: sign-in, the database of the early access list, the accounts and the feedback,
          and storage of voice recordings, kept in the European Union (Paris).
        </li>
        <li>
          Google Ireland Limited: Google Analytics, only if you accept it, and Google sign-in, only
          if you choose it.
        </li>
        <li>
          Resend, Inc., United States: sending of the account emails (confirming your address,
          resetting your password), from servers in the European Union (Ireland).
        </li>
      </ul>

      <h2>Transfers outside the European Union</h2>
      <p>
        Some of these providers may process data in the United States. These transfers rely on the
        European Commission’s adequacy decision for the EU-US Data Privacy Framework or on its
        standard contractual clauses.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          Early access list: until you ask us to remove you, and at most 3 years after you sign up.
        </li>
        <li>Beta account and written feedback: until you ask us to delete them.</li>
        <li>Voice recordings: 12 months at most, or until you ask us to delete them.</li>
        <li>
          Google Analytics: its cookies last 13 months at most, and the data it collects is kept 14
          months at most.
        </li>
        <li>Your cookie choice: 6 months, then we ask again.</li>
        <li>Technical data: for the short period Vercel needs to run and secure the site.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        You can ask to access, correct or delete your data, to restrict or object to its use, and to
        receive it in a portable format. You can also give instructions on what happens to your data
        after your death. Where we rely on your consent, you can withdraw it at any time: to leave
        the early access list or delete your account, email us from the address concerned; to turn
        off analytics, click “Cookies” at the bottom of any page.
      </p>
      <p>
        To use your rights, write to {contact}. We answer within one month. If you think your rights
        are not respected, you can complain to the CNIL, the French data protection authority (
        <a href="https://www.cnil.fr">cnil.fr</a>).
      </p>

      <h2>Children</h2>
      <p>
        You must be at least 15 to join the early access list or create an account: below that age,
        French law requires a parent’s consent. The rest of the site works without giving any
        personal data.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        When this policy changes, we update the date at the top of this page. If a change affects
        how we use your email, we tell the people on the early access list before it applies.
      </p>
    </LegalTemplate>
  );
}
