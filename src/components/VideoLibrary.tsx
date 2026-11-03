import { useState } from "react";
import { videos } from "../data/videos";
import { content } from "../domain/content";
import { ArchiveImage } from "./ArchiveImage";

export function VideoLibrary({ eventId }: { eventId?: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const selected = videos.filter(
    (video) => !eventId || video.eventId === eventId,
  );
  if (!selected.length) return null;
  return (
    <section
      className="video-library"
      id="video-library"
      aria-labelledby="video-heading"
    >
      <div className="video-library-heading">
        <div>
          <p className="eyebrow">XEM ĐỂ HIỂU THÊM</p>
          <h2 id="video-heading">Lịch sử qua thước phim</h2>
        </div>
        <p>
          Chọn một video, đọc câu hỏi gợi ý rồi đối chiếu với hồ sơ sự kiện.
          Video là tư liệu xem thêm cho ba chương của VNR202.
        </p>
      </div>
      <div className="video-grid">
        {selected.map((video) => (
          <article className="video-card" key={video.id}>
            <p className="video-chapter">
              CHƯƠNG 0{video.chapter} <span>{video.publisher}</span>
            </p>
            {activeId === video.id && video.youtubeId ? (
              <div className="video-player">
                <iframe
                  title={video.title}
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&playsinline=1`}
                  allow="encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <div className="video-controls">
                  <button
                    className="video-close"
                    onClick={() => setActiveId(null)}
                  >
                    Đóng video
                  </button>
                  <a href={video.sourceUrl} target="_blank" rel="noreferrer">
                    Xem trực tiếp trên YouTube
                  </a>
                </div>
              </div>
            ) : (
              <div className="video-poster">
                <ArchiveImage id={video.imageId} caption={video.imageCaption} />
                {video.youtubeId ? (
                  <button
                    className="video-play-button"
                    onClick={() => setActiveId(video.id)}
                    aria-label={`Mở video: ${video.title}`}
                  >
                    <span aria-hidden="true">▶</span>
                    <b>Xem video</b>
                  </button>
                ) : (
                  <a
                    className="video-play-button"
                    href={video.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Xem video tại Báo Nhân Dân: ${video.title}`}
                  >
                    <span aria-hidden="true">▶</span>
                    <b>Xem tại Báo Nhân Dân</b>
                  </a>
                )}
              </div>
            )}
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <div className="viewing-prompt">
              <strong>Gợi ý khi xem</strong>
              <p>{video.watchFor}</p>
            </div>
            <div className="video-links">
              <a href={video.sourceUrl} target="_blank" rel="noreferrer">
                {video.youtubeId ? "Mở trên YouTube" : "Mở trang video gốc"}
              </a>
              <a href={`#profile/${video.eventId}`}>
                Đọc hồ sơ:{" "}
                {
                  content.events.find((event) => event.id === video.eventId)!
                    .title
                }{" "}
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="video-help">
        Nếu trình phát không hiển thị, dùng liên kết đến kênh hoặc trang video
        gốc ngay dưới mỗi video.
      </p>
    </section>
  );
}
