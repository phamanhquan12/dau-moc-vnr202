import { useState } from "react";
import { content } from "../domain/content";

/** Compact preview with visible caption and expandable, complete attribution. */
export function ArchiveImage({
  id,
  caption,
  eager = false,
}: {
  id: string;
  caption: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState<string | null>(null);
  const image = content.images.find((item) => item.id === id);
  if (!image || !image.localPath || image.licenseStatus !== "verified")
    return null;
  return (
    <figure className="archive-image">
      <div className="archive-frame">
        {failed === id ? (
          <p className="archive-unavailable">
            Ảnh tạm thời không tải được. Xem trang nguồn bên dưới.
          </p>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}${image.localPath}`}
            alt={image.title}
            loading={eager ? "eager" : "lazy"}
            onError={() => setFailed(id)}
          />
        )}
      </div>
      <figcaption>
        <span>{caption}</span>
        <details>
          <summary>Ảnh & nguồn</summary>
          <div className="archive-credit">
            <p>{image.title}</p>
            <p>{image.credit}</p>
            <p>{image.usageNote}</p>
            <a href={image.licenseUrl} target="_blank" rel="noreferrer">
              {image.license}
            </a>
            <a href={image.sourceUrl} target="_blank" rel="noreferrer">
              Trang nguồn
            </a>
          </div>
        </details>
      </figcaption>
    </figure>
  );
}
