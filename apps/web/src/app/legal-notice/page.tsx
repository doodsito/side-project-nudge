import type { Metadata } from "next";
import Link from "next/link";
import { LegalTemplate } from "@/components/layout/legal-template";
import { BRAND, CONTACT_EMAIL, PUBLISHER, SITE_URL } from "@/lib/brand";
import { getVisitorTrack } from "@/lib/auth";
import { llmsTxtAlternate } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await getVisitorTrack()) === "fr";
  return {
    title: `${fr ? "Mentions légales" : "Legal Notice"} | ${BRAND}`,
    description: fr
      ? `Qui édite et héberge ${BRAND}, et comment nous contacter.`
      : `Who publishes and hosts ${BRAND}, and how to contact us.`,
    alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/legal-notice` },
  };
}

export default async function LegalNoticePage() {
  const track = await getVisitorTrack();
  if (track === "fr") {
    return (
      <LegalTemplate track={track} title="Mentions légales" updated="1er octobre 2026">
        <p>
          Cette page indique qui édite et héberge {new URL(SITE_URL).host}, conformément à la loi
          pour la confiance dans l’économie numérique.
        </p>
        <h2>Éditeur</h2>
        <p>
          {BRAND} est édité par {PUBLISHER}, à titre individuel et non professionnel. {PUBLISHER}{" "}
          est également responsable de la publication.
        </p>
        <p>
          Contact : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723,
          États-Unis (<a href="https://vercel.com">vercel.com</a>).
        </p>
        <h2>Éducation, pas conseil</h2>
        <p>
          {BRAND} est un projet pédagogique. Il ne fournit pas de conseil en investissement, ne
          recommande aucun produit financier et ne promet aucun rendement. Il n’est pas un
          conseiller financier réglementé. Les exercices utilisent des situations fictives et de
          l’argent virtuel. Consulte les{" "}
          <Link href="/terms-of-service">conditions d’utilisation</Link> pour plus de détails.
        </p>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, le design, le logo et le code de {BRAND} appartiennent aux auteurs de {BRAND}.
          Tous droits réservés. Tu peux citer de courts extraits avec un lien vers la source ; toute
          autre utilisation nécessite notre accord écrit.
        </p>
        <h2>Données personnelles et cookies</h2>
        <p>
          Le traitement des données personnelles est expliqué dans la{" "}
          <Link href="/privacy-policy">politique de confidentialité</Link>, et les cookies utilisés
          dans la <Link href="/cookies">politique relative aux cookies</Link>.
        </p>
      </LegalTemplate>
    );
  }
  return (
    <LegalTemplate track={track} title="Legal notice" updated="1 October 2026">
      <p>
        This page says who publishes {new URL(SITE_URL).host} and who hosts it, as French law
        requires (Loi pour la confiance dans l’économie numérique).
      </p>

      <h2>Publisher</h2>
      <p>
        {BRAND} is published by {PUBLISHER}, an individual, on a non-professional basis. {PUBLISHER}{" "}
        is also the publication director.
      </p>
      <p>
        Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>Hosting</h2>
      <p>
        The site is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United
        States (<a href="https://vercel.com">vercel.com</a>).
      </p>

      <h2>Education, not advice</h2>
      <p>
        {BRAND} is an educational project. It does not give investment advice, recommend any
        financial product or promise any return, and it is not a regulated financial adviser. The
        practice uses fictional situations and virtual money. Read the{" "}
        <Link href="/terms-of-service">terms of service</Link> for details.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The texts, design, logo and code of {BRAND} belong to the {BRAND} authors. All rights
        reserved. You may quote short extracts with a link to the source; anything else needs our
        written permission.
      </p>

      <h2>Personal data and cookies</h2>
      <p>
        How we handle personal data is explained in the{" "}
        <Link href="/privacy-policy">privacy policy</Link>, and which cookies we use in the{" "}
        <Link href="/cookies">cookie policy</Link>.
      </p>
    </LegalTemplate>
  );
}
