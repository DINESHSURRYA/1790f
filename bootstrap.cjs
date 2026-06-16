const fs = require('fs');
fs.mkdirSync('src/slides', {recursive: true});
const slides = ['IntroSlide', 'VisualExampleSlide', 'BruteForceSlide', 'ObservationSlide', 'GraphSlide', 'TreeSlide', 'OptimalSlide', 'DryRunSlide', 'CodeSlide', 'ComplexitySlide', 'ProofSlide', 'UniqueSlide', 'InterviewSlide', 'EdgeCasesSlide', 'PlaygroundSlide', 'Visual3DSlide', 'SummarySlide'];
slides.forEach(s => {
    fs.writeFileSync('src/slides/'+s+'.jsx', 
`import React from 'react';
export default function ${s}() { 
    return (
        <div className="slide">
            <h1 className="title">${s.replace('Slide','')}</h1>
            <div className="content-box">Content for ${s}</div>
        </div>
    ); 
}`);
});
console.log('Bootstrapped ' + slides.length + ' slides.');
