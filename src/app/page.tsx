// default page
import Navigation from '@/components/navigation'
import { 
  HeroSection,
  AboutSection,
  WorkSection,
  ProjectsSection,
  ToolsSection,
  ContactSection
} from '@/components/sections'

export default function Home() {
  const sections = ['home', 'about', 'work', 'projects', 'tools', 'contact']

  return (
    <div className="bg-gradient-to-br from-zinc-50 via-amber-50/10 to-zinc-50">
      <Navigation sections={sections} />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ProjectsSection />
        <ToolsSection />
        <ContactSection />
      </main>
    </div>
  )
}