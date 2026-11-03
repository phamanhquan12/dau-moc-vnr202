# README — Dấu Mốc VNR202: xây mới từ repository trống

## 1. Nhiệm vụ dành cho agent

Xây dựng một web game giáo dục bằng tiếng Việt tên **Dấu Mốc**, phục vụ sản phẩm sáng tạo của học phần **VNR202 — Lịch sử Đảng Cộng sản Việt Nam**. Trọng tâm là hiểu sự kiện, đường lối, bối cảnh và quan hệ giữa các giai đoạn lịch sử; kết hợp quiz, xếp mốc thời gian và ảnh tư liệu.

**Đây là toàn bộ handoff. Bắt đầu từ một thư mục trống. Người dùng không có codebase, component, API, test, ảnh hoặc file PDF nào từ một lần triển khai trước.** Không yêu cầu họ tìm lại mã nguồn. Không tham chiếu “app hiện tại”, “giữ lại test cũ”, đường dẫn máy của tác giả hay dữ liệu nằm ngoài README này.

Hãy triển khai sản phẩm thực sự, chạy kiểm tra và bàn giao repository có thể chạy/deploy. Không dừng ở bản kế hoạch. Nếu môi trường đã có mã do người dùng cung cấp thì đọc `AGENTS.md` và khảo sát trước, bảo toàn phần không liên quan; README này vẫn là đặc tả độc lập.

Nguồn cảm hứng do người dùng đưa: https://github.com/phamanhquan12/HCM202. Đây chỉ là tham khảo loại sản phẩm học tập, **không phải dependency và không được sao chép giao diện, bố cục, tài sản hoặc mã nguồn**. Không cần truy cập repo đó để hoàn thành bản đầu.

## 2. Bối cảnh và phạm vi

- Một người chơi trên một trình duyệt, có thể chiếu lên lớp và mời từng người đại diện chơi. Không cần người tham dự cài ứng dụng hay dùng điện thoại riêng.
- Phạm vi nội dung chọn lọc từ năm 1920 đến 2018, chia ba chương: chuẩn bị/thành lập Đảng và giành chính quyền; kháng chiến 1945–1975; xây dựng đất nước, Đổi mới và hội nhập sau 1975.
- Cần thể hiện cả miền Bắc và miền Nam, đặc biệt quan hệ giữa hậu phương, tiền tuyến và ngoại giao giai đoạn 1954–1975.
- Có 26 hồ sơ sự kiện và 52 câu MCQ đầy đủ trong JSON cuối README. Đó là dữ liệu khởi tạo, không phải toàn bộ giáo trình.
- Bản đầu là ứng dụng tĩnh, không cần backend, tài khoản, phòng chơi đồng thời, chat hay AI sinh câu hỏi lúc chơi.
- Không áp dụng luật dò mìn, bom, tiền thưởng hoặc question bank MLN131 từ ý tưởng trước. Sản phẩm này dùng điểm học tập và nhiệm vụ lịch sử.

## 3. UI khác biệt: Bàn kết nối lịch sử

Mở ứng dụng là thấy **bàn nhiệm vụ có thể chơi ngay**, không mở bằng landing page giới thiệu.

### Nhận diện

Giao diện giống một bàn làm việc để nối chứng cứ và mở hồ sơ lịch sử: nền xanh đen, các tuyến kết nối xanh ngọc, điểm nhấn hổ phách, typography sans hỗ trợ tiếng Việt. Có thể dùng các token sau làm điểm xuất phát, nhưng phải kiểm tra tương phản thực tế:

```css
--bg: #101820;
--surface: #192833;
--surface-raised: #223642;
--text: #f2f6f7;
--muted: #afc2cb;
--accent: #6ee7d2;
--highlight: #f5bf63;
--danger: #ff8c8c;
```

Không dùng nền kem–đỏ trầm, hero serif lớn, ảnh nghiêng, con dấu, số năm khổng lồ đè ảnh, ba card giới thiệu chế độ dưới hero hoặc quiz popup trên landing page. Đổi màu của cùng một bố cục không đáp ứng yêu cầu.

### Cấu trúc màn hình

| Màn hình | Nội dung và hành động chính |
| --- | --- |
| Bàn nhiệm vụ | Thanh tên game/chương, tuyến tiến trình có các nút nhiệm vụ được nối với nhau; một nhiệm vụ đang chọn có mô tả và nút “Bắt đầu”. Chơi quiz và xếp mốc đều truy cập được ngay. |
| Thử thách kiến thức | Màn hình tập trung riêng: số câu, điểm, chuỗi đúng, ba mạng, thời gian; một câu với bốn lựa chọn lớn; chọn rồi “Chốt đáp án”; sau đó lời giải và “Tiếp tục”. |
| Xếp mốc | Sáu thẻ sự kiện, một trục thứ tự, thao tác kéo hoặc nút chuyển trái/phải/lên/xuống; “Kiểm tra” và giải thích sau lượt. |
| Hai miền cùng thời | Một trục thời gian chung, ba làn “Miền Bắc”, “Chung / ngoại giao”, “Miền Nam”; chọn một mốc mở hồ sơ và giải thích mối liên hệ có căn cứ. |
| Hồ sơ tư liệu | Danh sách tìm kiếm/lọc và trang chi tiết: thời gian, địa điểm, bối cảnh, chủ trương, kết quả/ý nghĩa, ảnh, chú thích, nguồn. Đây là màn tra cứu phụ. |
| Kết quả | Điểm lượt này, kết quả tốt nhất của đúng chế độ, câu cần ôn lại, chơi lại và quay về bàn. |

Desktop: tuyến nhiệm vụ là vùng lớn trung tâm; chi tiết nhiệm vụ là panel bên cạnh. Mobile: dùng tuyến dọc và panel nối tiếp bên dưới, tránh scroll ngang toàn trang. Quiz và xếp mốc dùng toàn bộ vùng nội dung, không bị bó trong modal.

Không cần vẽ bản đồ địa lý nếu chưa có dữ liệu địa lý đúng. Đường nối trên bàn nhiệm vụ biểu thị tiến trình chơi, không tự động mang nghĩa quan hệ nhân quả lịch sử. Dùng nhãn rõ cho hai loại quan hệ.

Yêu cầu hiển thị: desktop 1440×900, máy chiếu 1280×720, mobile 390×844 và tối thiểu 360px. Tại máy chiếu, câu hỏi và đáp án đủ lớn để đọc; không phụ thuộc hover. Hỗ trợ bàn phím, focus rõ, reduced motion, không phân biệt trạng thái chỉ bằng màu.

## 4. Luật chơi chính xác

### 4.1 Quiz

- Mỗi lượt tối đa sáu câu thuộc bộ lọc chương đã chọn; ba mạng; 30 giây mỗi câu. Không lặp câu trong cùng lượt, ưu tiên sáu sự kiện khác nhau.
- Lượt mặc định: hai câu nhận biết (`difficulty=1`), bốn câu thông hiểu (`difficulty=2`), câu nhận biết xuất hiện trước. Nếu bộ lọc không đủ ứng viên, dùng các câu còn lại cùng chương và thông báo ngắn; không âm thầm dùng câu ngoài chương. Nếu tổng dưới sáu, chơi số câu thực tế và ghi rõ trước khi bắt đầu.
- Xáo thứ tự bốn lựa chọn đúng một lần khi tạo phiên; lưu thứ tự đó. Không đổi đáp án khi render, resize hoặc reload. Kiểm tra bằng ID lựa chọn, không bằng vị trí A/B/C/D.
- Click/chạm một lựa chọn chỉ chọn. Người chơi phải “Chốt đáp án”; có thể đổi lựa chọn trước khi chốt. Nút chốt bị vô hiệu khi chưa chọn.
- Đúng: `gain = 100 + min(previousStreak, 3) × 20`; sau đó tăng streak lên một. Sáu câu đúng liên tiếp: 100, 120, 140, 160, 160, 160 = **840 điểm**.
- Sai hoặc hết giờ: không cộng điểm, mất một mạng, streak về 0. Không có điểm âm.
- Hết giờ được tính là một lần sai dù đã chọn nhưng chưa chốt. Nếu chốt ở thời điểm `now >= deadline`, xử lý hết giờ. Không để thao tác chốt và timer cùng trừ hai mạng.
- Sau mỗi câu, khóa đáp án, hiện đúng/sai/hết giờ, đáp án đúng, giải thích và nguồn; chỉ chuyển khi bấm “Tiếp tục”. Thời gian đọc lời giải không tính vào câu sau.
- Kết thúc khi hết mạng hoặc đã xử lý đủ câu. Không tự khởi tạo lượt mới khi tới trang kết quả.
- Đồng hồ dùng `deadline` tuyệt đối theo thời gian hiện tại, không giảm số giây bằng đếm tick. Chuyển tab/reload không cho thêm thời gian. Reload sau deadline phải ghi nhận đúng một timeout.
- Nút “Lượt mới” xóa phiên đang chơi sau xác nhận trong ứng dụng; việc mở hồ sơ không xóa phiên. Không cần chống gian lận cấp máy chủ cho phiên bản lớp học.

### 4.2 Xếp mốc

- Mỗi lượt chọn sáu sự kiện **khác năm** trong phạm vi lọc, rồi xáo thứ tự. Nếu không đủ sáu năm, dùng số lượng thực tế và hiển thị rõ.
- Người chơi sắp từ sớm đến muộn. Vì chọn khác năm, không dùng ngày giả để phân xử sự kiện cùng năm.
- Có cách làm bằng nút và bàn phím ngoài kéo thả. Giữ focus với thẻ đang di chuyển.
- “Kiểm tra” khóa lượt, hiện đúng/sai và thứ tự chuẩn kèm giải thích ngắn. Không đổi tập sự kiện khi kiểm tra hoặc render lại.
- Điểm chế độ này: 100 cho mỗi thẻ ở vị trí đúng, tối đa 600 nếu có sáu thẻ. Một lần tính điểm mỗi lượt, không dùng mạng/timer của quiz.
- Lưu best score độc lập với quiz. “Chơi lại” tạo lượt mới.

### 4.3 Hai miền cùng thời

Hiển thị đồng bộ các khoảng 1954–1960, 1961–1965, 1965–1968, 1969–1973, 1973–1975. Quy tắc đặt mốc để không xuất hiện hai lần tại ranh giới: `[1954,1961)`, `[1961,1965)`, `[1965,1969)`, `[1969,1973)`, `[1973,1976)`.

Làn sự kiện dựa vào `region`, không suy từ địa điểm: “Miền Bắc”, “Miền Nam”, còn “Cả nước” hoặc “Quốc tế” vào làn chung. Ví dụ Đại hội III có phạm vi cả nước dù tổ chức ở miền Bắc. Giai đoạn không có mốc trong seed hiển thị “Chưa có hồ sơ trong bộ dữ liệu”, không bịa sự kiện để lấp chỗ.

Kết nối giải thích tối thiểu: Nghị quyết 15 → Đồng khởi; Đại hội III → hai nhiệm vụ chiến lược; chiến đấu tháng 12/1972 và đấu tranh quân sự/chính trị/ngoại giao → Hiệp định Paris; Paris → nhiệm vụ giải phóng miền Nam tiếp tục. Viết có giới hạn, không gán một nguyên nhân duy nhất hay coi quan hệ thời gian là bằng chứng nhân quả. Màn này là tra cứu, không có điểm thưởng tự động.

## 5. Nội dung, độ khó và ảnh tư liệu

JSON cuối README đủ để bootstrap, không cần một file tải riêng. Tách nó thành `src/data/content.json` hoặc tương đương. Không coi nội dung seed là đã được giảng viên duyệt.

- 26 câu nhận biết về năm phục vụ khởi động; 26 câu thông hiểu có đáp án và giải thích. Độ khó 2 trong seed là phân loại khởi tạo, không phải kết quả kiểm định độ khó.
- Trước khi bàn giao, rà soát câu mơ hồ và các đáp án nhiễu quá lộ. Chỉ sửa câu cần sửa, giữ ID ổn định; khi sửa một câu cần xem cả ba phương án sai. Nhiễu nên cùng loại, cùng phạm vi thời kỳ, độ dài tương đương và phản ánh nhầm lẫn có thể xảy ra; không dùng câu sai vô lý, dấu hiệu ngữ pháp hoặc tuyệt đối hóa để lộ đáp án.
- Muốn thêm câu vận dụng thì phải có một đáp án tốt nhất dựa trên nguồn, lời giải giải thích nhầm lẫn. Không gắn nhãn “khó” cho câu hỏi đánh đố ngày tháng; không tự bịa trích dẫn hoặc kết luận học thuật. Không cần AI runtime.
- Nguồn seed ghi giáo trình 2019 ở cấp chương. README **không đính kèm PDF**; không tạo nút tải PDF lỗi hoặc giả số trang. Nếu môi trường được cung cấp thêm giáo trình, đối chiếu và bổ sung trang chính xác; nếu không, ghi trạng thái tham chiếu cấp chương và các mục cần người phụ trách học phần duyệt.
- `datePrecision` bắt buộc: `year`, `month`, `day`; định dạng `date` lần lượt là `YYYY`, `YYYY-MM`, `YYYY-MM-DD`. Chỉ hiển thị đúng độ chính xác đã biết. Tháng 8/1945 là một quá trình trên cả nước, không gắn toàn bộ Cách mạng Tháng Tám với riêng ngày giành chính quyền ở Hà Nội. Các hiệp định/phong trào có nhiều mốc không bị quy thành một ngày tùy tiện.
- Phân biệt ảnh sự kiện, ảnh hiện vật, ảnh tái hiện, ảnh địa điểm hiện nay. Không dùng ảnh AI làm ảnh lịch sử thật. Chú thích ảnh Điện Biên Phủ không khẳng định thời điểm chụp chính xác nếu nguồn không chứng minh.

Bốn hồ sơ ảnh ở JSON là **trang nguồn để tìm và kiểm tra**, không phải file ảnh đã có. Agent tải ảnh chỉ sau khi kiểm tra đúng ảnh, tác giả và điều kiện sử dụng; cập nhật `licenseStatus` và `localPath` theo kết quả thật. Ưu tiên ảnh có quyền sử dụng rõ và lưu local để trình chiếu ổn định. Không hotlink một trang HTML như thể là ảnh.

Ảnh xe tăng thuộc nguồn Bảo tàng Lịch sử Quốc gia/TTXVN không được mặc định là giấy phép mở. Nếu chưa xác minh được quyền hoặc tải thất bại, dùng placeholder trung thực “Tư liệu ảnh chưa được tích hợp” + link nguồn; luồng chơi vẫn hoạt động. Không yêu cầu người dùng cung cấp ảnh chỉ để dựng được bản đầu. Không tuyên bố có đủ ảnh cho cả 26 sự kiện.

## 6. Kiến trúc từ đầu

Dùng **TypeScript + React + Vite**, CSS thuần hoặc thư viện CSS nhẹ, Vitest cho unit/integration, Playwright cho E2E. Chọn phiên bản tương thích tại thời điểm triển khai, ghi lockfile; không coi README này là package manifest có sẵn. Có thể dùng một font hệ thống hỗ trợ tiếng Việt để chạy không phụ thuộc mạng.

Tạo tối thiểu cấu trúc tương đương:

```text
package.json
package-lock.json
index.html
src/
  main.tsx
  app/                 # màn hình, điều hướng
  components/          # thành phần UI
  domain/              # chọn câu, state machine, tính điểm, xếp mốc
  data/content.json    # JSON từ phụ lục
  storage/             # đọc/ghi phiên và tiến độ
  styles/
public/media/          # chỉ các ảnh đã tải và xác minh
tests/unit/
tests/integration/
tests/e2e/
playwright.config.ts
README.md              # hướng dẫn chạy sản phẩm đã hoàn thành
```

Tạo các scripts thực sự hoạt động: `dev`, `build`, `preview`, `typecheck`, `test:unit`, `test:integration`, `test:e2e`. Không chỉ ghi tên lệnh trong tài liệu mà quên khai báo.

Tách logic thành hàm thuần có thể truyền `now` và bộ tạo số ngẫu nhiên trong test. Đề xuất các hàm, không phải API đã tồn tại: `createQuizSession`, `selectOption`, `submitAnswer`, `expireQuestion`, `advanceQuestion`, `createOrderingRound`, `gradeOrdering`, `validateContent`, `restoreSession`.

State quiz tối thiểu: `sessionId`, `schemaVersion`, `contentVersion`, `questionIds`, `optionOrderByQuestion`, `index`, `selectedOptionId`, `phase`, `deadline`, `score`, `streak`, `lives`, `answers`. `phase`: `question → feedback → question/finished`. Mọi transition phải kiểm tra phase/câu hiện tại; chốt lặp là no-op. Không lưu riêng một bản điểm có thể lệch với lịch sử trả lời.

Lưu phiên vào localStorage sau mỗi transition quan trọng. Khi restore, validate schema, ID câu, option order và các giá trị số. Dữ liệu hỏng/phiên không tương thích phải được bỏ an toàn kèm thông báo dễ hiểu, không crash trang. Đây là lưu trên thiết bị, không đồng bộ người chơi giữa máy.

Lưu riêng `seenEventIds`, `correctQuestionIds`, best quiz, best ordering. Xem hồ sơ chỉ đánh dấu đã xem; không tính là đã nắm kiến thức. Không tạo tỷ lệ mastery từ số lần mở ảnh. Cung cấp nút xóa tiến độ có xác nhận.

Validate dữ liệu ở build/test: ID không trùng; mọi reference hợp lệ; mỗi MCQ có bốn lựa chọn khác nhau và đúng một `correctOptionId`; ngày phù hợp precision; không có local asset path bị thiếu được khai báo là đã tích hợp. Content bundle không chứa token hay thông tin riêng tư.

## 7. Kiểm thử bắt buộc

Repository trống chưa có bất kỳ test nào: **hãy tạo mới và chạy**, không báo “giữ nguyên 17 test” hoặc kết quả từ một sản phẩm khác. Test kiểm tra hành vi/luật, không chỉ snapshot render hoặc mock chính hàm cần kiểm tra.

### Unit

1. Sáu câu đúng liên tiếp ra 840; từng gain đúng 100/120/140/160/160/160.
2. Đúng/đúng/sai/đúng cho gain 100/120/0/100, mất một mạng và reset streak.
3. Sai/hết giờ không tạo điểm âm; mạng bằng 0 kết thúc sau feedback.
4. `now = deadline - 1` chấp nhận; `now = deadline` là timeout; submit + timeout và double submit chỉ ghi một answer.
5. Chọn option không chấm; option không hợp lệ/transition sai phase không đổi điểm.
6. Chọn câu theo chương, không lặp, giữ đủ option và đúng ID sau shuffle; dữ liệu thiếu được xử lý đúng quy tắc.
7. Round ordering có năm riêng biệt; chấm đúng 600, sai một số vị trí tính đúng số vị trí; không đổi round khi chấm; giữ best độc lập.
8. Validate dates year/month/day, không sinh ngày 01 giả; mốc ranh giới chỉ vào một giai đoạn; event chung không bị ép sang miền Bắc/Nam.
9. Restore giữ question IDs, option order, lựa chọn, deadline; session corrupt/không tương thích được xử lý an toàn.
10. Toàn bộ JSON seed pass validator; test phát hiện dangling event/source/image và lựa chọn trùng.

### Integration

- Bàn nhiệm vụ → chọn chương → bắt đầu quiz → chọn → chốt → feedback → câu sau → kết quả; kiểm tra điểm/mạng và nội dung giải thích thực.
- Bấm liên tục vào chốt và cập nhật timer cùng lúc không chấm hai lần.
- Lưu rồi remount ở question/feedback; reload sau deadline xử lý một timeout và không được thêm thời gian.
- Quiz và ordering không ghi đè best score của nhau. Xem hồ sơ không tăng mastery.
- Tìm kiếm tiếng Việt có/không dấu; filter chương/miền; nguồn và placeholder ảnh hoạt động khi không có media.

### E2E bằng trình duyệt thật

- Desktop: hoàn thành một lượt quiz qua UI; đối chiếu kết quả; reload giữa lượt giữ vị trí/thứ tự; bỏ tab hoặc dùng clock điều khiển để kiểm tra deadline.
- Desktop: sắp mốc bằng nút/bàn phím, chấm và xem thứ tự đúng; nút kiểm tra không tạo round mới.
- Mobile 390px: bắt đầu quiz, chọn/chốt, điều hướng, xem hồ sơ; không tràn ngang, không nút bị che.
- Máy chiếu 1280×720: đọc câu, đáp án, thời gian và CTA mà không bị cắt; lưu screenshot kiểm tra giao diện.
- Kiểm tra console error, asset 404, đường dẫn trực tiếp/reload và trạng thái ảnh lỗi. Mọi phần chính dùng được bằng bàn phím.

Dùng clock giả hoặc dependency `now` cho test thời gian; tránh chờ 30 giây thực từng case. Chạy typecheck, unit, integration, E2E và production build. Nếu runner thiếu browser hay không có quyền tải dependency, ghi rõ test nào chưa chạy và blocker thật; không công bố test pass chưa chạy. Không giảm yêu cầu để làm báo cáo xanh.

## 8. Triển khai và bàn giao

Ứng dụng tĩnh: `npm ci`, `npm run build` tạo `dist`; host thư mục đó trên dịch vụ static hosting bất kỳ. Nếu dùng client routing, chọn hash routing hoặc cung cấp cấu hình fallback phù hợp cho host. Chạy kiểm tra production preview trước bàn giao. Không giả định người dùng đã có tài khoản hosting, URL hoặc repository GitHub; không tự nhận đã publish nếu chưa làm.

Một người đại diện chơi: mở URL trên máy tính, toàn màn hình trình duyệt và chiếu lên lớp; lớp cùng quan sát, người đại diện điều khiển. Người kế tiếp chọn “Lượt mới”; tiến độ là trên cùng trình duyệt. Không cần triển khai backend để hỗ trợ cách chơi này.

Bàn giao: mã nguồn đầy đủ, lockfile, JSON nội dung, các ảnh đã xác minh (nếu có), nguồn và credit, test, README chạy/deploy, báo cáo kiểm tra ngắn. Báo cáo riêng các ảnh chưa tích hợp và nội dung cần giảng viên đối chiếu; không lẫn trạng thái dữ liệu với trạng thái chạy phần mềm.

Definition of done: từ thư mục clone mới, người dùng cài dependency và chạy được; chơi trọn quiz và ordering; xem được hai miền và hồ sơ; reload giữ phiên đúng; UI đáp ứng hướng thiết kế mới; các kiểm tra bắt buộc có kết quả trung thực. Không có link/file giả hay yêu cầu truy cập code của tác giả README.

## 9. Phụ lục — dữ liệu tự chứa

Copy **toàn bộ JSON** dưới đây vào file dữ liệu mới. `localPath: null` là trạng thái hợp lệ trước khi tải ảnh. `correctOptionId` trong file được công khai để ứng dụng tĩnh chấm bài; đây không phải hệ thống thi bảo mật. Chữ A/B/C/D trên UI là nhãn vị trí sau shuffle, không phải ID lưu trong dữ liệu.

```json
{
  "schemaVersion": 1,
  "contentStatus": "starter-content-requires-academic-review",
  "sources": [
    {
      "id": "textbook-2019-ch1",
      "title": "Giáo trình Lịch sử Đảng Cộng sản Việt Nam (2019)",
      "chapter": 1,
      "locator": "Chương 1",
      "page": null,
      "url": null,
      "reviewStatus": "chapter-reference-only"
    },
    {
      "id": "textbook-2019-ch2",
      "title": "Giáo trình Lịch sử Đảng Cộng sản Việt Nam (2019)",
      "chapter": 2,
      "locator": "Chương 2",
      "page": null,
      "url": null,
      "reviewStatus": "chapter-reference-only"
    },
    {
      "id": "textbook-2019-ch3",
      "title": "Giáo trình Lịch sử Đảng Cộng sản Việt Nam (2019)",
      "chapter": 3,
      "locator": "Chương 3",
      "page": null,
      "url": null,
      "reviewStatus": "chapter-reference-only"
    }
  ],
  "images": [
    {
      "id": "ba-dinh",
      "title": "Lễ Độc lập tại Quảng trường Ba Đình, 02/09/1945",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ba_Dinh_Square_September_2nd,_1945.jpg",
      "credit": "Tác giả khuyết danh · Wikimedia Commons",
      "kind": "Ảnh sự kiện",
      "localPath": null,
      "licenseStatus": "verify-before-embedding",
      "usageNote": "Kiểm tra quyền sử dụng và chú thích tại trang nguồn trước khi tải. Nếu chưa xác minh, hiển thị liên kết nguồn và trạng thái chưa tích hợp ảnh."
    },
    {
      "id": "dien-bien",
      "title": "Cắm cờ trên hầm chỉ huy Pháp tại Điện Biên Phủ, 1954",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Victory_in_Battle_of_Dien_Bien_Phu.jpg",
      "credit": "Vietnam People’s Army · Wikimedia Commons",
      "kind": "Ảnh tư liệu",
      "localPath": null,
      "licenseStatus": "verify-before-embedding",
      "usageNote": "Kiểm tra quyền sử dụng và chú thích tại trang nguồn trước khi tải. Nếu chưa xác minh, hiển thị liên kết nguồn và trạng thái chưa tích hợp ảnh."
    },
    {
      "id": "sai-gon",
      "title": "Xe tăng tiến vào Dinh Độc Lập, trưa 30/04/1975",
      "sourceUrl": "https://baotanglichsuquocgia.vn/vi/Articles/3091/18055/ve-buc-anh-xe-tang-tien-vao-dinh-djoc-lap.html",
      "credit": "Trần Mai Hưởng / TTXVN · Bảo tàng Lịch sử Quốc gia",
      "kind": "Ảnh sự kiện",
      "localPath": null,
      "licenseStatus": "verify-before-embedding",
      "usageNote": "Kiểm tra quyền sử dụng và chú thích tại trang nguồn trước khi tải. Nếu chưa xác minh, hiển thị liên kết nguồn và trạng thái chưa tích hợp ảnh."
    },
    {
      "id": "duong-kach-menh",
      "title": "Bản gốc Đường Kách mệnh (1927)",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Duong_Kach_Menh_(Original).jpg",
      "credit": "Hoangkid · Bảo tàng Lịch sử Quốc gia / Wikimedia Commons",
      "kind": "Ảnh hiện vật",
      "localPath": null,
      "licenseStatus": "verify-before-embedding",
      "usageNote": "Kiểm tra quyền sử dụng và chú thích tại trang nguồn trước khi tải. Nếu chưa xác minh, hiển thị liên kết nguồn và trạng thái chưa tích hợp ảnh."
    }
  ],
  "events": [
    {
      "id": "tours",
      "title": "Bước ngoặt ở Đại hội Tours",
      "chapter": 1,
      "year": 1920,
      "region": "Quốc tế",
      "place": "Tours, Pháp",
      "context": "Phong trào yêu nước Việt Nam đứng trước yêu cầu tìm con đường giải phóng mới.",
      "decision": "Nguyễn Ái Quốc tán thành Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp.",
      "result": "Đánh dấu bước chuyển từ chủ nghĩa yêu nước đến chủ nghĩa cộng sản.",
      "date": "1920",
      "datePrecision": "year",
      "displayDate": "1920",
      "sourceId": "textbook-2019-ch1",
      "imageId": null
    },
    {
      "id": "thanh-nien",
      "title": "Chuẩn bị lực lượng cách mạng",
      "chapter": 1,
      "year": 1925,
      "region": "Quốc tế",
      "place": "Quảng Châu",
      "context": "Cần chuẩn bị về tổ chức và truyền bá lý luận vào phong trào trong nước.",
      "decision": "Nguyễn Ái Quốc thành lập Hội Việt Nam Cách mạng Thanh niên.",
      "result": "Đào tạo cán bộ và chuẩn bị tổ chức cho sự ra đời của Đảng.",
      "date": "1925-06",
      "datePrecision": "month",
      "displayDate": "06/1925",
      "sourceId": "textbook-2019-ch1",
      "imageId": null
    },
    {
      "id": "duong-kach-menh",
      "title": "Đường Kách mệnh",
      "chapter": 1,
      "year": 1927,
      "region": "Quốc tế",
      "place": "Quảng Châu",
      "context": "Các lớp huấn luyện cán bộ cần một hệ thống lý luận và phương pháp hoạt động.",
      "decision": "Tập hợp các bài giảng của Nguyễn Ái Quốc thành tác phẩm Đường Kách mệnh.",
      "result": "Góp phần chuẩn bị tư tưởng, chính trị và tổ chức cho cách mạng.",
      "date": "1927",
      "datePrecision": "year",
      "displayDate": "1927",
      "sourceId": "textbook-2019-ch1",
      "imageId": "duong-kach-menh"
    },
    {
      "id": "thanh-lap-dang",
      "title": "Đảng ra đời, Cương lĩnh đầu tiên",
      "chapter": 1,
      "year": 1930,
      "region": "Cả nước",
      "place": "Hương Cảng",
      "context": "Các tổ chức cộng sản ra đời nhưng hoạt động phân tán, cần thống nhất.",
      "decision": "Hội nghị do Nguyễn Ái Quốc chủ trì hợp nhất các tổ chức và thông qua Cương lĩnh đầu tiên.",
      "result": "Tạo sự thống nhất lãnh đạo và định hướng giải phóng dân tộc.",
      "date": "1930-02-03",
      "datePrecision": "day",
      "displayDate": "03/02/1930",
      "sourceId": "textbook-2019-ch1",
      "imageId": null
    },
    {
      "id": "dan-chu",
      "title": "Phong trào dân chủ 1936–1939",
      "chapter": 1,
      "year": 1936,
      "region": "Cả nước",
      "place": "Đông Dương",
      "context": "Tình hình quốc tế và trong nước có điều kiện mới cho đấu tranh dân chủ.",
      "decision": "Kết hợp các hình thức hợp pháp, nửa hợp pháp, đòi dân sinh và dân chủ.",
      "result": "Mở rộng tập hợp quần chúng, tích lũy kinh nghiệm tổ chức đấu tranh.",
      "date": "1936",
      "datePrecision": "year",
      "displayDate": "1936",
      "sourceId": "textbook-2019-ch1",
      "imageId": null
    },
    {
      "id": "viet-minh",
      "title": "Đặt giải phóng dân tộc lên hàng đầu",
      "chapter": 1,
      "year": 1941,
      "region": "Miền Bắc",
      "place": "Pác Bó, Cao Bằng",
      "context": "Chiến tranh thế giới và ách thống trị đặt dân tộc trước nhiệm vụ cấp bách.",
      "decision": "Hội nghị Trung ương 8 hoàn chỉnh chuyển hướng chiến lược; thành lập Mặt trận Việt Minh.",
      "result": "Mở rộng đoàn kết và chuẩn bị cho khởi nghĩa giành chính quyền.",
      "date": "1941-05",
      "datePrecision": "month",
      "displayDate": "05/1941",
      "sourceId": "textbook-2019-ch1",
      "imageId": null
    },
    {
      "id": "thang-tam",
      "title": "Tổng khởi nghĩa Tháng Tám",
      "chapter": 1,
      "year": 1945,
      "region": "Cả nước",
      "place": "Hà Nội và cả nước",
      "context": "Nhật đầu hàng Đồng minh, thời cơ cách mạng xuất hiện.",
      "decision": "Lãnh đạo toàn dân tổng khởi nghĩa giành chính quyền.",
      "result": "Chính quyền về tay nhân dân ở nhiều địa phương và trên phạm vi cả nước.",
      "date": "1945-08",
      "datePrecision": "month",
      "displayDate": "08/1945",
      "sourceId": "textbook-2019-ch1",
      "imageId": null
    },
    {
      "id": "doc-lap",
      "title": "Ngày khai sinh một nhà nước mới",
      "chapter": 1,
      "year": 1945,
      "region": "Cả nước",
      "place": "Quảng trường Ba Đình",
      "context": "Cách mạng Tháng Tám thắng lợi, cần tuyên bố nền độc lập trước quốc dân và thế giới.",
      "decision": "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập.",
      "result": "Nước Việt Nam Dân chủ Cộng hòa ra đời.",
      "date": "1945-09-02",
      "datePrecision": "day",
      "displayDate": "02/09/1945",
      "sourceId": "textbook-2019-ch1",
      "imageId": "ba-dinh"
    },
    {
      "id": "khang-chien",
      "title": "Toàn quốc kháng chiến",
      "chapter": 2,
      "year": 1946,
      "region": "Cả nước",
      "place": "Hà Nội và cả nước",
      "context": "Nỗ lực hòa hoãn không ngăn được việc thực dân Pháp mở rộng xâm lược.",
      "decision": "Phát động toàn quốc kháng chiến, bảo vệ độc lập.",
      "result": "Cuộc kháng chiến chống Pháp phát triển trên phạm vi cả nước.",
      "date": "1946-12-19",
      "datePrecision": "day",
      "displayDate": "19/12/1946",
      "sourceId": "textbook-2019-ch2",
      "imageId": null
    },
    {
      "id": "dai-hoi-ii",
      "title": "Đại hội II của Đảng",
      "chapter": 2,
      "year": 1951,
      "region": "Miền Bắc",
      "place": "Tuyên Quang",
      "context": "Kháng chiến cần tiếp tục củng cố tổ chức và đường lối lãnh đạo.",
      "decision": "Đảng hoạt động công khai với tên Đảng Lao động Việt Nam.",
      "result": "Tăng cường sự lãnh đạo và sức mạnh tổ chức trong kháng chiến.",
      "date": "1951-02",
      "datePrecision": "month",
      "displayDate": "02/1951",
      "sourceId": "textbook-2019-ch2",
      "imageId": null
    },
    {
      "id": "dien-bien",
      "title": "Điện Biên Phủ: bước ngoặt quyết định",
      "chapter": 2,
      "year": 1954,
      "region": "Miền Bắc",
      "place": "Điện Biên Phủ",
      "context": "Kế hoạch Nava tìm cách giành lại thế chủ động quân sự.",
      "decision": "Tập trung sức mạnh cho trận quyết chiến chiến lược Điện Biên Phủ.",
      "result": "Tạo cơ sở quân sự quan trọng cho giải pháp ngoại giao tại Giơnevơ.",
      "date": "1954-05-07",
      "datePrecision": "day",
      "displayDate": "07/05/1954",
      "sourceId": "textbook-2019-ch2",
      "imageId": "dien-bien"
    },
    {
      "id": "geneva",
      "title": "Giơnevơ và cục diện hai miền",
      "chapter": 2,
      "year": 1954,
      "region": "Cả nước",
      "place": "Giơnevơ",
      "context": "Thắng lợi kháng chiến tạo cơ sở cho đàm phán kết thúc chiến tranh.",
      "decision": "Hiệp định Giơnevơ về Đông Dương được ký kết.",
      "result": "Miền Bắc được giải phóng; đất nước tạm thời chia cắt, thống nhất chưa hoàn thành.",
      "date": "1954-07",
      "datePrecision": "month",
      "displayDate": "07/1954",
      "sourceId": "textbook-2019-ch2",
      "imageId": null
    },
    {
      "id": "nghi-quyet-15",
      "title": "Nghị quyết 15: mở hướng đấu tranh",
      "chapter": 2,
      "year": 1959,
      "region": "Miền Nam",
      "place": "Miền Nam",
      "context": "Chính sách đàn áp đặt phong trào trước yêu cầu chuyển biến phương thức đấu tranh.",
      "decision": "Kết hợp đấu tranh chính trị với đấu tranh vũ trang.",
      "result": "Tạo định hướng cho sự phát triển của phong trào cách mạng miền Nam.",
      "date": "1959-01",
      "datePrecision": "month",
      "displayDate": "01/1959",
      "sourceId": "textbook-2019-ch2",
      "imageId": null
    },
    {
      "id": "dong-khoi",
      "title": "Đồng khởi Bến Tre",
      "chapter": 2,
      "year": 1960,
      "region": "Miền Nam",
      "place": "Mỏ Cày, Bến Tre",
      "context": "Phong trào cần vượt thế giữ gìn lực lượng, phát huy quần chúng.",
      "decision": "Kết hợp nổi dậy của quần chúng với lực lượng vũ trang.",
      "result": "Góp phần chuyển cách mạng miền Nam sang thế tiến công.",
      "date": "1960-01-17",
      "datePrecision": "day",
      "displayDate": "17/01/1960",
      "sourceId": "textbook-2019-ch2",
      "imageId": null
    },
    {
      "id": "dai-hoi-iii",
      "title": "Hai chiến lược, một mục tiêu",
      "chapter": 2,
      "year": 1960,
      "region": "Cả nước",
      "place": "Hà Nội",
      "context": "Miền Bắc xây dựng hậu phương, miền Nam phát triển đấu tranh giải phóng.",
      "decision": "Đại hội III xác định hai nhiệm vụ chiến lược cách mạng ở hai miền.",
      "result": "Kết hợp sức mạnh hậu phương và tiền tuyến vì thống nhất đất nước.",
      "date": "1960-09",
      "datePrecision": "month",
      "displayDate": "09/1960",
      "sourceId": "textbook-2019-ch2",
      "imageId": null
    },
    {
      "id": "mau-than",
      "title": "Tổng tiến công và nổi dậy Tết Mậu Thân",
      "chapter": 2,
      "year": 1968,
      "region": "Miền Nam",
      "place": "Nhiều đô thị miền Nam",
      "context": "Cuộc kháng chiến chống Mỹ cần tạo chuyển biến chiến lược.",
      "decision": "Tiến công và nổi dậy trên nhiều địa bàn trong dịp Tết Mậu Thân.",
      "result": "Tác động mạnh tới cục diện chiến tranh và quá trình đàm phán; có tổn thất và hạn chế.",
      "date": "1968",
      "datePrecision": "year",
      "displayDate": "1968",
      "sourceId": "textbook-2019-ch2",
      "imageId": null
    },
    {
      "id": "dien-bien-tren-khong",
      "title": "Bảo vệ bầu trời miền Bắc",
      "chapter": 2,
      "year": 1972,
      "region": "Miền Bắc",
      "place": "Hà Nội, Hải Phòng",
      "context": "Mỹ mở cuộc tập kích đường không chiến lược tháng 12/1972.",
      "decision": "Quân và dân miền Bắc tổ chức chiến đấu bảo vệ các địa bàn trọng yếu.",
      "result": "Thắng lợi góp phần buộc Mỹ ký Hiệp định Paris.",
      "date": "1972-12",
      "datePrecision": "month",
      "displayDate": "12/1972",
      "sourceId": "textbook-2019-ch2",
      "imageId": null
    },
    {
      "id": "paris",
      "title": "Hiệp định Paris",
      "chapter": 2,
      "year": 1973,
      "region": "Cả nước",
      "place": "Paris",
      "context": "Đấu tranh quân sự, chính trị và ngoại giao tạo chuyển biến cục diện.",
      "decision": "Ký Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam.",
      "result": "Mỹ rút quân; nhiệm vụ giải phóng miền Nam còn tiếp tục.",
      "date": "1973-01-27",
      "datePrecision": "day",
      "displayDate": "27/01/1973",
      "sourceId": "textbook-2019-ch2",
      "imageId": null
    },
    {
      "id": "giai-phong",
      "title": "Mùa xuân toàn thắng",
      "chapter": 2,
      "year": 1975,
      "region": "Miền Nam",
      "place": "Sài Gòn",
      "context": "Thắng lợi trên các chiến trường tạo thời cơ giải phóng miền Nam.",
      "decision": "Chiến dịch Hồ Chí Minh tiến tới giải phóng Sài Gòn.",
      "result": "Giải phóng miền Nam, kết thúc chiến tranh; mở thời kỳ cả nước đi lên chủ nghĩa xã hội.",
      "date": "1975-04-30",
      "datePrecision": "day",
      "displayDate": "30/04/1975",
      "sourceId": "textbook-2019-ch2",
      "imageId": "sai-gon"
    },
    {
      "id": "thong-nhat",
      "title": "Thống nhất về mặt nhà nước",
      "chapter": 3,
      "year": 1976,
      "region": "Cả nước",
      "place": "Hà Nội",
      "context": "Sau giải phóng cần hoàn thành thống nhất về tổ chức nhà nước.",
      "decision": "Quốc hội khóa VI quyết định tên nước Cộng hòa xã hội chủ nghĩa Việt Nam.",
      "result": "Hoàn thành thống nhất đất nước về mặt nhà nước.",
      "date": "1976-07-02",
      "datePrecision": "day",
      "displayDate": "02/07/1976",
      "sourceId": "textbook-2019-ch3",
      "imageId": null
    },
    {
      "id": "doi-moi",
      "title": "Đại hội VI: khởi xướng Đổi mới",
      "chapter": 3,
      "year": 1986,
      "region": "Cả nước",
      "place": "Hà Nội",
      "context": "Khó khăn kinh tế – xã hội đòi hỏi đổi mới tư duy và cơ chế quản lý.",
      "decision": "Đề ra đường lối đổi mới toàn diện đất nước.",
      "result": "Mở bước ngoặt trong quá trình xây dựng và phát triển.",
      "date": "1986-12",
      "datePrecision": "month",
      "displayDate": "12/1986",
      "sourceId": "textbook-2019-ch3",
      "imageId": null
    },
    {
      "id": "cuong-linh",
      "title": "Cương lĩnh xây dựng đất nước",
      "chapter": 3,
      "year": 1991,
      "region": "Cả nước",
      "place": "Hà Nội",
      "context": "Tình hình thế giới biến động, đất nước tiếp tục công cuộc đổi mới.",
      "decision": "Đại hội VII thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ.",
      "result": "Xác định định hướng và những vấn đề cơ bản của con đường phát triển.",
      "date": "1991-06",
      "datePrecision": "month",
      "displayDate": "06/1991",
      "sourceId": "textbook-2019-ch3",
      "imageId": null
    },
    {
      "id": "asean",
      "title": "Việt Nam gia nhập ASEAN",
      "chapter": 3,
      "year": 1995,
      "region": "Quốc tế",
      "place": "Đông Nam Á",
      "context": "Đổi mới gắn với mở rộng quan hệ đối ngoại và hội nhập.",
      "decision": "Việt Nam trở thành thành viên ASEAN.",
      "result": "Tăng cường liên kết khu vực và mở rộng hợp tác.",
      "date": "1995-07-28",
      "datePrecision": "day",
      "displayDate": "28/07/1995",
      "sourceId": "textbook-2019-ch3",
      "imageId": null
    },
    {
      "id": "wto",
      "title": "Bước hội nhập kinh tế toàn cầu",
      "chapter": 3,
      "year": 2007,
      "region": "Quốc tế",
      "place": "Việt Nam – thế giới",
      "context": "Quá trình đổi mới mở rộng sự tham gia vào các thể chế kinh tế quốc tế.",
      "decision": "Việt Nam chính thức trở thành thành viên WTO.",
      "result": "Mở cơ hội và đặt ra yêu cầu nâng năng lực cạnh tranh, thực hiện cam kết.",
      "date": "2007-01-11",
      "datePrecision": "day",
      "displayDate": "11/01/2007",
      "sourceId": "textbook-2019-ch3",
      "imageId": null
    },
    {
      "id": "cuong-linh-2011",
      "title": "Bổ sung, phát triển Cương lĩnh",
      "chapter": 3,
      "year": 2011,
      "region": "Cả nước",
      "place": "Hà Nội",
      "context": "Đổi mới tiếp tục đặt ra yêu cầu tổng kết thực tiễn và phát triển nhận thức.",
      "decision": "Đại hội XI thông qua Cương lĩnh bổ sung, phát triển năm 2011.",
      "result": "Tiếp tục làm rõ định hướng xây dựng đất nước trong thời kỳ quá độ.",
      "date": "2011-01",
      "datePrecision": "month",
      "displayDate": "01/2011",
      "sourceId": "textbook-2019-ch3",
      "imageId": null
    },
    {
      "id": "kinh-te-bien",
      "title": "Hướng tới phát triển kinh tế biển bền vững",
      "chapter": 3,
      "year": 2018,
      "region": "Cả nước",
      "place": "Việt Nam",
      "context": "Phát triển kinh tế đặt ra yêu cầu gắn với môi trường và bảo vệ chủ quyền.",
      "decision": "Hội nghị Trung ương 8 khóa XII đề ra chiến lược phát triển bền vững kinh tế biển.",
      "result": "Kết hợp mục tiêu phát triển với bảo vệ môi trường và quốc phòng – an ninh.",
      "date": "2018-10",
      "datePrecision": "month",
      "displayDate": "10/2018",
      "sourceId": "textbook-2019-ch3",
      "imageId": null
    }
  ],
  "questions": [
    {
      "id": "tours-year",
      "eventId": "tours",
      "chapter": 1,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Bước ngoặt ở Đại hội Tours” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1920"
        },
        {
          "id": "b",
          "text": "1925"
        },
        {
          "id": "c",
          "text": "1927"
        },
        {
          "id": "d",
          "text": "1930"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1920: Phong trào yêu nước Việt Nam đứng trước yêu cầu tìm con đường giải phóng mới. Đánh dấu bước chuyển từ chủ nghĩa yêu nước đến chủ nghĩa cộng sản.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "tours-meaning",
      "eventId": "tours",
      "chapter": 1,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Ý nghĩa cốt lõi của lựa chọn tại Tours là gì?",
      "options": [
        {
          "id": "a",
          "text": "Bước chuyển lập trường, gắn giải phóng dân tộc với con đường cách mạng vô sản."
        },
        {
          "id": "b",
          "text": "Thành lập ngay Đảng Cộng sản Việt Nam."
        },
        {
          "id": "c",
          "text": "Hoàn thành việc giành chính quyền trong cả nước."
        },
        {
          "id": "d",
          "text": "Thay hoạt động cách mạng bằng cải cách thuộc địa."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đánh dấu bước chuyển từ chủ nghĩa yêu nước đến chủ nghĩa cộng sản. Nguyễn Ái Quốc tán thành Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "thanh-nien-year",
      "eventId": "thanh-nien",
      "chapter": 1,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Chuẩn bị lực lượng cách mạng” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1925"
        },
        {
          "id": "b",
          "text": "1927"
        },
        {
          "id": "c",
          "text": "1920"
        },
        {
          "id": "d",
          "text": "1930"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1925: Cần chuẩn bị về tổ chức và truyền bá lý luận vào phong trào trong nước. Đào tạo cán bộ và chuẩn bị tổ chức cho sự ra đời của Đảng.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "thanh-nien-meaning",
      "eventId": "thanh-nien",
      "chapter": 1,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Vì sao hoạt động huấn luyện và truyền bá lý luận có ý nghĩa?",
      "options": [
        {
          "id": "a",
          "text": "Kết nối lý luận với phong trào và chuẩn bị đội ngũ, tổ chức."
        },
        {
          "id": "b",
          "text": "Thay thế hoàn toàn phong trào công nhân trong nước."
        },
        {
          "id": "c",
          "text": "Đồng nghĩa đã có chính quyền cách mạng."
        },
        {
          "id": "d",
          "text": "Chỉ phục vụ hoạt động văn hóa, không liên quan tổ chức."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đào tạo cán bộ và chuẩn bị tổ chức cho sự ra đời của Đảng. Nguyễn Ái Quốc thành lập Hội Việt Nam Cách mạng Thanh niên.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "duong-kach-menh-year",
      "eventId": "duong-kach-menh",
      "chapter": 1,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Đường Kách mệnh” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1927"
        },
        {
          "id": "b",
          "text": "1925"
        },
        {
          "id": "c",
          "text": "1930"
        },
        {
          "id": "d",
          "text": "1920"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1927: Các lớp huấn luyện cán bộ cần một hệ thống lý luận và phương pháp hoạt động. Góp phần chuẩn bị tư tưởng, chính trị và tổ chức cho cách mạng.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "duong-kach-menh-meaning",
      "eventId": "duong-kach-menh",
      "chapter": 1,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Tác phẩm góp phần vào quá trình nào?",
      "options": [
        {
          "id": "a",
          "text": "Chuẩn bị tư tưởng và đào tạo cán bộ cách mạng."
        },
        {
          "id": "b",
          "text": "Thực hiện kế hoạch kinh tế năm năm."
        },
        {
          "id": "c",
          "text": "Kết thúc kháng chiến chống Pháp."
        },
        {
          "id": "d",
          "text": "Tổ chức tổng tuyển cử thống nhất đất nước."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Góp phần chuẩn bị tư tưởng, chính trị và tổ chức cho cách mạng. Tập hợp các bài giảng của Nguyễn Ái Quốc thành tác phẩm Đường Kách mệnh.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "thanh-lap-dang-year",
      "eventId": "thanh-lap-dang",
      "chapter": 1,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Đảng ra đời, Cương lĩnh đầu tiên” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1930"
        },
        {
          "id": "b",
          "text": "1927"
        },
        {
          "id": "c",
          "text": "1925"
        },
        {
          "id": "d",
          "text": "1936"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1930: Các tổ chức cộng sản ra đời nhưng hoạt động phân tán, cần thống nhất. Tạo sự thống nhất lãnh đạo và định hướng giải phóng dân tộc.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "thanh-lap-dang-meaning",
      "eventId": "thanh-lap-dang",
      "chapter": 1,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Ý nghĩa của việc thống nhất các tổ chức cộng sản là gì?",
      "options": [
        {
          "id": "a",
          "text": "Khắc phục phân tán, thống nhất tổ chức và đường lối lãnh đạo."
        },
        {
          "id": "b",
          "text": "Hoàn thành ngay cách mạng dân tộc dân chủ."
        },
        {
          "id": "c",
          "text": "Chấm dứt nhu cầu xây dựng lực lượng quần chúng."
        },
        {
          "id": "d",
          "text": "Chuyển mục tiêu sang phát triển kinh tế thuộc địa."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Tạo sự thống nhất lãnh đạo và định hướng giải phóng dân tộc. Hội nghị do Nguyễn Ái Quốc chủ trì hợp nhất các tổ chức và thông qua Cương lĩnh đầu tiên.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "dan-chu-year",
      "eventId": "dan-chu",
      "chapter": 1,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Phong trào dân chủ 1936–1939” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1936"
        },
        {
          "id": "b",
          "text": "1941"
        },
        {
          "id": "c",
          "text": "1930"
        },
        {
          "id": "d",
          "text": "1927"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1936: Tình hình quốc tế và trong nước có điều kiện mới cho đấu tranh dân chủ. Mở rộng tập hợp quần chúng, tích lũy kinh nghiệm tổ chức đấu tranh.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "dan-chu-meaning",
      "eventId": "dan-chu",
      "chapter": 1,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Sự điều chỉnh hình thức đấu tranh thể hiện điều gì?",
      "options": [
        {
          "id": "a",
          "text": "Vận dụng linh hoạt theo hoàn cảnh để tập hợp lực lượng."
        },
        {
          "id": "b",
          "text": "Từ bỏ mục tiêu giải phóng dân tộc."
        },
        {
          "id": "c",
          "text": "Chỉ dựa vào khởi nghĩa vũ trang đồng loạt."
        },
        {
          "id": "d",
          "text": "Tách phong trào khỏi những yêu cầu đời sống."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mở rộng tập hợp quần chúng, tích lũy kinh nghiệm tổ chức đấu tranh. Kết hợp các hình thức hợp pháp, nửa hợp pháp, đòi dân sinh và dân chủ.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "viet-minh-year",
      "eventId": "viet-minh",
      "chapter": 1,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Đặt giải phóng dân tộc lên hàng đầu” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1941"
        },
        {
          "id": "b",
          "text": "1945"
        },
        {
          "id": "c",
          "text": "1936"
        },
        {
          "id": "d",
          "text": "1946"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1941: Chiến tranh thế giới và ách thống trị đặt dân tộc trước nhiệm vụ cấp bách. Mở rộng đoàn kết và chuẩn bị cho khởi nghĩa giành chính quyền.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "viet-minh-meaning",
      "eventId": "viet-minh",
      "chapter": 1,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Vì sao cần tập hợp rộng rãi lực lượng dân tộc?",
      "options": [
        {
          "id": "a",
          "text": "Giải phóng dân tộc là nhiệm vụ cấp bách, cần phát huy sức mạnh đoàn kết."
        },
        {
          "id": "b",
          "text": "Vì mọi mâu thuẫn xã hội đã chấm dứt."
        },
        {
          "id": "c",
          "text": "Vì không còn cần chuẩn bị lực lượng chính trị."
        },
        {
          "id": "d",
          "text": "Vì chỉ một nhóm nghề nghiệp có thể giành chính quyền."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mở rộng đoàn kết và chuẩn bị cho khởi nghĩa giành chính quyền. Hội nghị Trung ương 8 hoàn chỉnh chuyển hướng chiến lược; thành lập Mặt trận Việt Minh.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "thang-tam-year",
      "eventId": "thang-tam",
      "chapter": 1,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Tổng khởi nghĩa Tháng Tám” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1945"
        },
        {
          "id": "b",
          "text": "1946"
        },
        {
          "id": "c",
          "text": "1941"
        },
        {
          "id": "d",
          "text": "1951"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1945: Nhật đầu hàng Đồng minh, thời cơ cách mạng xuất hiện. Chính quyền về tay nhân dân ở nhiều địa phương và trên phạm vi cả nước.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "thang-tam-meaning",
      "eventId": "thang-tam",
      "chapter": 1,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Thắng lợi đặt ra bài học nổi bật nào?",
      "options": [
        {
          "id": "a",
          "text": "Chuẩn bị lực lượng lâu dài và kịp thời chớp thời cơ."
        },
        {
          "id": "b",
          "text": "Chỉ chờ hoàn cảnh quốc tế mà không chuẩn bị."
        },
        {
          "id": "c",
          "text": "Thời cơ có thể thay thế tổ chức và quần chúng."
        },
        {
          "id": "d",
          "text": "Khởi nghĩa không liên quan tới sự phối hợp địa phương."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Chính quyền về tay nhân dân ở nhiều địa phương và trên phạm vi cả nước. Lãnh đạo toàn dân tổng khởi nghĩa giành chính quyền.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "doc-lap-year",
      "eventId": "doc-lap",
      "chapter": 1,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Ngày khai sinh một nhà nước mới” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1945"
        },
        {
          "id": "b",
          "text": "1946"
        },
        {
          "id": "c",
          "text": "1941"
        },
        {
          "id": "d",
          "text": "1951"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1945: Cách mạng Tháng Tám thắng lợi, cần tuyên bố nền độc lập trước quốc dân và thế giới. Nước Việt Nam Dân chủ Cộng hòa ra đời.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "doc-lap-meaning",
      "eventId": "doc-lap",
      "chapter": 1,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Cần phân biệt tuyên bố độc lập với nhiệm vụ nào sau đó?",
      "options": [
        {
          "id": "a",
          "text": "Bảo vệ chính quyền và độc lập trước những khó khăn, thách thức mới."
        },
        {
          "id": "b",
          "text": "Nền độc lập tự bảo đảm không cần bảo vệ."
        },
        {
          "id": "c",
          "text": "Hoàn thành toàn bộ công cuộc xây dựng chủ nghĩa xã hội."
        },
        {
          "id": "d",
          "text": "Chấm dứt mọi thách thức về kinh tế và đối ngoại."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Nước Việt Nam Dân chủ Cộng hòa ra đời. Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập.",
      "sourceId": "textbook-2019-ch1"
    },
    {
      "id": "khang-chien-year",
      "eventId": "khang-chien",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Toàn quốc kháng chiến” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1946"
        },
        {
          "id": "b",
          "text": "1945"
        },
        {
          "id": "c",
          "text": "1941"
        },
        {
          "id": "d",
          "text": "1951"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1946: Nỗ lực hòa hoãn không ngăn được việc thực dân Pháp mở rộng xâm lược. Cuộc kháng chiến chống Pháp phát triển trên phạm vi cả nước.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "khang-chien-meaning",
      "eventId": "khang-chien",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Tính toàn dân, toàn diện của kháng chiến được hiểu thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Huy động sức dân và phối hợp nhiều mặt đấu tranh."
        },
        {
          "id": "b",
          "text": "Chỉ giao toàn bộ nhiệm vụ cho quân đội."
        },
        {
          "id": "c",
          "text": "Tách kinh tế, chính trị khỏi nhiệm vụ kháng chiến."
        },
        {
          "id": "d",
          "text": "Chỉ dựa vào viện trợ từ bên ngoài."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Cuộc kháng chiến chống Pháp phát triển trên phạm vi cả nước. Phát động toàn quốc kháng chiến, bảo vệ độc lập.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "dai-hoi-ii-year",
      "eventId": "dai-hoi-ii",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Đại hội II của Đảng” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1951"
        },
        {
          "id": "b",
          "text": "1954"
        },
        {
          "id": "c",
          "text": "1946"
        },
        {
          "id": "d",
          "text": "1945"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1951: Kháng chiến cần tiếp tục củng cố tổ chức và đường lối lãnh đạo. Tăng cường sự lãnh đạo và sức mạnh tổ chức trong kháng chiến.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "dai-hoi-ii-meaning",
      "eventId": "dai-hoi-ii",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Đại hội II diễn ra trong bối cảnh chủ yếu nào?",
      "options": [
        {
          "id": "a",
          "text": "Kháng chiến chống thực dân Pháp."
        },
        {
          "id": "b",
          "text": "Bắt đầu công cuộc Đổi mới năm 1986."
        },
        {
          "id": "c",
          "text": "Kháng chiến chống Chiến tranh cục bộ."
        },
        {
          "id": "d",
          "text": "Việt Nam gia nhập WTO."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Tăng cường sự lãnh đạo và sức mạnh tổ chức trong kháng chiến. Đảng hoạt động công khai với tên Đảng Lao động Việt Nam.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "dien-bien-year",
      "eventId": "dien-bien",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Điện Biên Phủ: bước ngoặt quyết định” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1954"
        },
        {
          "id": "b",
          "text": "1951"
        },
        {
          "id": "c",
          "text": "1959"
        },
        {
          "id": "d",
          "text": "1960"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1954: Kế hoạch Nava tìm cách giành lại thế chủ động quân sự. Tạo cơ sở quân sự quan trọng cho giải pháp ngoại giao tại Giơnevơ.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "dien-bien-meaning",
      "eventId": "dien-bien",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Quan hệ giữa thắng lợi quân sự và ngoại giao được thể hiện thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Thắng lợi quân sự tạo điều kiện và thế cho đấu tranh ngoại giao."
        },
        {
          "id": "b",
          "text": "Hai mặt không liên quan vì diễn ra ở nơi khác nhau."
        },
        {
          "id": "c",
          "text": "Ngoại giao làm mọi chuẩn bị quân sự mất ý nghĩa."
        },
        {
          "id": "d",
          "text": "Thắng lợi này đã hoàn thành thống nhất đất nước."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Tạo cơ sở quân sự quan trọng cho giải pháp ngoại giao tại Giơnevơ. Tập trung sức mạnh cho trận quyết chiến chiến lược Điện Biên Phủ.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "geneva-year",
      "eventId": "geneva",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Giơnevơ và cục diện hai miền” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1954"
        },
        {
          "id": "b",
          "text": "1951"
        },
        {
          "id": "c",
          "text": "1959"
        },
        {
          "id": "d",
          "text": "1960"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1954: Thắng lợi kháng chiến tạo cơ sở cho đàm phán kết thúc chiến tranh. Miền Bắc được giải phóng; đất nước tạm thời chia cắt, thống nhất chưa hoàn thành.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "geneva-meaning",
      "eventId": "geneva",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Vì sao nhiệm vụ hai miền sau đó khác nhau?",
      "options": [
        {
          "id": "a",
          "text": "Điều kiện chính trị – xã hội khác nhau, nhưng cùng mục tiêu thống nhất."
        },
        {
          "id": "b",
          "text": "Hai miền có hai mục tiêu quốc gia không liên hệ."
        },
        {
          "id": "c",
          "text": "Miền Nam đã hoàn tất giải phóng dân tộc."
        },
        {
          "id": "d",
          "text": "Khác biệt chỉ do địa hình và khí hậu."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Miền Bắc được giải phóng; đất nước tạm thời chia cắt, thống nhất chưa hoàn thành. Hiệp định Giơnevơ về Đông Dương được ký kết.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "nghi-quyet-15-year",
      "eventId": "nghi-quyet-15",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Nghị quyết 15: mở hướng đấu tranh” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1959"
        },
        {
          "id": "b",
          "text": "1960"
        },
        {
          "id": "c",
          "text": "1954"
        },
        {
          "id": "d",
          "text": "1951"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1959: Chính sách đàn áp đặt phong trào trước yêu cầu chuyển biến phương thức đấu tranh. Tạo định hướng cho sự phát triển của phong trào cách mạng miền Nam.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "nghi-quyet-15-meaning",
      "eventId": "nghi-quyet-15",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Cách hiểu nào đúng về sự kết hợp này?",
      "options": [
        {
          "id": "a",
          "text": "Phát triển đấu tranh vũ trang gắn với lực lượng chính trị quần chúng."
        },
        {
          "id": "b",
          "text": "Thay thế hoàn toàn đấu tranh chính trị."
        },
        {
          "id": "c",
          "text": "Bỏ cơ sở quần chúng để chỉ dựa vào quân đội."
        },
        {
          "id": "d",
          "text": "Chỉ vận động quốc tế và dừng hoạt động trong nước."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Tạo định hướng cho sự phát triển của phong trào cách mạng miền Nam. Kết hợp đấu tranh chính trị với đấu tranh vũ trang.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "dong-khoi-year",
      "eventId": "dong-khoi",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Đồng khởi Bến Tre” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1960"
        },
        {
          "id": "b",
          "text": "1959"
        },
        {
          "id": "c",
          "text": "1954"
        },
        {
          "id": "d",
          "text": "1968"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1960: Phong trào cần vượt thế giữ gìn lực lượng, phát huy quần chúng. Góp phần chuyển cách mạng miền Nam sang thế tiến công.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "dong-khoi-meaning",
      "eventId": "dong-khoi",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Ý nghĩa bước ngoặt cần phân biệt với điều gì?",
      "options": [
        {
          "id": "a",
          "text": "Thắng lợi cuối cùng giải phóng miền Nam, chưa diễn ra vào năm 1960."
        },
        {
          "id": "b",
          "text": "Việc không có quần chúng tham gia."
        },
        {
          "id": "c",
          "text": "Việc miền Bắc dừng toàn bộ xây dựng kinh tế."
        },
        {
          "id": "d",
          "text": "Việc phong trào quay lại chỉ giữ gìn lực lượng."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Góp phần chuyển cách mạng miền Nam sang thế tiến công. Kết hợp nổi dậy của quần chúng với lực lượng vũ trang.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "dai-hoi-iii-year",
      "eventId": "dai-hoi-iii",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Hai chiến lược, một mục tiêu” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1960"
        },
        {
          "id": "b",
          "text": "1959"
        },
        {
          "id": "c",
          "text": "1954"
        },
        {
          "id": "d",
          "text": "1968"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1960: Miền Bắc xây dựng hậu phương, miền Nam phát triển đấu tranh giải phóng. Kết hợp sức mạnh hậu phương và tiền tuyến vì thống nhất đất nước.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "dai-hoi-iii-meaning",
      "eventId": "dai-hoi-iii",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Phân biệt nào đúng về vai trò hai miền?",
      "options": [
        {
          "id": "a",
          "text": "Miền Bắc quyết định nhất đối với cả nước; miền Nam quyết định trực tiếp việc giải phóng miền Nam."
        },
        {
          "id": "b",
          "text": "Hai miền có vai trò giống nhau nên không cần phân biệt."
        },
        {
          "id": "c",
          "text": "Miền Nam quyết định nhất việc xây dựng kinh tế miền Bắc."
        },
        {
          "id": "d",
          "text": "Miền Bắc có thể thay toàn bộ lực lượng tại miền Nam."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Kết hợp sức mạnh hậu phương và tiền tuyến vì thống nhất đất nước. Đại hội III xác định hai nhiệm vụ chiến lược cách mạng ở hai miền.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "mau-than-year",
      "eventId": "mau-than",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Tổng tiến công và nổi dậy Tết Mậu Thân” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1968"
        },
        {
          "id": "b",
          "text": "1972"
        },
        {
          "id": "c",
          "text": "1973"
        },
        {
          "id": "d",
          "text": "1975"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1968: Cuộc kháng chiến chống Mỹ cần tạo chuyển biến chiến lược. Tác động mạnh tới cục diện chiến tranh và quá trình đàm phán; có tổn thất và hạn chế.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "mau-than-meaning",
      "eventId": "mau-than",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Cách đánh giá nào phù hợp với nghiên cứu lịch sử?",
      "options": [
        {
          "id": "a",
          "text": "Xét tác động chiến lược đồng thời nhận diện tổn thất và hạn chế."
        },
        {
          "id": "b",
          "text": "Chỉ nhìn kết quả một trận để suy ra toàn bộ cục diện."
        },
        {
          "id": "c",
          "text": "Coi mọi mục tiêu đều đạt nguyên vẹn."
        },
        {
          "id": "d",
          "text": "Bỏ bối cảnh chính trị và ngoại giao khi đánh giá."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Tác động mạnh tới cục diện chiến tranh và quá trình đàm phán; có tổn thất và hạn chế. Tiến công và nổi dậy trên nhiều địa bàn trong dịp Tết Mậu Thân.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "dien-bien-tren-khong-year",
      "eventId": "dien-bien-tren-khong",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Bảo vệ bầu trời miền Bắc” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1972"
        },
        {
          "id": "b",
          "text": "1973"
        },
        {
          "id": "c",
          "text": "1975"
        },
        {
          "id": "d",
          "text": "1968"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1972: Mỹ mở cuộc tập kích đường không chiến lược tháng 12/1972. Thắng lợi góp phần buộc Mỹ ký Hiệp định Paris.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "dien-bien-tren-khong-meaning",
      "eventId": "dien-bien-tren-khong",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Thắng lợi này gắn với tiến trình ngoại giao nào?",
      "options": [
        {
          "id": "a",
          "text": "Đàm phán và ký Hiệp định Paris."
        },
        {
          "id": "b",
          "text": "Hội nghị thành lập Đảng năm 1930."
        },
        {
          "id": "c",
          "text": "Hiệp định Giơnevơ năm 1954."
        },
        {
          "id": "d",
          "text": "Việt Nam gia nhập ASEAN."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Thắng lợi góp phần buộc Mỹ ký Hiệp định Paris. Quân và dân miền Bắc tổ chức chiến đấu bảo vệ các địa bàn trọng yếu.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "paris-year",
      "eventId": "paris",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Hiệp định Paris” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1973"
        },
        {
          "id": "b",
          "text": "1972"
        },
        {
          "id": "c",
          "text": "1975"
        },
        {
          "id": "d",
          "text": "1976"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1973: Đấu tranh quân sự, chính trị và ngoại giao tạo chuyển biến cục diện. Mỹ rút quân; nhiệm vụ giải phóng miền Nam còn tiếp tục.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "paris-meaning",
      "eventId": "paris",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Vì sao không đồng nhất Paris với hoàn thành thống nhất?",
      "options": [
        {
          "id": "a",
          "text": "Hiệp định tạo điều kiện mới nhưng nhiệm vụ giải phóng miền Nam chưa hoàn tất."
        },
        {
          "id": "b",
          "text": "Vì Hiệp định diễn ra trước cuộc kháng chiến chống Pháp."
        },
        {
          "id": "c",
          "text": "Vì Hiệp định chỉ điều chỉnh quan hệ thương mại."
        },
        {
          "id": "d",
          "text": "Vì các nhiệm vụ chính trị đã chấm dứt từ năm 1960."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mỹ rút quân; nhiệm vụ giải phóng miền Nam còn tiếp tục. Ký Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "giai-phong-year",
      "eventId": "giai-phong",
      "chapter": 2,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Mùa xuân toàn thắng” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1975"
        },
        {
          "id": "b",
          "text": "1976"
        },
        {
          "id": "c",
          "text": "1973"
        },
        {
          "id": "d",
          "text": "1972"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1975: Thắng lợi trên các chiến trường tạo thời cơ giải phóng miền Nam. Giải phóng miền Nam, kết thúc chiến tranh; mở thời kỳ cả nước đi lên chủ nghĩa xã hội.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "giai-phong-meaning",
      "eventId": "giai-phong",
      "chapter": 2,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Cần phân biệt thắng lợi năm 1975 với mốc nào?",
      "options": [
        {
          "id": "a",
          "text": "Hoàn thành thống nhất đất nước về mặt nhà nước năm 1976."
        },
        {
          "id": "b",
          "text": "Ngày thành lập Hội Việt Nam Cách mạng Thanh niên."
        },
        {
          "id": "c",
          "text": "Thời điểm bắt đầu kháng chiến toàn quốc."
        },
        {
          "id": "d",
          "text": "Năm ký Hiệp định Giơnevơ."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Giải phóng miền Nam, kết thúc chiến tranh; mở thời kỳ cả nước đi lên chủ nghĩa xã hội. Chiến dịch Hồ Chí Minh tiến tới giải phóng Sài Gòn.",
      "sourceId": "textbook-2019-ch2"
    },
    {
      "id": "thong-nhat-year",
      "eventId": "thong-nhat",
      "chapter": 3,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Thống nhất về mặt nhà nước” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1976"
        },
        {
          "id": "b",
          "text": "1975"
        },
        {
          "id": "c",
          "text": "1973"
        },
        {
          "id": "d",
          "text": "1972"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1976: Sau giải phóng cần hoàn thành thống nhất về tổ chức nhà nước. Hoàn thành thống nhất đất nước về mặt nhà nước.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "thong-nhat-meaning",
      "eventId": "thong-nhat",
      "chapter": 3,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Vì sao phân biệt mốc 1975 và 1976?",
      "options": [
        {
          "id": "a",
          "text": "Phân biệt thắng lợi giải phóng với quá trình hoàn thành thống nhất nhà nước."
        },
        {
          "id": "b",
          "text": "Hai mốc chỉ là hai cách gọi của cùng một ngày."
        },
        {
          "id": "c",
          "text": "Năm 1976 mới bắt đầu chiến dịch Hồ Chí Minh."
        },
        {
          "id": "d",
          "text": "Năm 1975 đã hoàn tất mọi nhiệm vụ của thời kỳ quá độ."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Hoàn thành thống nhất đất nước về mặt nhà nước. Quốc hội khóa VI quyết định tên nước Cộng hòa xã hội chủ nghĩa Việt Nam.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "doi-moi-year",
      "eventId": "doi-moi",
      "chapter": 3,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Đại hội VI: khởi xướng Đổi mới” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1986"
        },
        {
          "id": "b",
          "text": "1991"
        },
        {
          "id": "c",
          "text": "1995"
        },
        {
          "id": "d",
          "text": "1976"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1986: Khó khăn kinh tế – xã hội đòi hỏi đổi mới tư duy và cơ chế quản lý. Mở bước ngoặt trong quá trình xây dựng và phát triển.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "doi-moi-meaning",
      "eventId": "doi-moi",
      "chapter": 3,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Đổi mới được hiểu đúng theo giáo trình như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Đổi mới tư duy, cách làm phù hợp thực tiễn, giữ định hướng xây dựng chủ nghĩa xã hội."
        },
        {
          "id": "b",
          "text": "Từ bỏ mọi mục tiêu đã xác định để chỉ tăng trưởng kinh tế."
        },
        {
          "id": "c",
          "text": "Chỉ đổi tên cơ quan, không đổi cơ chế quản lý."
        },
        {
          "id": "d",
          "text": "Phủ nhận toàn bộ kinh nghiệm của các giai đoạn trước."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mở bước ngoặt trong quá trình xây dựng và phát triển. Đề ra đường lối đổi mới toàn diện đất nước.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "cuong-linh-year",
      "eventId": "cuong-linh",
      "chapter": 3,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Cương lĩnh xây dựng đất nước” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1991"
        },
        {
          "id": "b",
          "text": "1995"
        },
        {
          "id": "c",
          "text": "1986"
        },
        {
          "id": "d",
          "text": "1976"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1991: Tình hình thế giới biến động, đất nước tiếp tục công cuộc đổi mới. Xác định định hướng và những vấn đề cơ bản của con đường phát triển.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "cuong-linh-meaning",
      "eventId": "cuong-linh",
      "chapter": 3,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Cương lĩnh năm 1991 thuộc đại hội nào?",
      "options": [
        {
          "id": "a",
          "text": "Đại hội VII."
        },
        {
          "id": "b",
          "text": "Đại hội III."
        },
        {
          "id": "c",
          "text": "Đại hội VI."
        },
        {
          "id": "d",
          "text": "Đại hội II."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Xác định định hướng và những vấn đề cơ bản của con đường phát triển. Đại hội VII thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "asean-year",
      "eventId": "asean",
      "chapter": 3,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Việt Nam gia nhập ASEAN” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "1995"
        },
        {
          "id": "b",
          "text": "1991"
        },
        {
          "id": "c",
          "text": "1986"
        },
        {
          "id": "d",
          "text": "2007"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 1995: Đổi mới gắn với mở rộng quan hệ đối ngoại và hội nhập. Tăng cường liên kết khu vực và mở rộng hợp tác.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "asean-meaning",
      "eventId": "asean",
      "chapter": 3,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Sự kiện thể hiện hướng phát triển nào?",
      "options": [
        {
          "id": "a",
          "text": "Đa dạng hóa quan hệ và chủ động hợp tác, hội nhập khu vực."
        },
        {
          "id": "b",
          "text": "Khép kín nền kinh tế để giữ tự chủ."
        },
        {
          "id": "c",
          "text": "Từ bỏ vai trò đối ngoại của nhà nước."
        },
        {
          "id": "d",
          "text": "Chấm dứt nhu cầu phát triển nguồn lực trong nước."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Tăng cường liên kết khu vực và mở rộng hợp tác. Việt Nam trở thành thành viên ASEAN.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "wto-year",
      "eventId": "wto",
      "chapter": 3,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Bước hội nhập kinh tế toàn cầu” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "2007"
        },
        {
          "id": "b",
          "text": "2011"
        },
        {
          "id": "c",
          "text": "2018"
        },
        {
          "id": "d",
          "text": "1995"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 2007: Quá trình đổi mới mở rộng sự tham gia vào các thể chế kinh tế quốc tế. Mở cơ hội và đặt ra yêu cầu nâng năng lực cạnh tranh, thực hiện cam kết.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "wto-meaning",
      "eventId": "wto",
      "chapter": 3,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Cách hiểu nào đúng về cơ hội hội nhập?",
      "options": [
        {
          "id": "a",
          "text": "Cơ hội cần đi cùng nâng năng lực và thực hiện cam kết."
        },
        {
          "id": "b",
          "text": "Tư cách thành viên tự bảo đảm thành công mọi lĩnh vực."
        },
        {
          "id": "c",
          "text": "Hội nhập thay thế nhu cầu đổi mới bên trong."
        },
        {
          "id": "d",
          "text": "Hội nhập đòi hỏi không giữ vai trò chủ động trong phát triển."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mở cơ hội và đặt ra yêu cầu nâng năng lực cạnh tranh, thực hiện cam kết. Việt Nam chính thức trở thành thành viên WTO.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "cuong-linh-2011-year",
      "eventId": "cuong-linh-2011",
      "chapter": 3,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Bổ sung, phát triển Cương lĩnh” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "2011"
        },
        {
          "id": "b",
          "text": "2007"
        },
        {
          "id": "c",
          "text": "2018"
        },
        {
          "id": "d",
          "text": "1995"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 2011: Đổi mới tiếp tục đặt ra yêu cầu tổng kết thực tiễn và phát triển nhận thức. Tiếp tục làm rõ định hướng xây dựng đất nước trong thời kỳ quá độ.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "cuong-linh-2011-meaning",
      "eventId": "cuong-linh-2011",
      "chapter": 3,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Quan hệ giữa Cương lĩnh 1991 và bản năm 2011 nên hiểu thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Kế thừa và bổ sung, phát triển trên cơ sở tổng kết thực tiễn."
        },
        {
          "id": "b",
          "text": "Phủ nhận mọi nhận thức của Cương lĩnh trước."
        },
        {
          "id": "c",
          "text": "Chỉ thay đổi năm ghi trên văn kiện."
        },
        {
          "id": "d",
          "text": "Chấm dứt nhu cầu tiếp tục đổi mới."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Tiếp tục làm rõ định hướng xây dựng đất nước trong thời kỳ quá độ. Đại hội XI thông qua Cương lĩnh bổ sung, phát triển năm 2011.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "kinh-te-bien-year",
      "eventId": "kinh-te-bien",
      "chapter": 3,
      "kind": "recall",
      "difficulty": 1,
      "prompt": "Sự kiện “Hướng tới phát triển kinh tế biển bền vững” gắn với năm nào?",
      "options": [
        {
          "id": "a",
          "text": "2018"
        },
        {
          "id": "b",
          "text": "2011"
        },
        {
          "id": "c",
          "text": "2007"
        },
        {
          "id": "d",
          "text": "1995"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Mốc 2018: Phát triển kinh tế đặt ra yêu cầu gắn với môi trường và bảo vệ chủ quyền. Kết hợp mục tiêu phát triển với bảo vệ môi trường và quốc phòng – an ninh.",
      "sourceId": "textbook-2019-ch3"
    },
    {
      "id": "kinh-te-bien-meaning",
      "eventId": "kinh-te-bien",
      "chapter": 3,
      "kind": "understanding",
      "difficulty": 2,
      "prompt": "Yêu cầu bền vững đòi hỏi cách tiếp cận nào?",
      "options": [
        {
          "id": "a",
          "text": "Kết hợp kinh tế, bảo vệ môi trường và quốc phòng – an ninh."
        },
        {
          "id": "b",
          "text": "Chỉ tính sản lượng khai thác trong ngắn hạn."
        },
        {
          "id": "c",
          "text": "Tách bảo vệ môi trường khỏi phát triển kinh tế."
        },
        {
          "id": "d",
          "text": "Thay mọi nhiệm vụ phát triển bằng một chỉ tiêu thu nhập."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Kết hợp mục tiêu phát triển với bảo vệ môi trường và quốc phòng – an ninh. Hội nghị Trung ương 8 khóa XII đề ra chiến lược phát triển bền vững kinh tế biển.",
      "sourceId": "textbook-2019-ch3"
    }
  ]
}
```
