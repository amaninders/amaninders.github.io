// Projects Component
export default function Projects() {
    const projects = [
        {
            name: "M365 Tools",
            description: "A collection of productivity tools for Microsoft 365 users.",
            link: "https://www.amaninder.com/microsoft-tools/",
            svg: "/nextJs.svg",
        },
        {
            name: "PDF Joiner",
            description: "A simple tool to merge multiple PDF files into a single document.",
            link: "https://www.amaninder.com/pdf/",
            svg: "/WebAssembly.svg"
        },
        {
            name: "Image to PDF",
            description: "Convert images to PDF files with this online tool.",
            link: "https://www.amaninder.com/imagetopdf/",
            svg: "/WebAssembly.svg"

        }        
    ]

    return (
      <div>
        <h3 className="pb-4 font-bold">some personal projects</h3>
        {projects.map((project) => (
          <div key={project.name} className="pb-4">
            <div>
              <div className="border-b border-b-slate-200 dark:border-b-slate-700">
                <a className="flex" href={project.link} target="_blank" rel="noopener noreferrer">
                  <button className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline size-4">
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                    {project.name}
                    {project.svg && (
                      <img src={project.svg} alt={project.name} className="inline size-6" />
                    )}
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
    );
  }
  