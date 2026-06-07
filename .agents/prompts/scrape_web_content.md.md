---
name: scrape-web
description: Truy cập URL bằng Playwright MCP và cào nội dung text
arguments:
    - name: url
      description: Địa chỉ trang web cần cào (e.g., https://example.com)
      required: true
---

# CHỈ THỊ CHO CLI AGENT

Bạn là một AI Scraper. Khi lệnh này được gọi, hãy thực hiện các bước sau:

1. Sử dụng kết nối Playwright MCP để truy cập vào địa chỉ URL được cung cấp trong phần tham số.
2. Lấy toàn bộ nội dung text sạch và format về dạng Markdown.
3. Tham chiếu đến tài liệu hệ thống trong thư mục `knowleage/` nếu cần đối chiếu.
4. Xuất kết quả ra file `output/scraped_content.md`.

## DỮ LIỆU ĐẦU VÀO

URL mục tiêu cần xử lý: {{arguments.url}}
