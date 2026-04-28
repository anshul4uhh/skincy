import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop";
import App from "./app/App";
import { AboutUs } from "./app/pages/AboutUs";
import { Research } from "./app/pages/Research";
import { Blog } from "./app/pages/Blog";
import { FAQ } from "./app/pages/FAQ";
import { PrivacyPolicy } from "./app/pages/PrivacyPolicy";
import { TermsOfService } from "./app/pages/TermsOfService";
import { ContactSupport } from "./app/pages/ContactSupport";
import { HealthcareProviders } from "./app/pages/HealthcareProviders";
import { APIDocumentation } from "./app/pages/APIDocumentation";
import { HIPAACompliance } from "./app/pages/HIPAACompliance";
import { Features } from "./app/pages/Features";
import { HowItWorks } from "./app/pages/HowItWorks";

export default function Root() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/research" element={<Research />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<ContactSupport />} />
        <Route path="/healthcare-providers" element={<HealthcareProviders />} />
        <Route path="/api" element={<APIDocumentation />} />
        <Route path="/hipaa" element={<HIPAACompliance />} />
      </Routes>
    </BrowserRouter>
  );
}
