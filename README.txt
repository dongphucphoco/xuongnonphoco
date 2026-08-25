LANDING PAGE NÓN ĐỒNG PHỤC PHOCO - README
============================================
Bàn giao ngày: 24/08/2026
Cập nhật gần nhất: 25/08/2026 (xem mục 14)

1. NỘI DUNG GÓI FILE
---------------------
landing-page/
├── index.html                 -> Trang landing page chính
├── favicon.ico
├── assets/
│   ├── images/                -> Toàn bộ hình ảnh (WebP + logo + favicon)
│   ├── css/style.css          -> Toàn bộ style, không dùng framework ngoài
│   └── js/main.js             -> Menu di động, FAQ accordion, lightbox,
│                                  form báo giá (đã kết nối Google Sheet
│                                  thật, xem mục 12)
├── IMAGE-SOURCES.txt          -> Nguồn gốc từng ảnh (ảnh thật PHOCO / ảnh
│                                  stock Pexels kèm link + tác giả)
└── README.txt                 -> File này

Đây là website tĩnh (static site), viết bằng HTML5/CSS3/JavaScript thuần,
không dùng framework (không React/Vue/Bootstrap/jQuery...), không cần
build step, mở trực tiếp bằng trình duyệt hoặc upload lên bất kỳ hosting
tĩnh nào (cPanel, Netlify, Vercel, GitHub Pages, VPS...).

2. CÁCH XEM THỬ TRÊN MÁY TÍNH
-------------------------------
Cách 1 (đơn giản nhất): mở trực tiếp file index.html bằng trình duyệt.

Cách 2 (khuyên dùng, để load ảnh/font chuẩn như môi trường thật): chạy một
local server đơn giản trong thư mục landing-page/, ví dụ:
  python3 -m http.server 8000
rồi mở http://localhost:8000 trên trình duyệt.

3. CÁCH ĐƯA LÊN HOSTING THẬT
------------------------------
- Upload toàn bộ nội dung thư mục landing-page/ (giữ nguyên cấu trúc thư
  mục con assets/) lên thư mục gốc (public_html, www, hoặc thư mục domain
  tương ứng) của hosting.
- Không cần cài đặt gì thêm, không cần Node.js, không cần database.
- Nếu gắn domain riêng, cập nhật lại:
    + Thẻ <link rel="canonical"> trong index.html
    + Các URL trong thẻ Open Graph / Twitter Card (og:url, og:image...)
    + URL trong schema.org (LocalBusiness) ở đầu file index.html

4. FORM NHẬN BÁO GIÁ - ĐANG CHẠY CHẾ ĐỘ DEMO
-----------------------------------------------
Form "Gửi Yêu Cầu Báo Giá" hiện TẠI CHƯA kết nối với hệ thống tiếp nhận
thật (chưa có email, CRM, Google Sheet hay API backend nào được nối vào).
Khi bấm gửi, form sẽ:
  - Kiểm tra hợp lệ các trường bắt buộc (Họ tên, SĐT, Số lượng, Nhu cầu)
  - Hiển thị trạng thái Đang gửi -> Thành công (mô phỏng, không gửi đi đâu)

ĐỂ FORM HOẠT ĐỘNG THẬT, cần một trong các cách sau (chọn 1):
  a) Đổ thẳng về Google Sheet (MIỄN PHÍ, không cần biết code) - xem
     hướng dẫn chi tiết từng bước ở mục 12 bên dưới. Code trong
     assets/js/main.js đã CHUẨN BỊ SẴN cho cách này, chỉ cần dán 1
     đường dẫn (URL) vào đúng chỗ, không cần viết thêm dòng code nào.
  b) Nối form tới dịch vụ nhận form có sẵn (Formspree, Google Form ẩn,
     GetForm...) - thường không cần code thêm, chỉ cần đổi action form.
  c) Viết một API/backend riêng (Node.js, PHP...) nhận dữ liệu rồi gửi
     email/lưu database, sau đó thay hàm submitQuote() trong file
     assets/js/main.js bằng một lệnh fetch() gọi tới API đó.
  d) Kết nối trực tiếp tới CRM/Zalo OA đang dùng nội bộ.

5. NỘI DUNG & THÔNG TIN LIÊN HỆ
----------------------------------
Toàn bộ thông tin hiển thị trên trang (số điện thoại, địa chỉ, MOQ, thời
gian sản xuất, khoảng giá, chất liệu...) lấy từ dữ liệu PHOCO đã xác nhận
tại thời điểm bàn giao (24/08/2026). Khi có thay đổi, cập nhật trực tiếp
trong file index.html tại section tương ứng (tìm theo id, ví dụ id="gia"
cho phần giá, id="lien-he" cho phần liên hệ).

Trang có 3 nút liên hệ nhanh cố định góc phải màn hình (Messenger, Zalo,
Hotline), luôn hiển thị khi cuộn trang:
  - Hotline: gọi trực tiếp tới 0925 94 95 95
  - Zalo: mở chat Zalo tới số 0925 94 95 95 (qua https://zalo.me/0925949595)
  - Messenger: mở khung chat Messenger của PHOCO (https://m.me/dongphucphoco)
Nếu đổi số điện thoại hoặc trang Messenger, cập nhật cả 3 vị trí: link
"tel:" trong header/footer, link Zalo, và link Messenger trong khối FAB
(tìm class "fab-stack" trong index.html).

Trang KHÔNG hiển thị email hay Google Business Profile vì những thông
tin này chưa được PHOCO xác nhận tại thời điểm bàn giao. Khi có, bổ sung
vào phần Footer và section Liên hệ.

6. HÌNH ẢNH
-------------
Xem chi tiết nguồn từng ảnh tại file IMAGE-SOURCES.txt. Cập nhật
24/08/2026: PHOCO đã cung cấp thêm 7 ảnh thật, trang hiện có:
  - Ảnh macro minh họa kỹ thuật "Thêu vi tính" và "In chuyển nhiệt" (mục
    "In, Thêu Logo Lên Nón") nay là ẢNH THẬT PHOCO (trước đây dùng ảnh
    stock Pexels tạm thời, nay đã thay).
  - Mục chất liệu/màu sắc có thêm ảnh thật 2 mẫu "nón cờ đỏ sao vàng"
    (nón bucket và nón kết in logo Việt Nam) và ảnh kho vải nguyên liệu
    tại xưởng.
  - Thư viện hình ảnh khách hàng có thêm 2 ảnh thật (nón kết thêu logo
    "Superpro Suspension Parts" và nón phối lưới thêu logo "Co.opXtra").
Chỉ còn duy nhất mục "In 3D PET" trong phần kỹ thuật logo vẫn dùng ảnh
stock miễn phí bản quyền từ Pexels (ảnh minh họa gần đúng, chưa tìm được
ảnh Pexels đúng 100% chủ đề tem dome PVC/PET trên nón) do PHOCO chưa có
ảnh thật tương ứng - nên thay bằng ảnh thật khi có. Danh mục "Nón trùm
đầu bảo hộ" cũng vẫn dùng 1 ảnh stock Pexels. Trang cũng đã có ảnh thật
đội ngũ và xưởng PHOCO ở mục "Vì sao cần nón đồng phục" (đầu trang) và
mục "Đội ngũ PHOCO" (giữa trang) để tăng độ tin cậy.

7. CẤU TRÚC TRANG (THỨ TỰ CÁC SECTION)
------------------------------------------
Trang được sắp xếp theo "nhịp chuyển đổi": Hero (CTA đầu) -> Vì sao cần
nón đồng phục -> Đối tượng phù hợp -> Tại sao chọn PHOCO (6 USP) -> Mẫu
nón (8 danh mục, dạng catalogue 4 card lớn/hàng) -> Kỹ thuật in/thêu logo
(4 kỹ thuật) -> Chất liệu vải -> Đội ngũ & xưởng thực tế -> Quy trình đặt
hàng -> Thư viện hình ảnh khách hàng -> Giá tham khảo -> Form nhận báo
giá -> FAQ -> CTA cuối trang -> Footer.
Menu chính (header) đã được tối giản chỉ còn 4 mục (Nón đồng phục / Mẫu
nón / Quy trình / Liên hệ) và nút "Nhận Báo Giá" để phù hợp mục đích chạy
quảng cáo Facebook/Google, giảm số đường thoát khỏi trang.
Trang có hiệu ứng "xuất hiện khi cuộn" (scroll reveal) và hiệu ứng hover
trên các card/nút, viết bằng vanilla JS (IntersectionObserver), không
dùng thư viện ngoài.

8. SEO & KỸ THUẬT
--------------------
- 1 thẻ H1 duy nhất, cấu trúc heading phân cấp rõ ràng (H1 > H2 > H3)
- Đầy đủ thẻ meta description, Open Graph, Twitter Card
- Schema.org: LocalBusiness (thông tin liên hệ) và FAQPage (10 câu hỏi)
- Đã lồng ghép bộ từ khóa SEO chuẩn (nón bucket, nón snapback, xưởng may
  nón, nón đồng phục, mũ đồng phục, nón cờ đỏ sao vàng, mũ lưỡi trai,
  may nón theo yêu cầu, in nón theo yêu cầu...) vào title, meta
  description, heading, alt ảnh và nội dung một cách tự nhiên - không
  nhồi nhét từ khóa (keyword stuffing)
- Toàn bộ ảnh có thuộc tính alt mô tả nội dung
- Ảnh dùng định dạng WebP, lazy loading (trừ ảnh hero load ngay)
- Responsive: đã kiểm tra ở các breakpoint 360px, 390px, 768px, 1024px,
  1440px
- Không dùng thư viện icon nặng, không dùng framework CSS/JS ngoài
- Font chữ: Be Vietnam Pro (Google Fonts) - hỗ trợ đầy đủ dấu tiếng Việt

9. LƯU Ý QUAN TRỌNG
----------------------
- File index.html hiện dùng địa chỉ domain mẫu "https://www.phoco.vn/..."
  trong các thẻ canonical/Open Graph/schema - cần đổi thành domain thật
  của PHOCO trước khi lên hosting chính thức.
- Mục "In 3D PET" trong phần kỹ thuật logo dùng 1 ảnh minh họa (không phải
  ảnh nón thật) do chưa tìm được ảnh stock miễn phí đúng chủ đề - nên ưu
  tiên thay bằng ảnh thật PHOCO sớm nhất có thể. (2 ảnh macro minh họa kỹ
  thuật còn lại - "Thêu vi tính" và "In chuyển nhiệt" - đã được thay bằng
  ảnh thật PHOCO ngày 24/08/2026.)

10. MUỐN ĐỔI ẢNH, SỬA NỘI DUNG SAU KHI GO-LIVE THÌ CHỈNH Ở ĐÂU
------------------------------------------------------------------
Toàn bộ trang chỉ có 3 loại file cần quan tâm khi chỉnh sửa:
  - index.html          -> toàn bộ CHỮ/NỘI DUNG (tiêu đề, đoạn văn, giá,
                            câu hỏi FAQ, thông tin liên hệ, đường dẫn ảnh)
  - assets/css/style.css -> MÀU SẮC, khoảng cách, kích thước chữ, bố cục
  - assets/images/       -> toàn bộ HÌNH ẢNH

a) Đổi ảnh (cách dễ nhất, không cần sửa code):
   Mở thư mục assets/images/, tìm đúng tên file ảnh cần đổi (xem tên và
   vị trí sử dụng tại IMAGE-SOURCES.txt), rồi THAY THẾ file ảnh mới vào
   đúng vị trí đó, GIỮ NGUYÊN TÊN FILE VÀ ĐUÔI FILE (ví dụ vẫn đặt tên là
   "non-bucket-danh-muc.webp"). Trang sẽ tự động hiển thị ảnh mới mà
   không cần sửa gì trong index.html.
   Lưu ý khi chọn ảnh thay thế:
     + Nên dùng định dạng WebP (nén ảnh sang WebP tại các trang miễn phí
       như squoosh.app hoặc dùng Photoshop/Canva "Export as WebP"),
       chất lượng khoảng 80-85% là đủ nét mà file vẫn nhẹ.
     + Giữ tỉ lệ khung hình (aspect ratio) gần giống ảnh cũ để không bị
       vỡ bố cục: ảnh danh mục sản phẩm và ảnh thư viện dùng tỉ lệ dọc
       3:4, ảnh kỹ thuật in/thêu dùng tỉ lệ ngang 4:3, ảnh nón cờ đỏ sao
       vàng dùng tỉ lệ dọc 3:4 (chi tiết xem cuối IMAGE-SOURCES.txt).
   Nếu muốn ĐỔI TÊN FILE MỚI (không giữ tên cũ), phải mở index.html, tìm
   (Ctrl+F) đúng tên file ảnh cũ và sửa lại thành tên file mới ở TẤT CẢ
   những chỗ xuất hiện (một vài ảnh được dùng lặp lại, ví dụ logo xuất
   hiện cả ở header và footer).

b) Đổi chữ, giá, số điện thoại, câu hỏi FAQ:
   Mở index.html bằng phần mềm soạn thảo văn bản (Notepad++, VS Code...),
   dùng Ctrl+F tìm theo id của từng mục để nhảy nhanh tới đúng vị trí, ví
   dụ: id="gia" (phần giá tham khảo), id="lien-he" (phần liên hệ/form),
   id="faq" (câu hỏi thường gặp), id="san-pham" (mẫu nón). Sửa trực tiếp
   phần chữ nằm giữa hai thẻ (ví dụ giữa <p> và </p>) rồi lưu lại file.

c) Đổi màu chủ đạo, font chữ, khoảng cách:
   Mở assets/css/style.css, tìm khối ":root" ở đầu file - đây là nơi khai
   báo các biến màu dùng xuyên suốt trang (ví dụ --color-navy là màu xanh
   navy chủ đạo, --color-accent là màu cam nhấn). Đổi giá trị mã màu ở
   đây sẽ tự động áp dụng cho toàn bộ trang, không cần sửa từng chỗ.

11. KẾT NỐI TÊN MIỀN RIÊNG & ĐƯA WEBSITE LÊN GITHUB PAGES (MIỄN PHÍ)
------------------------------------------------------------------
GitHub Pages là dịch vụ hosting website tĩnh MIỄN PHÍ của GitHub, phù hợp
với trang này vì đây là website HTML/CSS/JS thuần, không cần server hay
database. Các bước thực hiện:

BƯỚC A - Đưa code lên GitHub:
  1. Tạo tài khoản tại github.com (nếu chưa có).
  2. Tạo repository mới (ví dụ đặt tên "phoco-landing-page"), chọn chế độ
     Public để dùng GitHub Pages miễn phí.
  3. Đưa toàn bộ nội dung thư mục landing-page/ lên repository đó bằng
     một trong hai cách:
     - Dễ nhất: cài đặt phần mềm "GitHub Desktop" (miễn phí, có giao
       diện kéo thả, không cần gõ lệnh), đăng nhập, chọn "Add local
       repository", trỏ tới thư mục landing-page/, rồi bấm "Publish
       repository".
     - Dùng dòng lệnh (nếu quen Terminal, đã cài Git): mở Terminal tại
       thư mục landing-page/ rồi chạy lần lượt:
         git init
         git add .
         git commit -m "Khoi tao website PHOCO"
         git branch -M main
         git remote add origin https://github.com/<ten-tai-khoan>/phoco-landing-page.git
         git push -u origin main

BƯỚC B - Bật GitHub Pages:
  1. Vào repository vừa tạo trên github.com > tab Settings > mục Pages
     (bên trái, trong nhóm "Code and automation").
  2. Ở phần "Build and deployment" > Source, chọn "Deploy from a
     branch". Chọn nhánh "main", thư mục "/ (root)", bấm Save.
  3. Sau 1-2 phút, GitHub cấp một địa chỉ dạng
     https://<ten-tai-khoan>.github.io/phoco-landing-page/ - đây là bản
     xem thử miễn phí, dùng được ngay trước khi gắn tên miền riêng.

BƯỚC C - Gắn tên miền riêng (ví dụ phoco.vn):
  1. Vẫn ở Settings > Pages, gõ tên miền vào ô "Custom domain" (ví dụ
     "phoco.vn"), bấm Save. GitHub sẽ tự tạo 1 file tên "CNAME" trong
     repository chứa tên miền đó - không cần tự tạo file này.
  2. Vào trang quản lý DNS của nơi đã mua tên miền (Mắt Bão, PA Vietnam,
     Nhân Hòa, GoDaddy, Namecheap...), thêm các bản ghi (DNS records)
     sau:
     - Cho tên miền gốc (phoco.vn, không có www): thêm 4 bản ghi loại A,
       trỏ lần lượt về 4 địa chỉ IP của GitHub Pages:
         185.199.108.153
         185.199.109.153
         185.199.110.153
         185.199.111.153
     - Cho www.phoco.vn: thêm 1 bản ghi loại CNAME, tên "www", trỏ về
       <ten-tai-khoan>.github.io
     (Nên thêm cả hai loại trên để người dùng vào phoco.vn hay
     www.phoco.vn đều truy cập được.)
  3. Chờ DNS cập nhật (thường 30 phút - vài giờ, đôi khi tới 24 giờ).
     Sau đó quay lại Settings > Pages, tick chọn ô "Enforce HTTPS" để
     website chạy giao thức https bảo mật (ô này chỉ bật được sau khi
     GitHub xác nhận DNS đã trỏ đúng).

BƯỚC D - Cập nhật lại domain thật trong code:
  Sau khi có tên miền thật, mở index.html và thay toàn bộ chuỗi
  "https://www.phoco.vn/" bằng domain thật ở 3 nhóm vị trí: thẻ
  <link rel="canonical">, các thẻ Open Graph/Twitter (og:url, og:image,
  twitter:image), và schema.org JSON-LD (LocalBusiness, mục "url" và
  "image") ở đầu file. Sau khi sửa xong, đẩy lại thay đổi lên GitHub
  (Commit + Push trên GitHub Desktop, hoặc git add . && git commit -m
  "Cap nhat domain that" && git push nếu dùng dòng lệnh).

LƯU Ý: GitHub Pages chỉ host được website tĩnh, KHÔNG chạy được backend
thật. Form "Nhận Báo Giá" hiện đang ở chế độ demo (xem mục 4) - nếu lên
GitHub Pages mà muốn form gửi được thật, cần nối qua dịch vụ ngoài như
Formspree hoặc Google Form theo hướng dẫn ở mục 4.

12. ĐỔ LIÊN HỆ KHÁCH HÀNG (FORM BÁO GIÁ) VỀ GOOGLE SHEET
------------------------------------------------------------------
TRẠNG THÁI: ĐÃ KẾT NỐI (cập nhật 25/08/2026).
Form báo giá trên trang đã được nối thật vào Google Sheet tại:
  https://docs.google.com/spreadsheets/d/1azbaBvbXCS1M6HB5qsuskdQgUCdpz6iEVy6eYi306E0/edit
Mỗi khi khách bấm "Gửi Yêu Cầu Báo Giá", một dòng mới (Thời gian, Họ tên,
Số điện thoại, Số lượng, Nhu cầu, Ghi chú) sẽ tự động xuất hiện trong
sheet đầu tiên của file trên. URL Web App Apps Script đã được dán sẵn
vào biến GOOGLE_SHEET_WEBHOOK_URL trong assets/js/main.js, không cần
làm lại các bước bên dưới trừ khi muốn đổi sang Sheet khác.

Các bước bên dưới được giữ lại làm tài liệu tham khảo, phòng khi cần tạo
lại kết nối (ví dụ đổi sang Sheet khác, hoặc script bị xoá nhầm).

BƯỚC A - Tạo Google Sheet và đoạn script nhận dữ liệu:
  1. Vào sheets.google.com, tạo 1 Google Sheet mới (hoặc dùng Sheet có
     sẵn), đặt tên tuỳ ý.
  2. Lấy ID của Sheet: nhìn trên thanh địa chỉ, ID nằm giữa /d/ và
     /edit, ví dụ .../d/1azbaBvbXCS1M6HB5qsuskdQgUCdpz6iEVy6eYi306E0/edit
     thì ID là 1azbaBvbXCS1M6HB5qsuskdQgUCdpz6iEVy6eYi306E0.
  3. Vào menu Extensions (Tiện ích mở rộng) > Apps Script. Một tab mới
     mở ra với file Code.gs (hoặc Mã.gs) có sẵn, xoá hết nội dung mẫu
     trong đó và dán đoạn script sau vào (thay đúng ID Sheet của bạn ở
     dòng openById):

     function doPost(e) {
       var ss = SpreadsheetApp.openById('DAN_ID_SHEET_VAO_DAY');
       var sheet = ss.getSheets()[0];
       if (sheet.getLastRow() === 0) {
         sheet.appendRow(['Thoi gian', 'Ho ten', 'So dien thoai', 'So luong', 'Nhu cau', 'Ghi chu']);
       }
       var p = e.parameter;
       sheet.appendRow([
         new Date(),
         p.name || '',
         p.phone || '',
         p.quantity || '',
         p.need || '',
         p.note || ''
       ]);
       return ContentService.createTextOutput('OK');
     }

     Cách viết này tự ghi vào sheet đầu tiên của file (đúng tab gid=0),
     không cần đặt tên tab, và tự thêm dòng tiêu đề nếu sheet đang trống.
  4. Bấm biểu tượng đĩa mềm (Lưu) hoặc Ctrl+S để lưu lại.

BƯỚC B - Deploy (xuất bản) thành Web App để lấy URL:
  1. Ở góc trên bên phải, bấm nút "Deploy" (Triển khai) > "New
     deployment" (Triển khai mới).
  2. Bấm biểu tượng bánh răng cạnh "Select type" (Chọn loại), chọn
     "Web app" (Ứng dụng web).
  3. Ở mục "Execute as" (Thực thi với quyền), chọn "Me" (Tôi) - tài
     khoản Google của bạn. Ở mục "Who has access" (Ai có quyền truy
     cập), chọn "Anyone" (Bất kỳ ai) - bắt buộc phải chọn mục này thì
     khách vào website mới gửi được, không cần đăng nhập Google.
  4. Bấm "Deploy" (Triển khai). Lần đầu, Google sẽ yêu cầu "Authorize
     access" (Cho phép truy cập) - chọn tài khoản Google của bạn, bấm
     "Advanced" (Nâng cao) > "Go to ... (unsafe)" nếu Google cảnh báo
     ứng dụng chưa xác minh (đây là script do chính bạn viết nên an
     toàn), rồi bấm "Allow" (Cho phép).
  5. Sau khi deploy xong, Google hiện ra 1 đường dẫn dạng:
       https://script.google.com/macros/s/xxxxxxxxxxxxxxxx/exec
     Copy toàn bộ đường dẫn này (kết thúc bằng "/exec").

BƯỚC C - Dán URL vào website:
  1. Mở file assets/js/main.js, tìm dòng gần đầu file:
       var GOOGLE_SHEET_WEBHOOK_URL = "";
  2. Dán URL vừa copy vào giữa hai dấu ngoặc kép, ví dụ:
       var GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/xxxxxxxxxxxxxxxx/exec";
  3. Lưu file lại. Dòng chữ "Form đang chạy ở chế độ demo..." bên dưới
     nút gửi sẽ tự động ẩn đi, và mỗi lần có khách gửi form, một dòng
     mới sẽ xuất hiện trong Google Sheet của bạn.

LƯU Ý:
- Mỗi khi bạn SỬA lại nội dung script trong Apps Script (Code.gs), phải
  bấm Deploy > "Manage deployments" (Quản lý bản triển khai) > biểu
  tượng bút chì > chọn phiên bản mới ở "Version" > Deploy lại thì thay
  đổi mới có hiệu lực - deploy cũ vẫn sẽ chạy code cũ.
- Nếu muốn nhận thêm thông báo qua email mỗi khi có yêu cầu mới, có thể
  thêm dòng MailApp.sendEmail(...) vào trong hàm doPost() ở trên.
- Cách này dùng được cả khi host trên GitHub Pages (mục 11) lẫn hosting
  thường, vì chỉ cần gọi ra ngoài tới Google, không cần server riêng.


13. GẮN META PIXEL (FACEBOOK) ĐỂ CHẠY REMARKETING
------------------------------------------------------------------
TRẠNG THÁI: ĐÃ KẾT NỐI (cập nhật 25/08/2026).
Website đã gắn sẵn Meta Pixel (mã theo dõi của Facebook) tên
"PHOCO Website - Xuong Non Dong Phuc", ID Pixel: 1057577167259496,
tạo trong Trình quản lý sự kiện (Events Manager) của Facebook Business
gắn với trang https://www.facebook.com/dongphucphoco/.

Pixel này tự động ghi nhận MỌI khách ghé website (kể cả khi họ không
bấm nút nào), để bạn có thể vào Meta Ads Manager tạo một "Đối tượng
tuỳ chỉnh" (Custom Audience) gồm "Người đã truy cập website trong
X ngày qua" rồi chạy quảng cáo nhắm lại (remarketing) tới nhóm này.

Ngoài lượt xem trang (sự kiện PageView), website còn tự gửi thêm 2
sự kiện để đo mức độ quan tâm của khách:
  - "Lead": khi khách gửi form "Nhận Báo Giá" thành công.
  - "Contact": khi khách bấm số điện thoại, nút Zalo hoặc Messenger
    (kể cả các nút nổi góc màn hình).
Các sự kiện này giúp Facebook tối ưu quảng cáo tốt hơn và cho phép
tạo đối tượng remarketing riêng cho nhóm khách đã có ý định rõ ràng
(ví dụ: đã điền form nhưng chưa chốt đơn).

Mã Pixel nằm ở đầu file index.html (đoạn giữa "Meta Pixel Code" và
"End Meta Pixel Code"), và 2 đoạn gọi sự kiện Lead/Contact nằm trong
assets/js/main.js.

Muốn xem số liệu, đăng nhập Facebook rồi vào:
  business.facebook.com/events_manager2
Muốn tạo quảng cáo remarketing, vào Meta Ads Manager > Đối tượng
(Audiences) > Tạo đối tượng tuỳ chỉnh > Lưu lượng truy cập trang web
(Website traffic) > chọn Pixel "PHOCO Website - Xuong Non Dong Phuc".

LƯU Ý:
- Nếu sau này đổi sang Pixel khác, chỉ cần thay số ID Pixel
  (1057577167259496) ở 3 chỗ trong index.html (2 lần trong đoạn
  script, 1 lần trong link ảnh <noscript>) bằng ID Pixel mới.
- Meta Pixel là tài sản của tài khoản Facebook Business đang quản lý
  trang dongphucphoco, không phụ thuộc vào Google Sheet hay GitHub.

14. ĐỢT CHỈNH SỬA THEO YÊU CẦU 32 MỤC (cập nhật 25/08/2026)
--------------------------------------------------------------
Đợt này thực thi phần lớn các mục trong file review
"landing-page-review-25-08-2026.md" mà Phong đã trả lời (Nhóm A/B).
Đã làm xong:
- Thêm section "Khách Hàng Nói Gì Về PHOCO" với 2 review thật (anh
  Trương Quang Hưng - Nhật Minh Building, anh Nguyễn Thanh Trung -
  Donagift), dùng đúng nội dung và ảnh chân dung Phong gửi.
- Đổi danh sách chất liệu vải từ 4 loại (Kaki/Dù/Cotton/Kate) sang 6
  loại đã xác nhận: Delin, Kaki Samsung, Kaki 65/35, Kaki Việt Nam,
  Kaki Cotton, Vải dù. Mô tả đặc điểm từng loại là kiến thức chung phổ
  biến trên thị trường (đã ghi rõ trong bảng), không phải số liệu kỹ
  thuật riêng của PHOCO.
- Thêm 2 câu FAQ mới (xuất hóa đơn VAT, nhận đơn gấp) với câu trả lời
  thật Phong cung cấp, đồng bộ cả trong nội dung hiển thị và
  Schema.org FAQPage.
- Cập nhật footer: tên pháp lý "Công Ty TNHH Sản Xuất Thương Mại
  PHOCO", mã số thuế 3703492907, email lienhe.phoco@gmail.com.
- Thêm Schema.org Organization và Service (dùng thông tin đã xác
  nhận: tên, địa chỉ, MST, email, hotline).
- Sửa toàn bộ canonical/Open Graph/schema URL từ domain cũ
  (www.phoco.vn) sang domain thật đang chạy: xuongnonphoco.com
  (dạng không "www" - mặc định do chưa có phản hồi riêng, có thể đổi
  lại nếu Phong muốn dùng dạng có "www").
- Xóa hẳn dòng "Form đang chạy ở chế độ demo..." khỏi HTML (trước đây
  chỉ ẩn bằng JS). Thêm trường "Link logo/hình mẫu" dạng text vào
  form (phương án nhanh, chưa phải upload file thật lên Drive).
- Thêm thanh CTA sticky ở đáy màn hình cho mobile (Gọi ngay / Zalo /
  Nhận báo giá), ẩn FAB tròn nổi trên mobile để tránh trùng chức năng
  (FAB tròn vẫn hiển thị bình thường trên desktop).
- Thêm sự kiện Meta Pixel riêng "QuoteCTAClick" khi khách bấm các nút
  "Nhận Báo Giá" (tách biệt với sự kiện "Lead" chỉ tính khi gửi form
  thành công).
- Thêm <link rel="preload"> cho ảnh Hero để cải thiện tốc độ tải.
- Sắp xếp lại cấu trúc trang: rút gọn "Phù hợp nhiều ngành nghề" từ 9
  xuống 6 nhóm, dời "Tại sao chọn PHOCO" ra sau Chất liệu, đổi thứ tự
  Quy trình -> Thư viện ảnh -> Đội ngũ/Xưởng -> Giá, đổi thứ tự FAQ
  đứng trước Form liên hệ, thêm 3 ảnh minh chứng "quy trình sản xuất
  thật" (nguyên liệu, công đoạn may, công đoạn thêu) ngay trước thư
  viện ảnh.
- Thêm ảnh thật mới: chân dung anh Trương Hữu Tiến, 2 ảnh review nói
  trên, 1 ảnh công đoạn may và 1 ảnh máy thêu Tajima (xem chi tiết
  trong IMAGE-SOURCES.txt).

CHƯA LÀM (cần Phong gửi lại vì nội dung gốc đã bị mất khi hệ thống
tự động rút gọn lịch sử chat - không phải do quên, mà do giới hạn kỹ
thuật khi cuộc trò chuyện quá dài):
- Author Card cho anh Trương Hữu Tiến: đã có ảnh thật, NHƯNG đoạn bio
  Phong viết sẵn để dùng nguyên văn đã không còn lưu được trong phiên
  làm việc này. Để tránh tự viết lại nội dung khác với ý Phong (yêu
  cầu ban đầu là dùng "nguyên văn, không thêm bớt"), mục này CHƯA làm
  - cần Phong gửi lại đúng đoạn bio + tiêu đề + link Facebook/LinkedIn
  (nếu có) để hoàn thiện.
- Thứ tự hiển thị mới của 8 loại nón, nội dung bảng "Chọn loại nón
  nào?", nội dung bảng so sánh kỹ thuật In/Thêu, và thứ tự đầy đủ 12
  câu FAQ theo đúng danh sách Phong đã liệt kê trong yêu cầu gốc -
  cũng bị mất nội dung chi tiết vì lý do tương tự. Hiện tại các phần
  này vẫn giữ nguyên như bản trước (chưa đổi thứ tự sản phẩm, chưa
  đổi In/Thêu sang dạng bảng, FAQ mới chỉ được thêm vào cuối danh
  sách cũ thay vì đúng vị trí trong thứ tự 12 câu).
- Chưa tạo trang Chính sách bảo mật / Điều khoản sử dụng (đang chờ
  Phong xác nhận ngoại lệ cho yêu cầu "không tạo thêm trang con").
- Chưa gắn Google Ads Conversion ID / GA4 (chưa có mã).
- robots.txt / thẻ noindex VẪN đang chặn index như yêu cầu trước đó
  của Phong - sẽ chỉ gỡ khi Phong xác nhận đã ưng ý giao diện.
