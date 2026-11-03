import Link from 'next/link';
import Image from 'next/image';
import {story,chapters,href} from '../lib/content';
import Scene from '../components/Scene';
export default function Home(){return <>
<section className="hero">
 <div className="hero-copy"><p className="eyebrow">Một câu chuyện đi qua gần một thế kỷ</p><h1>Ngày mai,<br/><em>mình sẽ…</em></h1><p className="intro">Có những thời kỳ, được nghĩ về ngày mai<br className="desktop-break"/> đã là một điều không hề bình thường.</p><Link className="cta" href="#PRO_S01">Mở trang đầu tiên <span>↗</span></Link><p className="hero-note">12 chương <span>·</span> 55 lát cắt <span>·</span> Một ngày mai</p></div>
 <div className="window-art"><Image priority unoptimized src={`${process.env.NEXT_PUBLIC_BASE_PATH||''}/art/tomorrow.svg`} width="640" height="760" alt="Minh họa đồ họa: qua khung cửa, mặt trời lên trên những mái nhà và trang vở đang mở."/><span className="art-caption">Minh họa biểu tượng · Không phải ảnh tư liệu</span><div className="window-tag">Một buổi sáng<br/><strong>2026</strong></div></div>
 <div className="hero-rail"><span>1930</span><i/><span>1945</span><i/><span>1954</span><i/><span>1975</span><i/><span>1986</span><i/><span>2026</span></div>
</section>
<section className="opening"><div className="opening-margin"><p className="eyebrow">Mở đầu</p><span className="margin-year">20<br/>26</span><p>Một câu hỏi nhỏ.<br/>Một hành trình dài.</p></div><div className="opening-text"><p className="opening-question">“Mẹ ơi…<br/>hòa bình là gì?”</p><p className="fiction-caption">Đối thoại hư cấu trong kịch bản</p>{story.scenes.filter(s=>s.id.startsWith('PRO')).map(s=><Scene key={s.id} scene={s}/>)}<Link className="cta" href={href(chapters[0].slug)}>Đi đến chương đầu <span>→</span></Link></div></section>
<section className="journey"><div><p className="eyebrow">Những trang tiếp theo</p><h2>Mỗi thời kỳ.<br/><em>Một câu hỏi để mang theo.</em></h2><Link href="/story/">Xem toàn bộ 12 chương ↗</Link></div><div className="journey-list">{[chapters[0],chapters[6],chapters[11]].map(c=><Link href={href(c.slug)} key={c.id}><span>{c.id}</span><div><small>{c.period}</small><h3>{c.title.toLocaleLowerCase('vi')}</h3></div><b>↗</b></Link>)}</div></section>
</>}
