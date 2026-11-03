import {story,chapters} from '../src/lib/content';
import {assertPublishable} from '../src/lib/schema';
if(story.scenes.length!==55||chapters.length!==12)throw Error('Expected 55 scenes and 12 chapters');
const mapped=chapters.flatMap(c=>c.sceneIds);const ids=new Set(story.scenes.map(s=>s.id));
if(new Set(mapped).size!==mapped.length||mapped.some(id=>!ids.has(id)))throw Error('Invalid chapter scene mapping');
for(const c of chapters)for(const id of c.sceneIds)if(story.scenes.find(s=>s.id===id)?.chapter_id!==c.id)throw Error('Wrong chapter');
if(process.env.RELEASE_MODE==='production')assertPublishable({scenes:story.scenes.map(s=>({id:s.id,chapterId:s.chapter_id,title:s.title,periodLabel:s.period_label,narrative:{narrator:s.narration,dialogue:[]},presentation:{template:'plain',mediaIds:s.assets,motionPreset:'none'},history:{claimIds:s.historical_claim_ids,fictionDisclosure:true},status:s.status})),claims:[],sources:[],media:[]});
console.log('Validated 55 scenes / 12 chapters. DRAFT preview; release approvals pending.');
