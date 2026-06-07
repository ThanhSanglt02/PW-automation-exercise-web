---
name: review-test-case
description: Phân tích và review bộ test case có sẵn để đảm bảo nó đã đủ coverage cho Specification
---

# Quy trình & Bộ Quy tắc Review Test Case Dành cho Senior QA (Codex Agent Configuration)

Tài liệu này định nghĩa bộ quy tắc, tiêu chuẩn và kỹ thuật tối ưu hóa dành cho việc review test case dựa trên Tài liệu đặc tả kỹ thuật (Specification/Spec). Mục tiêu cốt lõi là đảm bảo **độ bao phủ (Coverage) đạt 100% đối với các yêu cầu đã được define trong Spec**, đồng thời gợi ý mở rộng các trường hợp biên (Edge cases) và kịch bản thực tế nhằm nâng cao chất lượng kiểm thử.

Specification: ${{arguments}}

---

## 1. Mục tiêu & Nguyên tắc Cốt lõi của Senior QA khi Review

1. **Không bỏ sót Spec (Zero Spec Omission):** Mọi dòng, mọi điều kiện logic, mọi trạng thái được mô tả trong Spec bắt buộc phải có ít nhất một Test Case bao phủ. Đây là tiêu chí Pass/Fail cao nhất của việc review.
2. **Nghiên cứu Đặc tả Cốt lõi (Core/Global Spec):** Đọc và hiểu rõ kiến trúc tổng thể của hệ thống, bao gồm: Luồng đi của dữ liệu (Data Flow), Ma trận phân quyền chung (Global RBAC), và các quy tắc thiết kế chung (Global Design Rules).
3. **Bước 2: Cô lập Đặc tả Chức năng (Feature Spec):** Nghiên cứu sâu vào Spec cụ thể của chức năng đang được viết Test Case để nắm được các quy trình, điều kiện logic, và các trường dữ liệu đặc thù.
4. **Góp ý mang tính xây dựng:** Khi phát hiện thiếu sót, Senior QA không chỉ nói "Thiếu case" mà phải đưa ra lý do kỹ thuật (ví dụ: áp dụng kỹ thuật gì, tại sao vùng này cần test) để hỗ trợ người viết nâng cao tay nghề.
5. **Phân cấp Edge Case rõ ràng:** \* **Trong Spec:** Bắt buộc phải có (Valid & Invalid).
    - **Ngoài Spec (Edge case/Kịch bản nâng cao):** Góp ý dưới dạng _“Nên bổ sung để hệ thống bền bỉ hơn”_ (Không mang tính ép buộc nhưng khuyến khích).

---

## 2. Các Kỹ thuật Testing Áp dụng & Quy tắc Kiểm tra

### Rule 2.1: Phân vùng tương đương (Equivalence Partitioning - EP)

- **Mục đích:** Chia dữ liệu đầu vào thành các vùng mà hệ thống xử lý giống nhau. Đảm bảo người viết check cả vùng Hợp lệ (Valid) và Không hợp lệ (Invalid).
- **Quy tắc Review:**
    - Kiểm tra xem Tester đã xác định đủ các phân vùng dữ liệu chưa?
    - Đối với mỗi phân vùng Invalid (ví dụ: sai định dạng, vượt quá ký tự, ký tự đặc biệt), bắt buộc phải có kịch bản kiểm tra xem hệ thống có hiển thị đúng câu thông báo lỗi (Error message) theo Spec hay không.
    - _Hành động của Agent:_ Nếu Spec ghi "Hệ thống chỉ chấp nhận số nguyên từ 1 đến 100", hãy check xem có đủ 2 vùng Invalid (Nhỏ hơn 1 và Lớn hơn 100) và 1 vùng Valid (Từ 1 đến 100) hay chưa.

### Rule 2.2: Phân tích giá trị biên (Boundary Value Analysis - BVA)

- **Mục đích:** Tập trung vào các điểm nhạy cảm tại biên của các phân vùng dữ liệu vì lập trình viên thường rất dễ sai sót ở toán tử điều kiện (`<`, `>`, `<=`, `>=`).
- **Quy tắc Review:**
    - Áp dụng quy tắc kiểm thử 3 điểm biên ($B$, $B-1$, $B+1$) hoặc 2 điểm biên tùy thuộc vào mức độ nghiêm trọng.
    - _Ví dụ thực tế:_ Nếu biên yêu cầu là 2, phải kiểm tra xem Tester đã thiết kế các case cho các giá trị: **1** ($B-1$), **2** ($B$), **3** ($B+1$) chưa.
    - _Hành động của Agent:_ Rà soát các trường thông tin có giới hạn (Độ dài chuỗi, Số lượng, Số tiền, Ngày tháng) và đối chiếu xem kịch bản đã bao phủ các điểm cận biên hay chưa. Nếu thiếu, đánh dấu "Cần bổ sung kịch bản kiểm thử giá trị biên cho trường X tại các điểm...".

### Rule 2.3: Bảng quyết định & Chiến lược Pairwise Testing (Decision Table & Pairwise)

- **Mục đích:** Sử dụng khi một chức năng có sự kết hợp của nhiều điều kiện đầu vào khác nhau để tạo ra các hành động/kết quả khác nhau.
- **Quy tắc Review:**
    - Đối với các logic nghiệp vụ phức tạp (ví dụ: Điều kiện áp dụng mã giảm giá dựa trên: Loại user + Tổng tiền + Danh mục sản phẩm), Agent phải tự lập một ma trận logic ngầm để đối chiếu.
    - Đảm bảo không có sự kết hợp (Combination) nào bị bỏ sót. Đặc biệt chú ý đến các case kết hợp các điều kiện sai (tất cả đều sai, một cái đúng các cái còn lại sai).  
      **Quy tắc tối ưu hóa (Pairwise):** Trong trường hợp chức năng có quá nhiều điều kiện dẫn đến bùng nổ tổ hợp kịch bản (ví dụ >32 cases), hãy kiểm tra xem Tester đã áp dụng kỹ thuật kiểm thử cặp (Pairwise Testing) để tinh gọn số case nhưng vẫn đảm bảo độ bao phủ hay chưa.

### Rule 2.4: Kiểm thử chuyển trạng thái (State Transition Testing)

- **Mục đích:** Áp dụng cho các chức năng vận hành theo quy trình (Workflow) hoặc có vòng đời dữ liệu (Ví dụ: Trạng thái đơn hàng, Trạng thái tài khoản).
- **Quy tắc Review:**
    - Agent phải xác định sơ đồ chuyển dịch trạng thái từ Spec (State A $\rightarrow$ State B).
    - **Bắt buộc bao phủ luồng đúng (Valid Transitions):** Khách hàng đặt hàng $\rightarrow$ Chờ thanh toán $\rightarrow$ Đã thanh toán $\rightarrow$ Đang giao hàng.
    - **Bắt buộc bao phủ luồng sai (Invalid Transitions):** Kiểm tra xem Tester có viết case để chặn các luồng chuyển đổi sai logic hay không (Ví dụ: Đơn hàng đang ở trạng thái "Đã hủy" thì không được phép chuyển sang trạng thái "Đang giao hàng").

### Rule 2.5: Ma trận phân quyền & Bảo mật cơ bản (RBAC & Authorization Matrix)

- **Mục đích:** Đảm bảo hệ thống thực thi đúng quy trình phân quyền dựa trên vai trò của người dùng (Role-Based Access Control).
- **Quy tắc Review:**
    - Đối chiếu Test Case với Ma trận phân quyền trong Core Spec.
    - **Kiểm thử tích cực (Positive):** Role được cấp quyền (ví dụ: Admin, Staff) phải có kịch bản thực hiện thành công chức năng.
    - **Kiểm thử tiêu cực (Negative):** Role bị cấm quyền (ví dụ: Customer) bắt buộc phải có test case kiểm tra xem hệ thống có chặn lại và hiển thị lỗi phân quyền (như 403 Forbidden hoặc thông báo "Bạn không có quyền") hay không.

### Rule 2.6: Đoán lỗi & Tư duy Edge Case (Error Guessing)

- **Mục đích:** Dựa trên kinh nghiệm của Senior QA để bắt các lỗi không nằm trong Spec (Ngoại lệ hệ thống, hành vi người dùng dị biệt).
- **Quy tắc Review:**
    - Đưa ra các câu hỏi/góp ý mang tính mở rộng: Click double, bấm Back/Forward của trình duyệt khi đang submit, mất kết nối mạng đột ngột, nhập dữ liệu biểu tượng (Emoji), SQL Injection cơ bản,...
    - Ghi chú rõ ràng: _"Case này không có trong spec, nhưng khuyên khích nên bổ sung (Optional) để tăng tính robust cho sản phẩm."_

---

## 3. Bộ Quy tắc Review Từng Bước (Step-by-Step Review Guide cho Codex Agent)

### Bước 1: Trích xuất Thực thể & Điều kiện từ Spec (Requirement Mapping)

- Đọc kỹ Specification mà user input vào. Trích xuất tất cả các:
    - Input fields (Các trường nhập liệu).
    - Business Rules (Luật nghiệp vụ).
    - Trạng thái hệ thống (System States).
    - Thông báo lỗi/Thành công (Messages).
    - Permission
    - Performance

### Bước 2: Đối chiếu Độ bao phủ (Coverage Check)

- Duyệt qua từng Test Case của Tester.
- Đánh dấu xem mỗi Test Case đang cover cho dòng/mục nào trong Spec.
- **Nếu phát hiện mục nào trong Spec chưa có Test Case nào ánh xạ vào:** Gắn cờ `[CRITICAL MISSING]` - Yêu cầu người viết bổ sung ngay lập tức vì đây là lỗi bỏ sót Spec.

### Bước 3: Áp dụng Bộ lọc Chất lượng Kỹ thuật

- Review sâu vào chi tiết từng case:
    - Tên Test Case có rõ ràng, đi thẳng vào mục tiêu (Verify cái gì) không?
    - Pre-condition (Điều kiện tiên quyết) và Test Data đã rõ ràng chưa?
    - Các bước thực hiện (Steps) có dễ hiểu và có thể tái hiện không?
    - Expected Result (Kết quả mong đợi) có ghi rõ UI thay đổi thế nào hoặc Database cập nhật ra sao không?

### Bước 4: Đưa ra Góp ý & Đánh giá (Output Generation)

- Phân loại các feedback thành 2 nhóm rõ rệt:
    1. **[BẮT BUỘC] (Required):** Những case nằm trong Spec nhưng Tester viết thiếu hoặc viết sai logic mong muốn.
    2. **[BỔ SUNG - EDGE CASE] (Recommended/Optional):** Những case biên sâu, kịch bản nâng cao không có trong Spec nhằm giúp hệ thống mượt mà hơn.

---

## 4. Định dạng Output của Feedback (Template Góp ý)

Khi Agent trả về kết quả review, bắt buộc phải tuân theo format cấu trúc dưới đây để Tester dễ dàng tiếp thu và chỉnh sửa:

### 📊 TỔNG QUAN REVIEW

- **Trạng thái Coverage Spec:** `[X/Y] mục đã cover` (Ví dụ: 18/20 yêu cầu đã có case).
- **Đánh giá chung:** [Đạt / Cần bổ sung nhiều / Viết tốt nhưng thiếu biên...]

### 🔴 Danh sách Case BẮT BUỘC BỔ SUNG (Nằm trong Spec nhưng bị sót/sai)

- Ví dụ như:

1. **Yêu cầu Spec:** `[Mục 3.2 - Giới hạn ký tự mật khẩu]`
    - **Vấn đề:** Chưa có test case kiểm tra trường hợp mật khẩu đúng 8 ký tự và 16 ký tự (Áp dụng Phân tích giá trị biên BVA).
    - **Gợi ý viết:** Tạo thêm case: `Verify rằng hệ thống cho phép đăng ký thành công với mật khẩu dài đúng 8 ký tự.`
2. **Yêu cầu Spec:** `[Mục 4.1 - Nút Thanh Toán]`
    - **Vấn đề:** Thiếu case cho phân vùng Invalid của Số dư tài khoản.
    - **Gợi ý viết:** Áp dụng Phân vùng tương đương, thêm case check khi số dư tài khoản < tổng tiền hóa đơn.

### 🟡 Danh sách Edge Case KHUYẾN KHÍCH BỔ SUNG (Ngoài Spec - Nâng cao chất lượng)

- Ví dụ như:

1. **Kịch bản:** `[Network / Trải nghiệm người dùng]`
    - **Mô tả:** Người dùng nhấn nút "Gửi" liên tục (Double click/Triple click) khi mạng lag.
    - **Mục đích:** Tránh việc hệ thống tạo duplicate dữ liệu (Trùng lặp hóa đơn/User).
2. **Kịch bản:** `[Dữ liệu dị biệt]`
    - **Mô tả:** Nhập tên user có chứa ký tự có dấu phức tạp (ví dụ: Hoàng Nguyễn) hoặc Emoji (😊).
    - **Mục đích:** Đảm bảo hệ thống và Database không bị lỗi mã hóa font (Encoding).
