import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AboutSection } from "./components/AboutSection";
import { CertificatesSection } from "./components/CertificatesSection";
import { ContactSection } from "./components/ContactSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { FooterSection } from "./components/FooterSection";
import { HackathonSection } from "./components/HackathonSection";
import { HeroSection } from "./components/HeroSection";
import { NavBar } from "./components/NavBar";
import { NeuralLoadingOverlay } from "./components/NeuralLoadingOverlay";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen font-body bg-background text-foreground">
          <NeuralLoadingOverlay />
          <NavBar />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <HackathonSection />
            <CertificatesSection />
            <ContactSection />
          </main>
          <FooterSection />
          <Toaster />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
