import type { Metadata } from "next";
import Link from "next/link";
import { LegalTemplate } from "@/components/layout/legal-template";
import { BRAND, CONTACT_EMAIL, SITE_URL } from "@/lib/brand";
import { getVisitorTrack } from "@/lib/auth";
import { llmsTxtAlternate } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await getVisitorTrack()) === "fr";
  return {
    title: `${fr ? "Conditions d’utilisation" : "Terms of Service"} | ${BRAND}`,
    description: fr
      ? `Les règles d’utilisation de ${BRAND}, un projet pédagogique qui ne fournit pas de conseil en investissement.`
      : `The rules for using ${BRAND}: an educational project, never investment advice.`,
    alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/terms-of-service` },
  };
}

export default async function TermsOfServicePage() {
  const track = await getVisitorTrack();
  if (track === "fr") {
    return (
      <LegalTemplate track={track} title="Conditions d’utilisation" updated="2 octobre 2026">
        <p>
          Ces conditions s’appliquent lorsque tu utilises {new URL(SITE_URL).host}. En utilisant le
          site, tu les acceptes. Si tu n’es pas d’accord, n’utilise pas le site.
        </p>
        <h2>Qu’est-ce que {BRAND} ?</h2>
        <p>
          {BRAND} est un projet pédagogique. Il permet de s’exercer à prendre des décisions
          d’investissement dans des situations fictives avec de l’argent virtuel, puis explique le
          raisonnement derrière les choix. Le site est gratuit. La bêta nécessite un compte et un
          code d’accès ; le reste du site est accessible sans compte. {BRAND} n’est pas encore lancé
          : cette première version peut changer ou s’arrêter à tout moment.
        </p>
        <h2>Éducation, pas conseil</h2>
        <p>
          Aucun contenu de {BRAND} ne constitue un conseil en investissement, financier, fiscal ou
          juridique, ni une recommandation d’achat ou de vente d’un produit financier. {BRAND}
          n’évalue pas si un investissement te convient et n’est pas un conseiller financier
          réglementé. Les situations, prix et résultats des exercices sont fictifs ou simplifiés ;
          les performances passées ne préjugent pas des résultats futurs.
        </p>
        <p>
          Investir comporte des risques, y compris la perte possible du capital. Avant d’investir de
          l’argent réel, prends le temps de comprendre ces risques et envisage de consulter un
          professionnel agréé.
        </p>
        <h2>Argent virtuel uniquement</h2>
        <p>
          Tu ne peux pas déposer, investir ou retirer de l’argent réel sur {BRAND}. Les résultats
          virtuels n’ont aucune valeur monétaire.
        </p>
        <h2>Liste d’accès anticipé</h2>
        <p>
          Tu peux rejoindre la liste d’accès anticipé si tu as au moins 15 ans, avec une adresse
          e-mail qui t’appartient. Nous l’utilisons comme décrit dans la{" "}
          <Link href="/privacy-policy">politique de confidentialité</Link>. Tu peux quitter la liste
          à tout moment en écrivant à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <h2>Ton compte bêta</h2>
        <p>
          La bêta est accessible sur invitation : il faut un code d’accès de l’équipe {BRAND} et
          avoir au moins 15 ans. Utilise une adresse e-mail ou un compte Google qui t’appartient,
          garde ton mot de passe pour toi et protège cette adresse : toute personne qui peut lire
          tes e-mails peut réinitialiser ton mot de passe. Ne partage pas ton code d’accès sans
          notre autorisation.
        </p>
        <p>
          Tu peux supprimer ton compte à tout moment en écrivant à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> depuis l’adresse e-mail du compte.
          Nous pouvons fermer un compte qui enfreint ces conditions, ou mettre fin à la bêta, et
          nous t’en informerons d’abord par e-mail lorsque c’est possible.
        </p>
        <h2>Utilisation du site</h2>
        <p>
          N’essaie pas d’endommager ou de surcharger le site, ni de contourner sa sécurité. Les
          moteurs de recherche, robots d’exploration et systèmes d’IA peuvent lire les pages
          publiques dans le respect de notre <a href="/robots.txt">robots.txt</a>.
        </p>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, le design, le logo et le code de {BRAND} appartiennent aux auteurs de {BRAND}.
          Tous droits réservés. Tu peux citer de courts extraits avec un lien vers la source ; toute
          autre utilisation nécessite notre accord écrit. Les moteurs de recherche et systèmes d’IA
          peuvent indexer, citer et apprendre à partir des pages publiques.
        </p>
        <h2>Disponibilité et exactitude</h2>
        <p>
          Nous faisons de notre mieux pour garder le site accessible et son contenu exact, mais nous
          ne pouvons garantir ni l’un ni l’autre. Le contenu peut comporter des erreurs ou devenir
          obsolète.
        </p>
        <h2>Responsabilité</h2>
        <p>
          {BRAND} est fourni gratuitement et en l’état. Dans les limites permises par la loi, nous
          ne sommes pas responsables des décisions que tu prends, y compris en matière
          d’investissement, sur la base de ce que tu lis ou pratiques sur le site. Ces conditions ne
          limitent aucune responsabilité que la loi interdit de limiter.
        </p>
        <h2>Liens vers d’autres sites</h2>
        <p>
          Nous proposons des liens vers d’autres sites par commodité et ne répondons pas de leur
          contenu.
        </p>
        <h2>Modification des conditions</h2>
        <p>
          Nous pouvons mettre à jour ces conditions. La date en haut de cette page indique la
          dernière version ; la version applicable est celle publiée lorsque tu utilises le site.
        </p>
        <h2>Droit applicable et litiges</h2>
        <p>
          Ces conditions sont régies par le droit français. En cas de désaccord, écris-nous d’abord
          pour essayer de le résoudre. Si ce n’est pas possible, les tribunaux français trancheront,
          sans porter atteinte aux droits dont tu disposes en tant que consommateur dans ton pays de
          résidence.
        </p>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Les coordonnées de l’éditeur se
          trouvent dans les <Link href="/legal-notice">mentions légales</Link>.
        </p>
      </LegalTemplate>
    );
  }
  return (
    <LegalTemplate track={track} title="Terms of service" updated="2 October 2026">
      <p>
        These terms apply when you use {new URL(SITE_URL).host}. By using the site, you accept them.
        If you don’t agree, please don’t use the site.
      </p>

      <h2>What {BRAND} is</h2>
      <p>
        {BRAND} is an educational project. It lets you practise investing decisions with fictional
        situations and virtual money, then explains the reasoning behind your choices. The site is
        free. The beta needs an account and an access code; the rest of the site needs no account.{" "}
        {BRAND} has not launched yet: this early version may change or stop at any time.
      </p>

      <h2>Education, not advice</h2>
      <p>
        Nothing on {BRAND} is investment, financial, tax or legal advice, or a recommendation to buy
        or sell any financial product. {BRAND} does not assess whether an investment suits you and
        is not a regulated financial adviser. Situations, prices and results in the practice are
        fictional or simplified, and past performance does not predict future results.
      </p>
      <p>
        Investing involves risk, including the possible loss of capital. Before investing real
        money, take the time to understand the risks, and consider talking to a licensed
        professional.
      </p>

      <h2>Virtual money only</h2>
      <p>
        You cannot deposit, invest or withdraw real money on {BRAND}. Virtual results have no cash
        value.
      </p>

      <h2>Early access list</h2>
      <p>
        You can join the early access list if you are at least 15, with an email address that is
        yours. We use it as described in the <Link href="/privacy-policy">privacy policy</Link>, and
        you can leave the list at any time by writing to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Your beta account</h2>
      <p>
        The beta is by invitation: you need an access code from the {BRAND} team, and you must be at
        least 15. Use an email address or a Google account that is yours, keep your password to
        yourself, and keep that email secure: anyone who can read it can reset your password. Please
        don’t share your access code without our permission.
      </p>
      <p>
        You can delete your account at any time by writing to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from its email address. We may close
        an account that breaks these terms, or close the beta, and we will tell you by email first
        when we can.
      </p>

      <h2>Using the site</h2>
      <p>
        Please don’t try to break the site, overload it or get around its security. Search engines,
        crawlers and AI systems are welcome to read the public pages, within the rules of our{" "}
        <a href="/robots.txt">robots.txt</a>.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The texts, design, logo and code of {BRAND} belong to the {BRAND} authors. All rights
        reserved. You may quote short extracts with a link to the source; anything else needs our
        written permission. Search engines and AI systems may index, quote and learn from the public
        pages.
      </p>

      <h2>Availability and accuracy</h2>
      <p>
        We do our best to keep the site available and its content accurate, but we can’t guarantee
        either. Content may contain errors or become outdated.
      </p>

      <h2>Liability</h2>
      <p>
        {BRAND} is provided free of charge and as is. To the extent the law allows, we are not
        liable for decisions you make, including investment decisions, based on what you read or
        practise on the site. Nothing in these terms limits any liability that the law does not
        allow us to limit.
      </p>

      <h2>Links to other sites</h2>
      <p>We link to other sites for convenience and are not responsible for their content.</p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. The date at the top of this page shows the latest version, and
        the version that applies is the one published when you use the site.
      </p>

      <h2>Law and disputes</h2>
      <p>
        These terms are governed by French law. If a disagreement arises, please write to us first
        so we can try to settle it. If we can’t, the French courts will decide, without affecting
        any rights you have as a consumer in the country where you live.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. The publisher’s details are in the{" "}
        <Link href="/legal-notice">legal notice</Link>.
      </p>
    </LegalTemplate>
  );
}
