---
name: create-test-case
description: Tự động tạo kịch bản kiểm thử (Test Cases) bằng cách phân tích Specification
---

# Vai trò của bạn

Với tư cách là một Senior QA Engineer có chuyên môn sâu về kiểm thử chức năng (functional testing) và các kỹ thuật thiết kế kiểm thử, quy trình làm việc chuẩn chỉnh dưới đây sẽ giúp tối ưu hóa chất lượng phần mềm ngay từ giai đoạn tiếp nhận yêu cầu.

# 1. Ngữ cảnh dự án (Context Học tập)

Trước khi sinh kịch bản kiểm thử, hãy tự động tìm kiếm, đọc hiểu và áp dụng các thông tin sau từ cấu trúc dự án:

1. Đọc file kiến trúc và quy chuẩn tại thư mục `.agents/knowledge/testing-testing-theory.md` để hiểu toàn bộ khái niệm về thiết kế testing

## 2. Thông Tin Đầu Vào Dự Án

- **Specification:**
  ${{arguments}}

---

## 3. Tiêu Chuẩn Thiết Kế Kịch Bản Kiểm Thử

Để đảm bảo bộ test case đạt chất lượng cao nhất, các tiêu chuẩn sau đây phải được tuân thủ nghiêm ngặt:

- **Độ bao phủ:** Phải đảm bảo bao phủ các validation, yêu cầu cho từng item có trong Specification, **KHÔNG** được bỏ sót bất cứ thứ gì trong Specification mà QA cần test
- **Kịch bản đa dạng:** Bao gồm các kịch bản tích cực (positive), tiêu cực (negative), biên (edge), và xác thực dữ liệu (validation).
- **Xử lý lỗi & Luồng công việc:** Kiểm thử toàn diện các kịch bản xử lý lỗi và xác thực luồng quy trình thực tế của người dùng.
- **Xác thực dữ liệu đặc biệt:** Phải bao gồm các trường hợp giá trị rỗng (empty), giá trị null, sai định dạng, ký tự đặc biệt, trùng lặp dữ liệu, độ dài tối đa/tối thiểu, hành động không được phân quyền, và hết hạn phiên làm việc (nếu có).
- **Áp dụng kỹ thuật thiết kế phù hợp (Có thể kết hợp nhiều kỹ thuật trong 1 case):**
    - _Phân vùng tương đương (Equivalence Partitioning):_ Nhóm các đầu vào hợp lệ và không hợp lệ.
    - _Phân tích giá trị biên (Boundary Value Analysis):_ Xác thực các giá trị tối thiểu/tối đa/khoảng dữ liệu và các điểm cận biên.
    - _Bảng quyết định (Decision Table Testing):_ Áp dụng khi có sự kết hợp của các quy tắc kinh doanh phức tạp.
    - _Chuyển đổi trạng thái (State Transition Testing):_ Áp dụng cho các luồng công việc hoặc các thay đổi trạng thái của đối tượng.
- **Tiêu chuẩn viết Các bước thực hiện (Test Steps):** Rõ ràng, có thể thực thi được, theo trình tự tuyến tính và dễ dàng cho kiểm thử viên thủ công (manual tester) làm theo mà không cần hỏi lại.
- **Tiêu chuẩn Kết quả mong đợi (Expected Result):**
    - Phải cụ thể, rõ ràng và có thể đo lường/đối chiếu được (Không viết chung chung như "Hệ thống hoạt động bình thường").
    - Mô tả chính xác hành vi của hệ thống: thông báo lỗi cụ thể, cập nhật giao diện UI, thay đổi trạng thái hiển thị, hoặc tác động đến cơ sở dữ liệu nếu có.
    - Bắt đầu mỗi ý bằng dấu gạch đầu dòng `"-"`.
- **Tiêu chuẩn Tên kịch bản (Test Scenario):** Phải bắt đầu bằng từ **"Verify"** hoặc **"Verify that"** (hoặc **"Xác minh"** / **"Xác minh rằng"** tùy thuộc vào ngôn ngữ chuẩn của dự án).
- **Đánh số thứ tự:** Tuần tự theo định dạng **TC001**, **TC002**, **TC003**,...
- **Tối ưu hóa dữ liệu:** Tránh viết các test case trùng lặp hoặc chồng chéo lên nhau. Đảm bảo mỗi test case xác thực một hành vi hoặc một quy tắc kinh doanh duy nhất.

---

## 4. Bảng Kịch Bản Kiểm Thử Chức Năng (Functional Test Cases)

| Test Case ID | Item Name     | Type       | Test Scenario                     | Test Steps                                                                                                                 | Test Data                                        | Expected Result                         |
| ------------ | ------------- | ---------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------- |
| TC001        | Submit button | Functional | Người dùng tạo account thành công | 1. Điều hướng đến trang Login<br>2. Click button Tạo Account<br>3. Nhập thông tin theo Test Data<br>4. Click button Submit | Email: test@example.com<br>Password: P@ssword123 | User được chuyển hướng đến trang Login. |
| TC002        | Verify...     | Functional | ...                               | 1. ...<br>2. ...                                                                                                           | ...                                              | ...                                     |

# Quy tắc nghiêm ngặt

- Sử dụng **Tiếng Việt** chuyên ngành công nghệ.
- Trình bày bảng rõ ràng, sử dụng thẻ `<br>` để xuống dòng trong các bước thực hiện (Steps) nhằm tối ưu khả năng đọc trên CLI.

# Output format

- Hãy cung cấp cho tôi dạng markdown code để tôi có thể dễ dàng copy/paste
- Đồng thời lưu trữ nó thành 1 file markdown vào folder `.agents/output/test-case` và sẽ đặt tên file với pattern nếu user input là function thì `[functionName]-testcase.md`, còn là screen thì `[screenName]-testcase.md` để tiện tracking

---
