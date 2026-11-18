import { MarketingTemplate } from "@/components/layout/marketing-template";
import { LandingPreview } from "@/components/marketing/landing-preview";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";

export const metadata = {
  title: `Aperçu des héros · ${BRAND}`,
  robots: { index: false, follow: false },
};

export default function LandingPreviewPage() {
  const dictionary = getDictionary("fr");

  return (
    <MarketingTemplate track="fr" t={dictionary} navVariant="pill">
      <div className="min-h-screen">
        <LandingPreview
          faq={dictionary.faq}
          closingCopy={dictionary.previewClosingCta}
          credibility={dictionary.previewCredibility}
          companion={dictionary.previewCompanion}
          curriculum={dictionary.previewCurriculum}
          testimonialSource={dictionary.previewTestimonialsSource}
        />
      </div>
    </MarketingTemplate>
  );
}
