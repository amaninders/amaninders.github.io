export default function Experience() {
    const experience = [
        {
           period: "2023-Present",
           title: "Technical Solutions Engineer",
           company: "Applied Systems"
        },
        {
           period: "2021-2023", 
           title: "CPQ Configuration Specialist",
           company: "ServicePath"
        },
        {
           period: "2018-2021",
           title: "L2 Software Support Engineer", 
           company: "Crossover"
        },
         {
             period: "2014-2018",
             title: "Technical Support Engineer",
             company: "Kayako"
         },
         {
             period: "2013-2014",
             title: "Technical Support Engineer",
             company: "Dell"
         }
     ]

    return (
        <div>
            <h3 className="pb-4 font-bold">experience</h3>
            <ul>
               {experience.map((item) => (
                  <li key={item.company} className="pb-4">
                     <p>{item.title}</p>
                     <p className="italic">{item.company} ({item.period})</p>
                  </li>
               ))}
            </ul>
         </div>
    );
}