export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const sourceLinks=(ids,data)=>ids.map(id=>{const s=data.sources.find(s=>s.id===id);return s?`<a href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.publisher)} · ${esc(s.title)} ↗</a>`:''}).join('');
export const button=(action,text,extra='')=>`<button data-action="${action}" ${extra}>${text}</button>`;
