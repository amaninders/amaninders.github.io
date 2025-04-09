// About Component
export default function Intro() {
   const data = {
      name: "Amaninder Singh",
      links: [
         { text: "contact", href: "https://www.linkedin.com/in/amaninders/", target: "_blank" },
         { text: "resume", href: "/resume", target: "_blank" },
      ],
      bio: [
         "Hello! I'm Amaninder, a Solutions and Implementation Engineer with full-stack technical expertise and a talent for translating complex requirements into elegant implementations. ",
         "My goal is to leverage my position at the intersection of technology and business to deliver solutions that enhance functionality while addressing precise client requirements.",
         "I live in Ontario, Canada."
      ],
   }
   
    return (
      <section className="container grid items-center gap-6 pt-6 md:py-10">
         <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
               {data.name}
            </h1>
            <div className="flex gap-8 py-8">
               {data.links.map((link) => (
                  <a key={link.text} className="font-bold hover:underline decoration-dotted underline-offset-8" href={link.href} target={link.target} rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline h-4 w-4">
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                     </svg>
                     {link.text}
                  </a>
               ))}
            </div>
            <div className="max-w-[700px] text-base">
               {data.bio.map((paragraph, index) => (
                  <p key={index} className="pb-2">{paragraph}</p>
               ))}
            </div>
         </div>
      </section>
    );
  }