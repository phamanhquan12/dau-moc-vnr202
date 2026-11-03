import type { Chapter } from "../domain/types";
import { ArchiveImage } from "./ArchiveImage";

const journeys = [
  {
    chapter: 1 as Chapter,
    range: "1920–1945",
    title: "Tìm đường. Giành độc lập.",
    image: "tours",
    caption: "Đại hội Tours · 1920",
    text: "Từ hành trình tìm đường cứu nước của Nguyễn Ái Quốc, sự ra đời của Đảng đến Cách mạng Tháng Tám và nhà nước Việt Nam Dân chủ Cộng hòa.",
  },
  {
    chapter: 2 as Chapter,
    range: "1945–1975",
    title: "Kháng chiến. Thống nhất.",
    image: "dien-bien",
    caption: "Điện Biên Phủ · tư liệu 1954",
    text: "Bảo vệ nền độc lập; tìm hiểu hai nhiệm vụ chiến lược ở hai miền và sự kết hợp giữa đấu tranh quân sự, chính trị, ngoại giao.",
  },
  {
    chapter: 3 as Chapter,
    range: "1975–2018",
    title: "Xây dựng. Đổi mới. Hội nhập.",
    image: "national-assembly",
    caption: "Nhà Quốc hội · ảnh địa điểm năm 2025",
    text: "Từ thống nhất về mặt nhà nước đến đường lối Đổi mới, các Cương lĩnh và quá trình hội nhập khu vực, thế giới.",
  },
];
export function Overview({
  onChapter,
  onQuiz,
  onOrder,
}: {
  onChapter: (chapter: Chapter) => void;
  onQuiz: () => void;
  onOrder: () => void;
}) {
  return (
    <section className="overview-view">
      <div className="overview-kicker">
        <span>LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM</span>
        <span>VNR202 / 1920–2018</span>
      </div>
      <div className="overview-intro">
        <div>
          <p className="eyebrow">KHÁM PHÁ · KẾT NỐI · GHI NHỚ</p>
          <h1>
            Lịch sử được nối
            <br />
            từ những <em>dấu mốc.</em>
          </h1>
        </div>
        <div className="overview-summary">
          <p>
            Điều gì dẫn đến một quyết định? Một sự kiện đã mở ra bước chuyển
            nào?
          </p>
          <p>
            Cùng đọc bối cảnh, tìm hiểu đường lối và kết nối ba chặng đường lịch
            sử qua 26 hồ sơ có nguồn, ảnh tư liệu và những thử thách kiến thức.
          </p>
          <a
            href="#journeys"
            onClick={(event) => {
              event.preventDefault();
              document
                .getElementById("journeys")
                ?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "instant"
                    : "smooth",
                });
            }}
          >
            Khám phá hành trình <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="journey-heading" id="journeys">
        <h2>Ba chặng đường, một dòng lịch sử</h2>
        <span>CHỌN MỘT CHƯƠNG ĐỂ BẮT ĐẦU</span>
      </div>
      <div className="journey-gallery">
        {journeys.map((journey) => (
          <article key={journey.chapter} className="journey">
            <div className="journey-index">
              <span>CHƯƠNG 0{journey.chapter}</span>
              <time>{journey.range}</time>
            </div>
            <ArchiveImage id={journey.image} caption={journey.caption} eager />
            <button
              className="journey-link"
              onClick={() => onChapter(journey.chapter)}
            >
              <h3>{journey.title}</h3>
              <span aria-hidden="true">↗</span>
            </button>
            <p>{journey.text}</p>
          </article>
        ))}
      </div>
      <section className="learning-invitation" aria-labelledby="learning-title">
        <div>
          <p className="eyebrow">TỪ TƯ LIỆU ĐẾN HIỂU BIẾT</p>
          <h2 id="learning-title">
            Đọc một hồ sơ.
            <br />
            Thử điều mình nhớ.
          </h2>
          <p>
            Chọn chương để học theo chủ đề, xếp sự kiện theo thời gian, hoặc đặt
            hai miền cạnh nhau để hiểu cùng một giai đoạn.
          </p>
        </div>
        <div className="learning-actions">
          <button className="primary" onClick={onQuiz}>
            Bắt đầu quiz →
          </button>
          <button onClick={onOrder}>Xếp mốc →</button>
          <a href="#lanes">Khám phá hai miền cùng thời ↗</a>
          <a href="#materials">Tra cứu hồ sơ & nguồn ↗</a>
        </div>
        <dl>
          <div>
            <dt>26</dt>
            <dd>hồ sơ sự kiện</dd>
          </div>
          <div>
            <dt>52</dt>
            <dd>câu hỏi kiến thức</dd>
          </div>
          <div>
            <dt>03</dt>
            <dd>chặng đường lịch sử</dd>
          </div>
        </dl>
      </section>
    </section>
  );
}
