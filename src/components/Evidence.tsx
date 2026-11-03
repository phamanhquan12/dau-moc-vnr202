import { useState } from "react";
import { content } from "../domain/content";
export function SourceNote({ id }: { id: string }) {
  const s = content.sources.find((s) => s.id === id);
  return s ? (
    <div className="source-note">
      <strong>{s.title}</strong>
      <p>
        {s.locator} ·{" "}
        {s.page === null
          ? "Tham chiếu cấp chương; chưa xác minh trang."
          : `Trang ${s.page}`}
      </p>
      {s.url && (
        <a href={s.url} target="_blank" rel="noreferrer">
          Mở nguồn ↗
        </a>
      )}
      <small>
        Nội dung seed cần người phụ trách học phần đối chiếu; chưa được gắn
        trạng thái đã duyệt.
      </small>
    </div>
  ) : null;
}
export function ImageEvidence({ id }: { id: string | null }) {
  const [failed, setFailed] = useState(false);
  const image = content.images.find((i) => i.id === id);
  if (!image)
    return (
      <p className="fine">Hồ sơ không gắn ảnh; nội dung vẫn đọc đầy đủ.</p>
    );
  return (
    <figure className="image-evidence">
      {image.localPath && image.licenseStatus === "verified" && !failed ? (
        <a
          href={`${import.meta.env.BASE_URL}${image.localPath.replace(/^\//, "")}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={`${import.meta.env.BASE_URL}${image.localPath.replace(/^\//, "")}`}
            alt={image.title}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        </a>
      ) : (
        <div className="image-placeholder" role="img" aria-label={image.title}>
          Tư liệu ảnh chưa được tích hợp
        </div>
      )}
      <figcaption>
        <strong>{image.title}</strong>
        <p>
          {image.kind} · {image.credit}
        </p>
        <p className="fine">{image.usageNote}</p>
        <a href={image.sourceUrl} target="_blank" rel="noreferrer">
          Trang nguồn & điều kiện sử dụng ↗
        </a>
      </figcaption>
    </figure>
  );
}
