import { type ReactNode } from "react";
import { Footer } from "@/components/organisms/footer";
import { Navbar } from "@/components/organisms/navbar";

export function MarketingTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
