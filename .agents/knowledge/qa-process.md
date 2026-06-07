# QUY TRÌNH LÀM VIỆC CỦA QA Ở GIAI ĐOẠN ĐẦU DỰ ÁN (EARLY STAGE WORKFLOW)

Giai đoạn đầu dự án là thời điểm vàng để QA thực hiện "Shift-left testing" (đưa kiểm thử về sớm nhất có thể trong vòng đời dự án). Việc này giúp phát hiện lỗ hổng logic ngay trên giấy tờ, tiết kiệm tối đa chi phí sửa bug.

---

## 1. MÔ HÌNH AGILE/SCRUM (THỊNH HÀNH & THỰC TẾ NHẤT HIỆN NAY)

Trong Agile/Scrum, giai đoạn đầu thường tương ứng với **Sprint 0** (giai đoạn chuẩn bị) hoặc các buổi **Grooming/Planning** đầu mỗi Sprint. QA làm việc cuốn chiếu và song hành liên tục với Product Owner (PO) và Developer.

### 1.1. Các hoạt động cốt lõi của QA

- **Nghiên cứu và Đánh giá Yêu cầu (User Story Review):**
    - QA tham gia các buổi Product Backlog Refinement (Grooming) cùng PO và Dev.
    - QA chủ động đặt câu hỏi theo tư duy phản biện (Edge cases, góc tối của tính năng) để làm rõ yêu cầu.
    - **Thực tế:** QA sẽ kiểm tra xem User Story đã đạt tiêu chuẩn **DoR (Definition of Ready)** hay chưa để sẵn sàng đưa vào Sprint.
- **Xây dựng Tiêu chí nghiệm thu (Acceptance Criteria - AC):**
    - Phối hợp với PO để viết hoặc làm rõ AC cho từng User Story.
    - Thực tế hiện nay rất chuộng viết AC theo ngôn ngữ **Gherkin (Given-When-Then)** để cả PO, Dev và QA đều có chung một cách hiểu, đồng thời dọn đường cho việc làm Automation Test sau này.
- **Ước lượng khối lượng kiểm thử (Test Estimation):**
    - Tham gia buổi Sprint Planning, cùng team vote Story Point cho các User Story.
    - QA phải đưa ra số Point bao gồm cả thời gian thiết kế test case, chuẩn bị môi trường, thời gian test chức năng và test hồi quy (Regression test).
- **Lập kế hoạch High-level (Test Strategy cho Sprint):**
    - Xác định rõ trong Sprint này tính năng nào cần Test Manual, tính năng nào có thể viết Automation ngay.
    - Xác định các loại test cần tập trung (ví dụ: Sprint này làm nhiều về API thì tập trung API Testing).

### 1.2. Chi tiết các đầu việc của QA theo vòng đời một Sprint (2 tuần) và các Sprint còn lại

#### Giai đoạn 1: Khởi động Sprint (Ngày 1 - Ngày 2)

- **Tham gia Sprint Planning:** Cùng Team cam kết khối lượng công việc (Commit Velocity). QA đóng vai trò làm rõ các điểm mơ hồ trong User Story và thực hiện ước lượng (Estimate) thời gian test cho từng ticket.
- **Tạo QA Task trên Jira/Azure DevOps:** Ngay khi User Story được kéo vào Sprint, QA phải tạo các Sub-task kiểm thử độc lập (ví dụ: _[QA] Design Test Checklist_, _[QA] Execute Test_, _[QA] Automation Script_). Việc này giúp theo dõi effort (năng suất) của QA riêng biệt, không bị dính chung vào task của Dev.
- **Làm sạch tài liệu (Review Yêu cầu sâu):** Đọc kỹ lại các User Story đã chốt, chủ động kiểm tra xem story đã đạt tiêu chuẩn **DoR (Definition of Ready)** chưa. Trao đổi 1-1 với PO nếu phát hiện thiếu màn hình UI/UX hoặc thiếu các trạng thái xử lý lỗi (Error handling, loading).

#### Giai đoạn 2: Thiết kế & Chuẩn bị (Ngày 3 - Ngày 5)

- **Viết Test Checklist / High-level Test Cases:** Dựa vào Acceptance Criteria (AC) để lên kịch bản test. Trong Agile, ưu tiên viết dạng Checklist ngắn gọn, phân tầng (Epic -> Feature -> Scenarios) hoặc cấu trúc Gherkin (Given-When-Then) để tiết kiệm thời gian và dọn đường cho Automation.
- **Review Kịch bản Test với Dev (Early Alignment):** Tiến hành rà soát nhanh (Quick Review 10-15 phút) Checklist với Developer phụ trách tính năng đó.
    - _Mục đích:_ Giúp Dev biết QA sẽ bẫy lỗi ở những điểm nào, từ đó họ tự check code của mình kỹ hơn trước khi giao build, giúp giảm tỷ lệ bug mở lại (re-open).
- **Chuẩn bị Test Data & Môi trường:** Chủ động tạo sẵn các tài khoản test, chuẩn bị các file dữ liệu mẫu (Mock data) hoặc chuẩn bị sẵn script insert database để khi Dev bàn giao là có thể thực thi ngay.

#### Giai đoạn 3: Thực thi cuốn chiếu & Retest (Ngày 6 - Ngày 8)

- **Kiểm thử tính năng (Feature Testing):** Khi Dev hoàn thành ticket nào và chuyển sang trạng thái `Ready for Test`, QA lập tức kéo ticket đó về kiểm thử ngay (Bao gồm API test độc lập trước khi có UI và UI test sau đó).
- **Log Bug & Theo dõi:** Khi phát hiện bug, log ngay lên Jira với đầy đủ thông tin: Steps to reproduce, Actual result, Expected result, Ảnh chụp màn hình/Video, Log file (nếu có).
- **Retest:** Kiểm tra lại các bug đã được Dev chuyển sang trạng thái "Fixed/Resolved".

#### Giai đoạn 4: Hồi quy & Đóng Sprint (Ngày 9 - Ngày 10)

- **Kiểm thử hồi quy (Regression Testing):** Chạy lại bộ kịch bản test cốt lõi (Core regression suite) để đảm bảo việc ghép nối các tính năng mới không làm hỏng các tính năng cũ đang chạy ổn định. (Giai đoạn này ưu tiên dùng Automation Test để chạy quét qua đêm).
- **Chuẩn bị tài liệu Release:** Viết Test Report ngắn gọn (Tổng số test case đã chạy, tỷ lệ pass/fail, danh sách bug còn tồn đọng - Thường là bug Minor/Low được PO chấp nhận dời sang Sprint sau).
- **Tham gia Sprint Review / Demo:** Phối hợp cùng team demo tính năng đã đạt chất lượng "Done" (đạt **DoD - Definition of Done**) cho Khách hàng/Stakeholders xem.
- **Tham gia Sprint Retrospective (Cải tiến):** Đóng góp ý kiến về những điểm nghẽn quy trình trong Sprint vừa qua (ví dụ: Dev bàn giao build muộn, môi trường test không ổn định,...) nhằm đưa ra giải pháp cải tiến cho Sprint sau.

## 1.4 Chiến thuật chạy task song song (Parallel Execution) trong Sprint

Để giải quyết bài toán **"Thắt nút cổ chai"** (Đầu Sprint QA ngồi chơi viết test case - Cuối Sprint Dev ném build ồ ạt khiến QA quá tải), Senior QA cần áp dụng 3 kỹ thuật chạy song song:

- **Kỹ thuật 1: Test sớm từ tầng API (API Testing Parallel)**
    - Trong khi Frontend (UI) đang được code, Backend thường sẽ hoàn thiện API trước. QA không ngồi đợi UI. Hãy sử dụng tài liệu API (Swagger/Postman) để test logic và dữ liệu ở tầng API trước.
    - _Kết quả:_ Khi API đã chuẩn, đến lúc Frontend đổ giao diện lên, QA chỉ cần test chủ yếu về mặt hiển thị và tương tác người dùng, thời gian test UI giảm đi một nửa.
- **Kỹ thuật 2: Quy trình cuốn chiếu dựa trên Feature Toggle hoặc Branch Test**
    - Thống nhất quy trình GitFlow với Dev Lead: Dev code xong tính năng nào, deploy riêng lẻ lên môi trường Test thông qua cơ chế phân nhánh (Git Branch) hoặc bật/tắt tính năng (Feature Toggle). QA vào test độc lập tính năng đó ngay trong ngày, thay vì đợi gom tất cả các ticket lại thành 1 Build lớn vào cuối Sprint.
- **Kỹ thuật 3: Gối đầu công việc (Sprint N + 1 Preparation)**
    - Vào khoảng ngày 7 - ngày 8 của Sprint hiện tại, khi luồng test tính năng mới đã vơi bớt và chuyển sang giai đoạn Regression/Retest ổn định, QA Senior sẽ trích ra khoảng **20% effort** để đọc trước các User Story của **Sprint tiếp theo (Sprint N+1)** trên Backlog, tham gia thảo luận sớm với PO để gỡ các vướng mắc logic trước khi Sprint Planning diễn ra.

### 1.5. Các biểu mẫu/tài liệu QA cần bàn giao (Deliverables)

- **Bộ Tiêu chí nghiệm thu (Acceptance Criteria)** đã được làm rõ và đính kèm trực tiếp vào từng Ticket trên Jira/Azure DevOps.
- **Danh sách Test Checklist / Mindmap:** Ở giai đoạn đầu Agile, thay vì viết Test Case chi tiết tốn thời gian, QA Senior thường tạo Mindmap hoặc Checklist tổng quan các kịch bản lớn (Epic/Feature) để review nhanh với Dev và PO.

### 1.6. Workflow và Chiến thuật chạy task của Automation Tester (In-Sprint Automation)

Trong môi trường Agile, nếu Automation Tester đợi tính năng ổn định hoàn toàn mới viết script thì hệ thống sẽ luôn bị trễ (Lagging Automation). Để chạy song song với Dev và Manual QA, Automation Tester phải áp dụng chiến lược **"Shift-Left Automation"** (Bắt đầu viết script ngay khi tính năng chưa có giao diện).

#### 1.6.1. Quy trình làm việc của Automation Tester theo vòng đời một Sprint (2 tuần)

##### Giai đoạn 1: Khởi động & Phân tích (Ngày 1 - Ngày 2)

- **Đánh giá tính khả thi (Automation Feasibility Review):** Dựa trên danh sách User Story của Sprint, Automation Tester phối hợp với Senior Manual QA để lọc ra các ticket phù hợp để tự động hóa ngay trong Sprint (In-Sprint Automation).
    - _Tiêu chí chọn:_ Các API cốt lõi, các luồng đi chuẩn (Happy Path) của tính năng, hoặc các biểu mẫu nhập liệu có cấu trúc lặp đi lặp lại.
- **Xây dựng kịch bản kiểm thử tự động (Test Scenario Mapping):** Tạo các file kịch bản dưới dạng ngôn ngữ tự nhiên (Bằng file `.feature` nếu dùng framework BDD như Cucumber/CodeceptJS, hoặc dạng hàm `test()` rỗng nếu dùng Playwright/Cypress).

##### Giai đoạn 2: Phát triển Script sớm - Tầng API & Mock UI (Ngày 3 - Ngày 5)

- **Xây dựng Script tầng API trước:** Ngay khi Backend hoàn thành code API (thường vào ngày 3 hoặc ngày 4), Automation Tester viết script kiểm thử API (đọc dữ liệu, kiểm tra mã trạng thái, kiểm tra cấu trúc JSON trả về).
- **Thiết kế khung Page Object Model (POM) và Mock UI:** Dù Frontend chưa xong giao diện, Automation Tester đã dựa vào thiết kế Figma/Design để định nghĩa trước cấu trúc của Page (Page Class).
    - _Mẹo thực tế:_ Thống nhất với Dev Frontend về cách đặt thuộc tính định danh element (ví dụ: luôn đặt `data-testid="btn-submit"`). Automation Tester sẽ viết trước khung xương của Script dựa trên các `data-testid` giả định này.

##### Giai đoạn 3: Ráp nối cấu trúc, Fix locator & Chạy thực tế (Ngày 6 - Ngày 8)

- **Ráp nối Script với giao diện thật (Binding Layout):** Khi Dev vừa deploy code Frontend lên môi trường Test (qua Feature Toggle hoặc Branch riêng), Automation Tester lấy UI thật để cập nhật lại các locator (`id`, `xpath`, `css selector`) bị sai lệch so với giả định ban đầu.
- **Thực thi kiểm thử tự động cục bộ:** Chạy thử nghiệm các bộ script vừa viết trên môi trường local của Automation Tester để đảm bảo script chạy mượt, không bị lỗi lặp (Flaky test).

##### Giai đoạn 4: Tích hợp CI/CD & Đóng Sprint (Ngày 9 - Ngày 10)

- **Merge code vào kho chứa chung (Main Branch):** Tạo Pull Request (PR) để merge bộ script mới vào nhánh chính của dự án Automation.
- **Cập nhật bộ kiểm thử hồi quy (Regression Suite):** Đưa các test case mới viết thành công vào bộ test hồi quy tự động.
- **Cấu hình chạy tự động (CI/CD Pipeline):** Thiết lập để hệ thống CI/CD (Jenkins, GitHub Actions, GitLab CI) tự động kích hoạt (trigger) bộ script này chạy quét qua đêm (Nightly Build) hoặc chạy mỗi khi Dev merge code mới vào nhánh chính.

#### 1.6.2. Chiến thuật phối hợp "Kiềng ba chân": Dev - Manual QA - Automation

## Để Automation chạy song song mượt mà, dự án bắt buộc phải vận hành theo mô hình phối hợp chặt chẽ sau:

## Note:

1.  **Dev và Automation thống nhất "Ngôn ngữ chung":** Dev cam kết thêm các thẻ định danh cố định (như `data-testid`, `id`) vào mã nguồn UI. Điều này giúp Automation Tester viết script trước mà không sợ bị hỏng locator khi giao diện thay đổi layout, màu sắc.
2.  **Manual QA làm "Hoa tiêu" cho Automation:** Manual QA viết checklist/test case luồng chính (Happy Path) trước và ném ngay cho Automation QA. Automation QA sẽ dựa vào đó để dựng script, giải phóng Manual QA khỏi việc phải test đi test lại luồng chính, giúp họ tập trung vào kiểm thử khám phá (Exploratory Testing) và các lỗi biên phức tạp.
3.  **Tách biệt phạm vi công việc rõ ràng:**
    - **Manual QA:** Tập trung test các tính năng mới tinh, giao diện đổi liên tục, kiểm thử độ khả dụng (Usability), và các góc tối của tính năng (Edge cases).
    - **Automation QA:** Tập trung tự động hóa luồng chính của tính năng mới ngay trong Sprint (In-Sprint) và chịu trách nhiệm bảo trì, chạy bộ test hồi quy (Regression Test) cho toàn bộ các tính năng cũ của các Sprint trước.

## 2. MÔ HÌNH WATERFALL (THÁC NƯỚC - TRUYỀN THỐNG & CHẶT CHẼ)

---

Mặc dù Agile chiếm đa số, mô hình Waterfall vẫn được áp dụng rất nhiều trong các dự án làm cho Chính phủ, Ngân hàng, Bảo hiểm, hoặc các dự án Outsourcing có yêu cầu cố định (Fixed Price) ngay từ đầu. Giai đoạn đầu của Waterfall chính là giai đoạn **Requirement Analysis & System Design**.

### 2.1. Các hoạt động cốt lõi của QA

- **Phân tích tài liệu Đặc tả yêu cầu (SRS/BRD Review):**
    - QA đọc toàn bộ tài liệu đặc tả hệ thống (SRS - Software Requirement Specification) hoặc tài liệu nghiệp vụ (BRD).
    - Tìm ra các điểm mâu thuẫn, thiếu logic, hoặc những điểm không khả thi về mặt kiểm thử (Untestable requirements).
    - Tạo file Q&A (Question & Answer) gửi cho Business Analyst (BA) hoặc Khách hàng để chốt lại yêu cầu.
- **Xây dựng Kế hoạch kiểm thử tổng thể (Master Test Plan):**
    - Đây là tài liệu quan trọng nhất của QA Senior trong Waterfall ở giai đoạn đầu.
    - Test Plan phải định nghĩa rõ ràng: Phạm vi kiểm thử (In-Scope/Out-of-Scope), Tiêu chí kích hoạt/dừng test (Entry/Exit Criteria), Môi trường test, Quản lý rủi ro (Risk Management), Nhân sự và Lịch trình (Timeline) chi tiết cho toàn bộ dự án.
- **Thiết kế Ma trận bao phủ kiểm thử (Traceability Matrix - RTM):**
    - Tạo một ma trận liên kết giữa các Yêu cầu (Requirements) với các Test Case sẽ viết. Đảm bảo 100% yêu cầu của khách hàng đều có ít nhất một Test Case để kiểm tra, không bị sót tính năng.

### 2.2. Các biểu mẫu/tài liệu QA cần bàn giao (Deliverables)

- **Tài liệu Master Test Plan** (File Word hoặc Confluence chỉn chu, có chữ ký phê duyệt của PM/Khách hàng).
- **Bảng câu hỏi Q&A Log** (Thường quản lý trên Google Sheets hoặc Excel).
- **Khung ma trận RTM (Requirements Traceability Matrix)**.
- **Kịch bản kiểm thử chi tiết (Test Case Specification):** Trong Waterfall, QA phải hoàn thành việc viết toàn bộ Test Case chi tiết (Step-by-step, Expected Result rõ ràng) ngay từ giai đoạn này, trước khi Dev bắt đầu viết code.

---

## 3. BẢNG SO SÁNH THỰC TẾ WORKFLOW GIA ĐOẠN ĐẦU (AGILE VS WATERFALL)

| Tiêu chí so sánh             | Quy trình trong Agile/Scrum                                                                  | Quy trình trong Waterfall                                                                                   |
| :--------------------------- | :------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| **Tính chất tài liệu**       | Linh hoạt, ngắn gọn (checklist, mindmap, ticket Jira).                                       | Khối lượng lớn, chi tiết, trang trọng (Test Plan file Word, RTM, Test Case dài hàng nghìn dòng).            |
| **Mức độ phối hợp**          | Trao đổi trực tiếp, liên tục hàng ngày (Daily) với Dev và PO.                                | Làm việc độc lập dựa trên tài liệu bàn giao từ BA/Thiết kế hệ thống.                                        |
| **Tâm thế tiếp cận**         | "Thích ứng với thay đổi" - Sẵn sàng cập nhật kế hoạch test khi yêu cầu thay đổi giữa Sprint. | "Bám sát kế hoạch" - Mọi thay đổi về yêu cầu đều phải đi qua quy trình kiểm soát thay đổi (Change Request). |
| **Thời gian viết Test Case** | Cuốn chiếu, viết song song khi Dev đang code trong Sprint.                                   | Viết toàn bộ và hoàn chỉnh trước khi Dev bắt đầu giai đoạn Coding.                                          |

---

## 4. KINH NGHIỆM THỰC TẾ CHO QA SENIOR (BEST PRACTICES)

Dù dự án chạy theo mô hình nào, ở giai đoạn đầu, một QA Senior thực chiến cần tỉnh táo thực hiện 3 điều sau:

1.  **Làm rõ Môi trường (Test Environment) & Dữ liệu (Test Data):** Đừng đợi đến lúc test mới hỏi "Môi trường test ở đâu?", "Ai deploy?", "Lấy tài khoản test ở đâu?". Hãy clear việc này với DevOps/Dev Lead ngay tuần đầu tiên của dự án.
2.  **Định hình Quy trình Quản lý Lỗi (Defect Workflow):** Thống nhất với toàn bộ dự án về các trạng thái của một con Bug (New -> Open -> Resolved -> Ready for Test -> Closed) và quy định thế nào là Bug Severity (Nghiêm trọng): _Blocker, Critical, Major, Minor_.
3.  **Hỏi về Tiêu chí Đóng/Mở (Entry/Exit Criteria):** Phải làm rõ với PM/Dev Lead: _"Điều kiện gì để Dev được phép bàn giao build cho QA?"_ (Ví dụ: Dev phải pass Unit Test > 80% và không còn lỗi Fatal) và _"Điều kiện gì để QA được phép ký nghiệm thu?"_ (Ví dụ: Pass 100% Bug Blocker/Critical, tỷ lệ pass Test Case > 95%).
