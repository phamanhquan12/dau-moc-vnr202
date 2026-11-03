import { useMemo, useState } from "react";
import { content, lane } from "../domain/content";
import {
  historyEvents,
  historyLocation,
  historyPlaces,
  projectPoint,
  vietnamPath,
  type HistoryRegion,
} from "../domain/history";
import { EventSources } from "./Evidence";
import { ArchiveImage } from "./ArchiveImage";
const groups = [
  ["all", "Tất cả"],
  ["north", "Miền Bắc"],
  ["south", "Miền Nam"],
  ["common", "Chung / ngoại giao"],
] as const;
export function HistoryMap({
  start,
  end,
  periodLabel,
}: {
  start: number;
  end: number;
  periodLabel: string;
}) {
  const [region, setRegion] = useState<HistoryRegion>("all");
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const inPeriod = useMemo(
    () => historyEvents(content, start, end),
    [start, end],
  );
  const inRegion = inPeriod.filter(
    (event) => region === "all" || lane(event) === region,
  );
  const effectivePlace = historyPlaces.find(
    (place) =>
      place.id === placeId &&
      inRegion.some((event) =>
        historyLocation(event.id).placeIds.includes(place.id),
      ),
  );
  const visibleEvents = effectivePlace
    ? inRegion.filter((event) =>
        historyLocation(event.id).placeIds.includes(effectivePlace.id),
      )
    : inRegion;
  const selected =
    visibleEvents.find((event) => event.id === selectedId) ?? visibleEvents[0];
  const selectedLocation = selected ? historyLocation(selected.id) : null;
  const mapPlaces = historyPlaces
    .map((place) => ({
      ...place,
      events: inRegion.filter((event) =>
        historyLocation(event.id).placeIds.includes(place.id),
      ),
    }))
    .filter((place) => place.events.length);
  const changeRegion = (next: HistoryRegion) => {
    setRegion(next);
    setPlaceId(null);
    setSelectedId(null);
  };
  const choosePlace = (id: string) => {
    setPlaceId((current) => (current === id ? null : id));
    setSelectedId(null);
  };
  return (
    <section className="history-explorer" aria-labelledby="map-title">
      <div className="map-introduction">
        <div>
          <p className="eyebrow">KHÔNG GIAN & THỜI GIAN</p>
          <h2 id="map-title">
            Chạm một địa danh.
            <br />
            Đọc những mốc cùng thời.
          </h2>
        </div>
        <p>
          Chọn một điểm trên bản đồ hoặc một sự kiện trong danh sách. Số trong
          điểm là số hồ sơ tại địa danh đó; các dấu nối nhỏ dẫn về vị trí tham
          chiếu.
        </p>
      </div>
      <div
        className="map-region-filter"
        role="group"
        aria-label="Lọc nhóm sự kiện"
      >
        {groups.map(([value, label]) => (
          <button
            key={value}
            aria-pressed={region === value}
            onClick={() => changeRegion(value)}
          >
            <span className={`region-dot ${value}`} aria-hidden="true" />
            {label}
            <small>
              {value === "all"
                ? inPeriod.length
                : inPeriod.filter((event) => lane(event) === value).length}
            </small>
          </button>
        ))}
      </div>
      <div className="map-workspace">
        <div className="map-column">
          <div className="map-canvas">
            <div className="map-canvas-heading">
              <span>LƯỢC ĐỒ ĐỊA DANH</span>
              <strong>{periodLabel}</strong>
            </div>
            <svg
              viewBox="0 0 450 650"
              className="vietnam-map"
              role="group"
              aria-label="Bản đồ tương tác các địa danh lịch sử Việt Nam"
            >
              <title>Bản đồ địa danh Việt Nam, {periodLabel}</title>
              <desc>
                Chọn địa danh để lọc các sự kiện liên quan. Phím Tab di chuyển
                giữa các điểm, Enter hoặc phím cách để chọn.
              </desc>
              <defs>
                <pattern
                  id="map-grid"
                  width="36"
                  height="36"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M36 0H0V36"
                    fill="none"
                    stroke="#d8dfd6"
                    strokeWidth=".5"
                  />
                </pattern>
              </defs>
              <rect width="450" height="650" fill="url(#map-grid)" />
              <path
                d={vietnamPath}
                className="vietnam-outline"
                fillRule="evenodd"
              />
              <text x="303" y="70" className="map-region-name">
                MIỀN BẮC
              </text>
              <text x="92" y="432" className="map-region-name">
                MIỀN NAM
              </text>
              <text
                x="418"
                y="300"
                className="map-sea-name"
                transform="rotate(90 418 300)"
              >
                BIỂN ĐÔNG
              </text>
              <g className="map-north-arrow" aria-hidden="true">
                <path d="M400 175V137m-7 9 7-9 7 9" />
                <text x="400" y="127" textAnchor="middle">
                  B
                </text>
              </g>
              {mapPlaces.map((place) => {
                const [x, y] = projectPoint(place.longitude, place.latitude),
                  [dx, dy] = place.labelOffset;
                const active =
                  effectivePlace?.id === place.id ||
                  selectedLocation?.placeIds.includes(place.id);
                return (
                  <g
                    key={place.id}
                    className={`map-marker ${active ? "active" : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${place.label}: ${place.events.length} hồ sơ`}
                    aria-pressed={Boolean(active)}
                    data-place-id={place.id}
                    onClick={() => choosePlace(place.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        choosePlace(place.id);
                      }
                    }}
                  >
                    <title>
                      {place.label} · {place.events.length} hồ sơ
                    </title>
                    <path
                      d={`M${x},${y}L${x + dx},${y + dy}`}
                      className="marker-leader"
                    />
                    <circle cx={x} cy={y} r="3" className="marker-anchor" />
                    <circle cx={x + dx} cy={y + dy} r="32" fill="transparent" />
                    <circle
                      cx={x + dx}
                      cy={y + dy}
                      r="20"
                      className="marker-halo"
                    />
                    <circle
                      cx={x + dx}
                      cy={y + dy}
                      r="14"
                      className="marker-badge"
                    />
                    <text
                      x={x + dx}
                      y={y + dy + 4}
                      textAnchor="middle"
                      className="marker-count"
                    >
                      {place.events.length}
                    </text>
                    <text
                      x={x + dx}
                      y={y + dy + 33}
                      textAnchor="middle"
                      className="marker-name"
                    >
                      {place.label}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="map-canvas-footer">
              {mapPlaces.length} địa danh · {inRegion.length} hồ sơ trong nhóm
              đang chọn
            </div>
          </div>
          <p className="map-reading-note">
            Điểm đánh dấu tham chiếu địa danh, không phải vị trí đo đạc của trận
            đánh. Hồ sơ về một vùng hoặc ngoại giao ở nước ngoài được ghi riêng
            trong danh sách. Lược đồ không thể hiện đường kiểm soát lịch sử.
          </p>
          <details className="map-attribution">
            <summary>Nguồn bản đồ & địa danh</summary>
            <p>
              Đường nét tham khảo hiện đại:{" "}
              <a
                href="https://www.naturalearthdata.com/about/terms-of-use/"
                target="_blank"
                rel="noreferrer"
              >
                Natural Earth · public domain
              </a>
              . Tọa độ:{" "}
              <a
                href="https://www.geonames.org/"
                target="_blank"
                rel="noreferrer"
              >
                GeoNames
              </a>
              ,{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noreferrer"
              >
                CC BY 4.0
              </a>
              . Tên hiển thị theo bối cảnh lịch sử; nhãn được dịch chuyển để dễ
              chọn, dấu nhỏ giữ vị trí tham chiếu.
            </p>
            {effectivePlace && (
              <a
                href={effectivePlace.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                Đối chiếu tọa độ {effectivePlace.label}
              </a>
            )}
          </details>
        </div>
        <div className="map-timeline-column">
          <div className="map-list-heading">
            <h3>{effectivePlace ? effectivePlace.label : "Dòng thời gian"}</h3>
            <span role="status">
              {visibleEvents.length} hồ sơ · {periodLabel}
            </span>
            {effectivePlace && (
              <button
                onClick={() => {
                  setPlaceId(null);
                  setSelectedId(null);
                }}
              >
                Xem tất cả địa danh
              </button>
            )}
          </div>
          <ol
            className="map-event-list"
            aria-label="Các sự kiện trong giai đoạn"
          >
            {visibleEvents.map((event) => {
              const geo = historyLocation(event.id);
              return (
                <li key={event.id}>
                  <button
                    data-history-event={event.id}
                    aria-pressed={selected?.id === event.id}
                    onClick={() => setSelectedId(event.id)}
                  >
                    <time>{event.displayDate}</time>
                    <strong>{event.title}</strong>
                    <span>
                      {event.region} ·{" "}
                      {geo.kind === "overseas"
                        ? "Ngoài Việt Nam"
                        : geo.kind === "area"
                          ? "Phạm vi rộng"
                          : event.place}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          {!visibleEvents.length && (
            <p className="map-empty">
              Nhóm này chưa có hồ sơ trong giai đoạn đang xem. Chọn “Tất cả”
              hoặc một giai đoạn khác.
            </p>
          )}
          {selected && (
            <section
              className="map-event-detail"
              aria-label="Sự kiện đang chọn"
              aria-live="polite"
            >
              <p className="eyebrow">
                {selected.displayDate} / {selected.region}
              </p>
              <h3>{selected.title}</h3>
              <p className="map-location-note">{selectedLocation!.note}</p>
              {selected.imageId &&
                content.images.some(
                  (image) =>
                    image.id === selected.imageId &&
                    image.licenseStatus === "verified",
                ) && (
                  <ArchiveImage
                    key={selected.imageId}
                    id={selected.imageId}
                    caption={
                      content.images.find(
                        (image) => image.id === selected.imageId,
                      )!.title
                    }
                  />
                )}
              <dl>
                <div>
                  <dt>Bối cảnh</dt>
                  <dd>{selected.context}</dd>
                </div>
                <div>
                  <dt>Chủ trương / hành động</dt>
                  <dd>{selected.decision}</dd>
                </div>
                <div>
                  <dt>Kết quả / ý nghĩa</dt>
                  <dd>{selected.result}</dd>
                </div>
              </dl>
              <a className="primary" href={`#profile/${selected.id}`}>
                Mở hồ sơ đầy đủ
              </a>
              <details className="map-source-disclosure">
                <summary>Đối chiếu nguồn sự kiện</summary>
                <EventSources eventId={selected.id} />
              </details>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
