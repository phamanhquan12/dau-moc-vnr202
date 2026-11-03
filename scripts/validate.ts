import {episodes,sources,parseSave} from '../src/lib/game';
if(episodes.length!==5||new Set(episodes.map(e=>e.id)).size!==5)throw Error('Expected five unique episodes');
for(const e of episodes){if(e.steps.length!==3||!e.intro||!e.outcome||!e.context||!e.boundary||!e.bridge||e.sourceIds.length===0)throw Error('Incomplete episode '+e.id);if(e.sourceIds.some(id=>!sources.some(s=>s.id===id)))throw Error('Missing source '+e.id)}
if(parseSave('broken')!==null)throw Error('Unsafe save parser');console.log('Validated five complete episodes, evidence links, transitions and save boundary.');
