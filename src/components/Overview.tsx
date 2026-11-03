import type { MouseEvent } from "react";
import { VideoLibrary } from "./VideoLibrary";
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
  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <section className="overview-view">
      <div className="overview-kicker">
        <span>LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM</span>
        <span>VNR202 / 1920–2018</span>
      </div>
      <div className="overview-intro">
        <div>
          <p className="eyebrow">DẤU MỐC LÀ GÌ?</p>
          <h1>
            Học Lịch sử Đảng
            <br />
            qua từng <em>dấu mốc.</em>
          </h1>
        </div>
        <div className="overview-summary">
          <p>
            Dấu Mốc là trang học và ôn tập học phần{" "}
            <strong>VNR202 — Lịch sử Đảng Cộng sản Việt Nam</strong>.
          </p>
          <p>
            Bạn đọc bài ngắn về từng sự kiện, xem ảnh và video, rồi tự kiểm tra
            bằng câu hỏi trắc nghiệm và trò chơi xếp mốc. Mục tiêu là hiểu{" "}
            <strong>bối cảnh, chủ trương và kết quả</strong> trong ba chặng
            đường 1920–2018.
          </p>
          <a
            className="primary overview-first-action"
            href="#profile/thanh-lap-dang"
          >
            Đọc hồ sơ đầu tiên
          </a>
          <div className="overview-shortcuts">
            <a href="#how-to" onClick={(event) => jumpTo(event, "how-to")}>
              Xem cách học
            </a>
            <a
              href="#video-library"
              onClick={(event) => jumpTo(event, "video-library")}
            >
              Xem video
            </a>
          </div>
        </div>
      </div>
      <section
        className="getting-started"
        id="how-to"
        aria-labelledby="start-heading"
      >
        <div className="guide-heading">
          <div>
            <p className="eyebrow">GỢI Ý CHO NGƯỜI MỚI</p>
            <h2 id="start-heading">Bắt đầu với ba bước nhỏ</h2>
          </div>
          <p>
            Đọc để hiểu một sự kiện, đặt nó vào dòng lịch sử, rồi thử điều mình
            nhớ.
          </p>
        </div>
        <ol className="first-steps">
          <li>
            <span className="step-number">01</span>
            <h3>Đọc một hồ sơ sự kiện</h3>
            <p>
              “Hồ sơ” là bài đọc ngắn gồm bối cảnh, chủ trương, kết quả và
              nguồn. Bắt đầu với sự kiện Đảng ra đời năm 1930.
            </p>
            <a href="#profile/thanh-lap-dang">Mở hồ sơ: Đảng ra đời</a>
          </li>
          <li>
            <span className="step-number">02</span>
            <h3>Đặt sự kiện vào một chương</h3>
            <p>
              Mở Bàn nhiệm vụ, chọn một mốc trên tuyến rồi đọc hồ sơ. Các mốc
              giúp bạn lần theo tiến trình của chương.
            </p>
            <button className="guide-text-action" onClick={() => onChapter(1)}>
              Khám phá Chương 1
            </button>
          </li>
          <li>
            <span className="step-number">03</span>
            <h3>Tự kiểm tra bằng Quiz</h3>
            <p>
              Mỗi lượt tối đa 6 câu, 30 giây/câu và 3 mạng. Chọn đáp án rồi bấm
              “Chốt đáp án”; đọc lời giải và nguồn sau mỗi câu.
            </p>
            <button className="primary" onClick={onQuiz}>
              Bắt đầu quiz
            </button>
          </li>
        </ol>
      </section>
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
            </button>
            <p>{journey.text}</p>
          </article>
        ))}
      </div>
      <section className="activity-guide" aria-labelledby="activity-heading">
        <div className="guide-heading">
          <div>
            <p className="eyebrow">CHỌN THEO ĐIỀU BẠN MUỐN HỌC</p>
            <h2 id="activity-heading">Mỗi mục dùng để làm gì?</h2>
          </div>
          <p>
            Bạn có thể quay về Tổng quan bất cứ lúc nào để chọn hoạt động tiếp
            theo.
          </p>
        </div>
        <dl>
          <div>
            <dt>
              <a href="#board">Bàn nhiệm vụ</a>
            </dt>
            <dd>Chọn chương và mở lần lượt các hồ sơ trên tuyến sự kiện.</dd>
          </div>
          <div>
            <dt>
              <a href="#quiz">Quiz</a>
            </dt>
            <dd>
              Trả lời câu hỏi trắc nghiệm để ôn kiến thức. Đọc giải thích và
              nguồn sau khi chốt đáp án.
            </dd>
          </div>
          <div>
            <dt>
              <a href="#order">Xếp mốc</a>
            </dt>
            <dd>
              Xếp các sự kiện từ sớm đến muộn rồi bấm “Kiểm tra”. Có thể chọn
              thẻ và vị trí bằng nút.
            </dd>
          </div>
          <div>
            <dt>
              <a href="#lanes">Hai miền cùng thời</a>
            </dt>
            <dd>
              Khám phá bản đồ tương tác, chọn giai đoạn 1954–1975 và so sánh các
              mốc ở miền Bắc, miền Nam, ngoại giao.
            </dd>
          </div>
          <div>
            <dt>
              <a href="#materials">Hồ sơ tư liệu</a>
            </dt>
            <dd>
              Tìm sự kiện theo tên hoặc thời gian, lọc chương và mở nguồn để đối
              chiếu. Tìm kiếm dùng được cả chữ có dấu và không dấu.
            </dd>
          </div>
        </dl>
        <div className="overview-practice">
          <span>Sẵn sàng thử thứ tự các sự kiện?</span>
          <button onClick={onOrder}>Xếp mốc</button>
        </div>
      </section>
      <VideoLibrary />
    </section>
  );
}
