# LÝ THUYẾT VÀ CHIẾN LƯỢC KIỂM THỬ PHẦN MỀM

Tài liệu này hệ thống hóa toàn bộ các khái niệm cốt lõi, kỹ thuật, phân loại và chiến lược áp dụng kiểm thử trong dự án dựa trên các tiêu chuẩn kiểm thử quốc tế mới nhất (ISTQB).

---

## 1. PHÂN BIỆT VALIDATION VS VERIFICATION

Trong kiểm thử, đây là hai khái niệm nền tảng thường bị nhầm lẫn. Cần phân biệt rõ để định hướng hoạt động kiểm thử chính xác:

| Tiêu chí            | Verification (Xác minh)                                                                  | Validation (Xác nhận)                                                                          |
| :------------------ | :--------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Câu hỏi cốt lõi** | "Are we building the product right?" (Chúng ta có đang xây dựng sản phẩm đúng thiết kế?) | "Are we building the right product?" (Chúng ta có đang xây dựng đúng sản phẩm khách hàng cần?) |
| **Phương pháp**     | Kiểm thử tĩnh (Static Testing) - Không chạy mã nguồn.                                    | Kiểm thử động (Dynamic Testing) - Chạy mã nguồn thực tế.                                       |
| **Hoạt động chính** | Review tài liệu (SRS, Design), Inspection, Walkthrough, Check code, Phân tích kiến trúc. | Chạy các test case, kiểm tra tính năng, giao diện, hiệu năng và bảo mật thực tế.               |
| **Thời điểm**       | Diễn ra rất sớm, ngay từ đầu vòng đời phát triển phần mềm (SDLC).                        | Diễn ra khi đã có sản phẩm có thể thực thi được (Executable software).                         |

---

## 2. CÁC PHƯƠNG PHÁP KIỂM THỬ (TESTING METHODS)

Dựa trên mức độ tiếp cận và hiểu biết về cấu trúc mã nguồn, kiểm thử được chia thành 3 phương pháp chính:

- **Hộp đen (Black-box Testing):** Kiểm thử dựa hoàn toàn trên yêu cầu (Requirements) và đặc tả chức năng của hệ thống. Tester hoàn toàn không cần biết cấu trúc code bên trong.
- **Hộp trắng (White-box Testing):** Kiểm thử dựa trên cấu trúc bên trong, giải thuật và logic của mã nguồn. Phương pháp này yêu cầu quyền truy cập vào mã nguồn và thường do Developer thực hiện (ví dụ: Unit Test, Component Test).
- **Hộp xám (Gray-box Testing):** Sự kết hợp của hai phương pháp trên. Tester có hiểu biết nhất định về cấu trúc dữ liệu, kiến trúc hệ thống hoặc cơ sở dữ liệu (như API, Database) để thiết kế các kịch bản kiểm thử tối ưu và sâu hơn mà không cần can thiệp sâu vào code logic.

---

## 3. CÁC KỸ THUẬT THIẾT KẾ TEST CASE (TEST DESIGN TECHNIQUES)

Để tối ưu hóa số lượng test case (tránh trùng lặp) nhưng vẫn đảm bảo độ bao phủ (coverage) cao nhất, cần áp dụng linh hoạt các kỹ thuật sau:

### 3.1. Kỹ thuật Hộp Đen (Black-box Techniques)

- **Phân vùng tương đương (Equivalence Partitioning - EP):** Chia dữ liệu đầu vào thành các vùng (vùng hợp lệ và không hợp lệ). Kiểm thử viên chỉ cần chọn một giá trị đại diện trong mỗi vùng để thực thi test.
- **Phân tích giá trị biên (Boundary Value Analysis - BVA):** Tập trung kiểm thử tại các điểm biên của vùng tương đương (ví dụ: Min, Min-1, Max, Max+1). Đây là nơi bug có tần suất xuất hiện cao nhất do lỗi logic toán học của lập trình viên (như nhầm lẫn giữa `<` và `<=`).
- **Bảng quyết định (Decision Table Testing):** Áp dụng cho các tính năng có nhiều điều kiện đầu vào kết hợp phức tạp để cho ra các hành động (action) khác nhau.
- **Chuyển đổi trạng thái (State Transition Testing):** Kiểm thử dựa trên sự thay đổi trạng thái của hệ thống khi có các sự kiện (event) tác động vào (ví dụ: Trạng thái của một Đơn hàng từ _Chờ duyệt -> Đang giao -> Đã giao_).
- **Kiểm thử dựa trên Use Case (Use Case Testing):** Thiết kế test case bám sát theo kịch bản sử dụng thực tế của người dùng được mô tả trong tài liệu Use Case nhằm bảo đảm quy trình nghiệp vụ (Business Flow) hoạt động liền mạch.

### 3.2. Kỹ thuật Hộp Trắng (White-box Techniques)

- **Bao phủ câu lệnh (Statement Coverage):** Đảm bảo mọi dòng lệnh đơn lẻ trong mã nguồn đều được thực thi ít nhất một lần qua các kịch bản test.
- **Bao phủ nhánh/nhận định (Branch/Decision Coverage):** Đảm bảo mọi nhánh quyết định (mọi kết quả True/False của các câu lệnh điều kiện như `if/else`, `switch/case`) đều được kiểm tra đầy đủ.

### 3.3. Kỹ thuật Dựa trên Kinh nghiệm (Experience-based Techniques)

- **Đoán lỗi (Error Guessing):** Dựa vào trải nghiệm cá nhân và kiến thức của QA về các lỗi thường gặp trong quá khứ trên các hệ thống tương tự để chủ động tạo ra các test case "bẫy" lỗi.
- **Kiểm thử khám phá (Exploratory Testing):** Kỹ thuật kiểm thử không phụ thuộc vào kịch bản có trước. QA thực hiện đồng thời các hoạt động tìm hiểu hệ thống, thiết kế test case và thực thi test. Rất hiệu quả khi dự án thiếu thời gian hoặc tài liệu không rõ ràng.

---

## 4. PHÂN LOẠI KIỂM THỬ (TEST TYPES)

Hệ thống kiểm thử phần mềm được phân chia thành hai trục lớn độc lập: **Functional (Kiểm thử chức năng)** và **Non-functional (Kiểm thử phi chức năng)**.

### 4.1. Kiểm thử Chức năng (Functional Testing)

Tập trung xác minh hệ thống có hoạt động ĐÚNG và ĐỦ theo yêu cầu nghiệp vụ phần mềm hay không. Bao gồm các cấp độ và loại hình:

- **Unit Testing (Kiểm thử đơn vị):** Kiểm tra các hàm, phương thức hoặc class nhỏ nhất biệt lập trong mã nguồn (thường do Developer triển khai).
- **Integration Testing (Kiểm thử tích hợp):** Kiểm tra sự tương tác, luồng dữ liệu và giao tiếp giữa các module hoặc các hệ thống con với nhau.
- **System Testing (Kiểm thử hệ thống):** Kiểm tra toàn bộ hệ thống đã được tích hợp hoàn chỉnh để đảm bảo ứng dụng đạt yêu cầu tổng thể cuối cùng.
- **Acceptance Testing (Kiểm thử chấp nhận):** Do khách hàng, Product Owner hoặc người dùng cuối thực hiện để quyết định có đồng ý nghiệm thu và phát hành sản phẩm hay không (bao gồm UAT, Alpha/Beta testing).
- **API Testing:** Kiểm tra các cổng kết nối ứng dụng độc lập với giao diện. Xác minh tính chính xác của dữ liệu phản hồi (Response Code, Payload JSON/XML, Headers) và bảo mật logic.
- **UI/UX Testing:** Kiểm tra tính đúng đắn của giao diện người dùng (Font, màu sắc, bố cục, hiển thị responsive trên các thiết bị) kết hợp với đánh giá trải nghiệm thao tác thuận tiện.

### 4.2. Kiểm thử Phi chức năng (Non-functional Testing)

Tập trung đo lường và kiểm tra các đặc tính vận hành của hệ thống (Hệ thống hoạt động NHƯ THẾ NÀO dưới các tác động và điều kiện môi trường khác nhau).

- **Performance Testing (Kiểm thử hiệu năng):** Đánh giá tốc độ phản hồi, độ ổn định và khả năng mở rộng của hệ thống. Gồm các loại nhỏ:
    - _Load Testing:_ Kiểm tra hệ thống hoạt động dưới mức tải kỳ vọng lớn nhất (ví dụ: 1000 users đồng thời).
    - _Stress Testing:_ Ép hệ thống hoạt động vượt quá mức tải kỳ vọng để tìm điểm gãy (break-point) và xem cách hệ thống crash.
    - _Endurance/Soak Testing:_ Kiểm tra hệ thống dưới mức tải bình thường trong một thời gian dài liên tục (ví dụ: 24/7) để phát hiện lỗi rò rỉ bộ nhớ (Memory leak).
    - _Spike Testing:_ Kiểm tra phản ứng phản hồi của hệ thống khi lượng người dùng tăng đột biến trong một khoảng thời gian cực ngắn (ví dụ: Flash sale).
- **Security Testing (Kiểm thử bảo mật):** Tìm kiếm các lỗ hổng bảo mật (Vulnerability) và các nguy cơ rủi ro từ các cuộc tấn công bên ngoài nhằm bảo vệ dữ liệu (ví dụ: SQL Injection, XSS, lỗi phân quyền).
- **Usability Testing (Kiểm thử độ khả dụng):** Đánh giá mức độ dễ học, dễ tiếp cận và tính thân thiện tổng thể của sản phẩm đối với đối tượng người dùng đích.
- **Compatibility Testing (Kiểm thử độ tương thích):** Đảm bảo ứng dụng chạy mượt mà trên các môi trường cấu hình khác nhau (Hệ điều hành, Trình duyệt, Thiết bị phần cứng, Kích thước màn hình).
- **Reliability & Recovery Testing:** Kiểm tra khả năng hoạt động liên tục không lỗi của hệ thống, cũng như khả năng tự khôi phục dữ liệu nguyên vẹn sau khi gặp sự cố đột ngột (như crash, mất kết nối mạng, sập nguồn).
- **Accessibility Testing (Kiểm thử trợ năng):** Kiểm tra đánh giá xem phần mềm, website hoặc ứng dụng có thể được tiếp cận và sử dụng dễ dàng bởi tất cả mọi người hay không, kể cả những người bị khiếm thị, khiếm thính, khó khăn về vận động hoặc suy giảm nhận thức (Tab/Enter,....)
- **LOCALIZATION TESTING (KIỂM THỬ ĐA NGÔN NGỮ/ĐỊA PHƯƠNG HÓA):** Kiểm tra xem ứng dụng khi chuyển sang một ngôn ngữ, quốc gia hoặc nền văn hóa khác thì hiển thị, định dạng và nội dung có phù hợp hay không (Ví dụ: dịch thuật ngữ đúng ngữ cảnh, định dạng ngày tháng DD/MM/YYYY hay MM/DD/YYYY, định dạng tiền tệ, múi giờ...).

---

## 5. CHIẾN LƯỢC ÁP DỤNG KIỂM THỬ (TEST STRATEGY & TRIGGER CONDITIONS)

Để tối ưu hóa thời gian phát triển và phân bổ nguồn lực QA hợp lý trong dự án, Senior QA cần áp dụng các bộ loại hình kiểm thử dựa trên các điều kiện kích hoạt cụ thể dưới đây:

| Loại Test           | Định nghĩa ngắn gọn                                                                                                                                | Khi nào áp dụng? (Trigger Condition)                                                                                                                                                           | Ví dụ thực tế                                                                                                                                                                      |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Smoke Test**      | Kiểm thử khói (Kiểm tra nhanh các tính năng cốt lõi nhất nhằm đảm bảo build mới không bị sập).                                                     | Thực hiện **ngay khi nhận được một Build mới** từ phía Development. Nếu Smoke Test thất bại -> Từ chối nhận Build (Reject Build) lập tức để tránh lãng phí thời gian của team QA.              | Hệ thống E-commerce vừa bàn giao build: Mở ứng dụng không crash, hiển thị được trang chủ, Đăng nhập được thành công -> Đạt Smoke Test.                                             |
| **Sanity Test**     | Kiểm thử độ tỉnh táo (Kiểm tra sâu vào một tính năng/module cụ thể vừa có sự thay đổi hoặc sửa lỗi).                                               | Áp dụng ngay sau khi nhận một **Build sửa lỗi nhanh (Bug fix)** hoặc có một thay đổi nhỏ (Hotfix). Dùng để xác minh tính năng đó hoạt động "hợp lý" trước khi quyết định mở rộng phạm vi test. | Nhà phát triển báo đã sửa xong lỗi "Không click được nút Áp dụng mã giảm giá". QA vào kiểm tra trực tiếp và chỉ tập trung xoay quanh tính năng Mã giảm giá và màn hình Thanh toán. |
| **Retest**          | Kiểm thử lại (Chạy lại đúng kịch bản từng bị lỗi để xác nhận lỗi đã được khắc phục triệt để chưa).                                                 | Áp dụng khi Developer chuyển trạng thái bug sang **"Resolved" hoặc "Fixed"**.                                                                                                                  | Lỗi cũ: Nhập ký tự đặc biệt vào ô Tìm kiếm khiến trang bị trắng. Khi Retest: Nhập lại đúng ký tự đặc biệt đó để xem trang còn bị trắng hay không.                                  |
| **Regression Test** | Kiểm thử hồi quy (Kiểm tra lại các tính năng cũ để đảm bảo code mới viết không làm ảnh hưởng hay phát sinh lỗi lên các tính năng đã chạy ổn định). | Áp dụng khi hệ thống có **bất kỳ sự thay đổi nào**: Thêm tính năng mới, tối ưu code cấu trúc, sửa bug hoặc nâng cấp môi trường/thư viện hệ thống.                                              | Dự án thêm phương thức thanh toán qua "Apple Pay". QA phải test lại các luồng thanh toán cũ như "Thẻ tín dụng", "Ví Momo" để đảm bảo chúng không bị hỏng.                          |
| **System Test**     | Kiểm thử hệ thống (Kiểm tra luồng nghiệp vụ khép kín từ đầu đến cuối trên toàn bộ sản phẩm).                                                       | Áp dụng khi các module đơn lẻ đã hoàn thiện, tích hợp đầy đủ. Thường diễn ra ở **giai đoạn cuối của một Sprint hoặc trước khi bàn giao UAT**.                                                  | Thực hiện trọn vẹn luồng: Đăng ký tài khoản -> Tìm kiếm sản phẩm -> Bỏ vào giỏ -> Thanh toán -> Admin nhận đơn -> Shipper cập nhật trạng thái giao hàng thành công.                |

### Quy trình điều phối kiểm thử tiêu chuẩn (QA Workflow):

1.  **Nhận Build mới** $\rightarrow$ Thực hiện **Smoke Test** nhanh (khoảng 15-30 phút).
2.  **Nếu Smoke Test Pass** $\rightarrow$ Tiến hành kiểm thử các tính năng mới (New Feature Testing) và thực hiện **Retest** danh sách các bug được báo Fix.
3.  **Nếu các tính năng ổn định** $\rightarrow$ Thực hiện **Sanity Test** để đào sâu kiểm tra tính hợp lý xung quanh các vùng code có sự thay đổi lớn.
4.  **Cuối Sprint hoặc Trước khi Release** $\rightarrow$ Chạy toàn bộ bộ kịch bản **Regression Test** (ưu tiên chạy bằng Automation Test hoặc chọn lọc bộ TestCase cốt lõi bằng Manual) để đảm bảo chất lượng toàn bộ hệ thống an toàn 100%.
