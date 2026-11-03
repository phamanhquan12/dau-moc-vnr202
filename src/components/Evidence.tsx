import { useState } from "react";
import { content } from "../domain/content";
export function SourceNote({ id }: { id: string }) {
  const s = content.sources.find((s) => s.id === id);
  const range = (start: number, end?: number) =>
    end && end !== start ? `${start}–${end}` : `${start}`;
  return s ? (
    <div className="source-note">
      <span className="evidence-label">Căn cứ nội dung</span>
      <strong>{s.title}</strong>
      <p>
        {s.locator}
        {s.page !== null && ` · Trang in ${range(s.page, s.pageEnd)}`}
        {s.pdfPage && ` · Trang PDF ${range(s.pdfPage, s.pdfPageEnd)}`}
      </p>
      {s.supports && <p>{s.supports}</p>}
      {s.caveat && <p className="source-caveat">{s.caveat}</p>}
      {s.url && (
        <a href={s.url} target="_blank" rel="noreferrer">
          {s.pdfPage
            ? "Mở PDF tại đoạn tham chiếu ↗"
            : "Đọc nguồn đối chiếu ↗"}
        </a>
      )}
      {s.publisher && <small>{s.publisher}</small>}
      {s.checkedAt && (
        <small>
          Đã kiểm tra đoạn nguồn · {s.checkedAt.split("-").reverse().join("/")}
        </small>
      )}
    </div>
  ) : null;
}
export function EventSources({ eventId }: { eventId: string }) {
  const event = content.events.find((e) => e.id === eventId);
  if (!event) return null;
  return (
    <>
      {[event.sourceId, ...(event.additionalSourceIds ?? [])].map((id) => (
        <SourceNote key={id} id={id} />
      ))}
    </>
  );
}
export function ImageEvidence({ id }: { id: string | null }) {
  const [failed, setFailed] = useState(false);
  const image = content.images.find((i) => i.id === id);
  if (!image) return null;
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
          {failed
            ? "Không tải được ảnh. Mở trang nguồn để xem."
            : "Tư liệu ảnh chưa được tích hợp"}
        </div>
      )}
      <figcaption>
        <strong>{image.title}</strong>
        <p>
          {image.kind} · {image.credit}
        </p>
        <p className="fine">{image.usageNote}</p>
        {image.license && (
          <p className="image-license">
            <a href={image.licenseUrl} target="_blank" rel="noreferrer">
              {image.license} ↗
            </a>
          </p>
        )}
        <a href={image.sourceUrl} target="_blank" rel="noreferrer">
          Trang nguồn & điều kiện sử dụng ↗
        </a>
        {image.originalUrl && (
          <>
            {" "}
            ·{" "}
            <a href={image.originalUrl} target="_blank" rel="noreferrer">
              Tệp gốc ↗
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
