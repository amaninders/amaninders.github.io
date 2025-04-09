export default function TechStack() {
    return (
        <div>
            <h3 className="pb-4 font-bold">core skills</h3>
            <ul>
                {/* languages */}
               <li className="underline">Languages</li>
               <li>Python | Ruby | C | PHP</li>
               <li className="pb-4">TypeScript | JavaScript</li>
               {/* frameworks */}
               <li className="underline">Frameworks</li>
               <li>Node.js | Next.js | React</li>
               <li className="pb-4">Express.js | Ruby on Rails</li>
                {/* AI Specific */}
               <li className="underline">AI</li>
                <li>LangChain | OpenAI API</li>
                <li>HuggingFace | TensorFlow | n8n</li>
            </ul>   
         </div>
    );
}