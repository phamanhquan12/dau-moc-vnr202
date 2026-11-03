# Dấu Mốc VNR202 — yêu cầu triển khai UI mới

## Nhiệm vụ

Redesign ứng dụng Dấu Mốc thành **game kết nối lịch sử theo nhiệm vụ**. UI hiện tại quá giống website tham khảo HCM202. Phải thay bố cục, điều hướng và cách tương tác; không chỉ đổi màu, font hoặc icon.

Triển khai trên repository hiện có. Đọc AGENTS.md, README, mã nguồn và test trước khi sửa. Không tạo một ứng dụng khác để né việc refactor. Nếu môi trường chưa có repository, báo rõ thiếu mã nguồn thay vì tuyên bố đã sửa ứng dụng.

## Bối cảnh sản phẩm

- Học phần VNR202: Lịch sử Đảng CSVN, theo giáo trình 2019 người dùng cung cấp, phạm vi đến năm 2018.
- Bản hiện tại có 26 hồ sơ sự kiện chọn lọc, 52 câu hỏi, bốn ảnh tư liệu/hiện vật và PDF giáo trình.
- Một người chơi trên một trình duyệt; có thể chiếu lên lớp và mời từng bạn đại diện.
- Không cần backend, đăng nhập riêng, multiplayer, thanh toán hoặc AI sinh câu hỏi lúc chơi.
- Không đưa luật dò mìn, tiền thưởng và ngân hàng MLN131 vào sản phẩm này.

## Hướng UI bắt buộc: Bàn kết nối lịch sử

Mở trang là thấy **bàn nhiệm vụ**, không phải landing page giới thiệu.

### Bỏ cấu trúc cũ

- Hero hai cột chữ serif lớn và ảnh Ba Đình.
- Nền kem–đỏ trầm, chữ serif nghiêng làm nhận diện chính.
- Khung ảnh nghiêng, con dấu và số năm khổng lồ đè lên ảnh.
- Ba card giới thiệu chế độ ngay dưới hero.
- Grid card sự kiện làm giao diện chính.
- Quiz và trò xếp mốc đều nằm trong popup trên landing page.
- Gallery và slogan cuối trang theo cùng cấu trúc website tham khảo.

Không sao chép layout, CSS hoặc component từ HCM202. Tư liệu lịch sử có thể dùng chung nếu đúng nguồn và quyền sử dụng; thiết kế giao diện phải có bản sắc riêng.

### Thay bằng cấu trúc mới

1. **Bàn nhiệm vụ:** chọn chương, xem các node sự kiện trên trục thời gian, chọn node để mở panel nhiệm vụ.
2. **Hồ sơ sự kiện:** view riêng gồm bối cảnh → chủ trương/hành động → kết quả/ý nghĩa, có tư liệu và nguồn.
3. **Quiz:** màn chơi riêng, HUD cố định, câu hỏi trung tâm, các ô đáp án và nút xác nhận rõ ràng.
4. **Xếp mốc:** khay sáu hồ sơ và sáu vị trí trên trục thời gian; hỗ trợ chọn-slot hoặc nút di chuyển, drag là tùy chọn.
5. **Bắc–Nam:** hai làn dùng chung các dải thời gian 1954–1975, thay hai danh sách độc lập.
6. **Kết quả:** điểm, câu sai cần ôn và hành động tiếp theo; không dùng như phần quảng cáo.
7. **Tư liệu:** view tra cứu và khay tư liệu gắn sự kiện, không làm homepage.

## Ngôn ngữ thị giác

- Nền xanh đêm `#101B2A`, panel `#17283B`, đường nối xanh ngọc `#60D6C4`, điểm nhấn vàng `#F5C76A`, chữ sáng `#F0F5FA`.
- Dùng sans hỗ trợ tiếng Việt; ngày và timer có thể dùng monospace.
- Không dùng serif nghiêng lớn, texture giấy cổ hoặc ảnh nghiêng để tạo lại phong cách cũ.
- Ảnh tư liệu giữ sắc độ gốc, metadata tách khỏi ảnh; cho xem nguyên ảnh và nguồn.
- Đường nối trên board là sơ đồ thời gian/quan hệ học tập, không phải đường hành quân hoặc bản đồ lãnh thổ.
- Đúng/sai có cả chữ và biểu tượng, không chỉ màu. Kiểm tra contrast thực tế.

### Layout desktop

- Thanh trên khoảng 64px: tên game, chương/phiên, tiến độ và tiếp tục lượt đang dở.
- Chapter dock bên trái: ba chương.
- Board ở giữa: node theo thứ tự thời gian, chỉ làm nổi node đang chọn.
- Panel nhiệm vụ bên phải khoảng 340px: tóm tắt, trạng thái và một hành động chính.
- Thanh thời gian ở đáy board: chọn mốc, trước/sau và dải đang xem.
- Không ép cả 26 hồ sơ cùng xuất hiện trong một màn.

### Mobile và máy chiếu

- 390px: board chuyển thành danh sách thời gian có đường nối; panel nhiệm vụ mở phía dưới.
- Quiz dùng một cột, chữ tối thiểu 16px cho phương án.
- 1280×720: timer, điểm, câu hỏi, đáp án và nút chốt không bị che hoặc cắt.
- Hỗ trợ bàn phím, focus rõ, target khoảng 44px trở lên, không phụ thuộc hover/kéo thả.
- Tôn trọng prefers-reduced-motion.

## Chức năng và luật cần giữ

- Quiz tối đa sáu câu, ba cơ hội, 30 giây/câu.
- Đúng nhận 100 điểm; thưởng chuỗi tối đa thêm 60 điểm/câu theo engine hiện tại.
- Sai/hết giờ mất một cơ hội; chọn đáp án chưa phải nộp.
- Mỗi câu chỉ chấm một lần. Có giải thích và nguồn sau khi chấm.
- Đọc hồ sơ không được tự cộng điểm hoặc đánh dấu đã thành thạo.
- Giữ thứ tự câu, phương án, lựa chọn và deadline sau reload.
- Đóng màn chơi không tự dừng đồng hồ. Quay lại sau hạn xử lý timeout đúng một lần.
- Xếp mốc không sinh bộ mới khi kiểm tra hoặc reload; nút “Bộ mới” mới thay bộ.
- Không chấm thứ tự dựa trên ngày đầu tháng tự gán khi nguồn chỉ xác định tháng/năm. Chọn các năm khác nhau hoặc xử lý đồng hạng hợp lệ.
- Bắc–Nam phải đồng bộ theo thời kỳ. Chỉ vẽ liên hệ có mô tả và căn cứ; không mặc định mọi mũi tên là nguyên nhân trực tiếp.
- Sự kiện chung/ngoại giao có vùng riêng, không ép vào một miền. Dải thiếu dữ liệu ghi “Chưa có hồ sơ trong bộ hiện tại”, không ghi “Không có sự kiện”.

## Nội dung và tư liệu

- Giữ nội dung VNR đã có nguồn; không coi 26 hồ sơ là toàn bộ giáo trình.
- Phân biệt ảnh sự kiện, ảnh hiện vật và tranh tái hiện; không dùng ảnh AI giả làm tư liệu thật.
- Không dùng ảnh sai thời điểm để lấp ô còn thiếu. Không bịa lời nhân vật hoặc kết quả lịch sử.
- Không hiện caption năm chứa đáp án trên màn quiz đang hỏi năm; có thể đổi sang câu hỏi ý nghĩa nếu tư liệu làm lộ đáp án.
- Link trang giáo trình chỉ dùng khi đã đối chiếu; không lấy lần khớp từ khóa đầu tiên làm trang chắc chắn.

## Kiến trúc triển khai

Giữ stack của repo nếu phù hợp. Không thêm framework/backend chỉ để đổi UI. Static HTML/JS hoặc TypeScript đều được nếu tổ chức rõ.

Bản hiện tại có `dist/index.html`, `dist/style.css`, `dist/app.js`, `dist/core.mjs`, `dist/data.json`, `dist/assets/`, `make-data.py`, `test.mjs`.

- Giữ engine và test đúng nghiệp vụ; thay renderer/style landing page cũ.
- Tách shell/router, board, hồ sơ, quiz, ordering, Bắc–Nam và kết quả thành các module.
- Có thể dùng hash routes để host static và refresh không cần server rewrite.
- Tách content, learning progress, session và UI state.
- Dùng stable event/question/option ID; A/B/C/D là nhãn sau xáo, không là khóa chấm.
- Guard ở engine: chặn questionId cũ, optionId sai, submit rỗng trước deadline và submit kép.
- Timer dùng deadline tuyệt đối; submit ở `now >= deadline` là timeout.
- Migrate tiến độ `dau-moc-vnr-v1` nếu tồn tại: `seen` thành `viewed`, giữ `best` khi luật không đổi; validate session trước phục hồi. Không dùng `localStorage.clear()`.
- State hỏng phải có recovery rõ ràng, không trắng trang hoặc tự tạo kết quả.

## Kiểm thử bắt buộc

### Unit

Giữ 17 test hiện có nếu còn đúng và bổ sung: routing, trạng thái node, stable answer ID, stale questionId, submit kép/rỗng, deadline boundary, ordering/undo, date precision, migration và snapshot hỏng. Với luật giữ nguyên, sáu câu đúng liên tiếp đạt 840 điểm.

### Integration

Kiểm tra các luồng với engine thật:

- Board → hồ sơ → trở về giữ node/vị trí.
- Quiz → chọn → chấm → feedback → tiếp tục; HUD và storage cùng kết quả.
- Đổi route/resize/reload không đổi câu, phương án hoặc đặt lại thời gian.
- Ordering không mất/duplicate thẻ, không đổi bộ khi kiểm tra.
- Bắc–Nam cập nhật cả hai làn theo cùng thời kỳ.
- Migration giữ dữ liệu hợp lệ và không xóa dữ liệu app khác.

### E2E và visual QA

- Chơi đúng/sai/hết giờ, kết thúc, ôn lại lỗi và bắt đầu lượt mới.
- Mở route trực tiếp, refresh và back/forward.
- Hoàn thành ordering bằng bàn phím/chọn-slot.
- Kiểm tra desktop 1440×900, máy chiếu 1280×720, mobile 390×844 và zoom 200%.
- Chụp board, quiz, ordering và Bắc–Nam để đối chiếu trước/sau cùng viewport.
- Không chỉ test đổi mã màu: phải quan sát cấu trúc màn hình và đường đi người dùng đã khác.
- Không báo E2E/coverage pass nếu chưa chạy. Nếu môi trường thiếu browser, nêu blocker và lệnh tái lập.

## Quy trình và điều kiện hoàn thành

1. Đọc repo và chạy baseline.
2. Dựng shell mới, board và quiz bằng dữ liệu thật; kiểm tra desktop/mobile sớm.
3. Hoàn thiện hồ sơ, ordering, Bắc–Nam, kết quả và migration.
4. Chạy unit/integration/E2E phù hợp, sửa lỗi và rà nội dung.
5. Loại renderer, CSS và component landing page không còn dùng.
6. Bàn giao code, README chạy/host, TEST_REPORT kết quả thật, screenshot và bảng before/after.

Nghiệm thu khi màn đầu không còn hero chữ–ảnh, quiz không còn popup trên landing page, Bắc–Nam có trục chung, mobile thao tác được, và các luật/tiến độ không regression.

Nếu triển khai lên Site hiện có, giữ nguyên project và audience, dùng đúng workflow của môi trường. Không tự tạo site trùng, đổi quyền truy cập hoặc bịa link deploy.

**Hãy thực hiện thay đổi, không chỉ mô tả kế hoạch. Không coi đổi màu/font là hoàn thành redesign.**
