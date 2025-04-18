import Experience from './Experience';
import TechStack from './TechStack';
import SkillsTools from './SkillsTools';
import Projects from './Projects';
export default function About() {
    return (
      <section className="container grid gap-5 pt-6 md:py-10">
         <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">about.</h2>
         </div>
         <article className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
            <Experience /> 
            <TechStack />
            <SkillsTools />
            <Projects />
         </article>
      </section>
    );
  }