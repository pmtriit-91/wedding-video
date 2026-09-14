# 💍 Video Slide Đám Cưới 2K (Minh Trí & Cẩm Hương)

Dự án dựng video slide ảnh cưới chuẩn **2K QHD (2560 x 1440 @ 60fps)** phong cách **Editorial Luxury Wedding & Cinematic Motion** bằng công nghệ **Remotion (React + TypeScript)**.

---

## ✨ Tính Năng Nổi Bật

- **Độ phân giải 2K QHD:** `2560 x 1440 px`, tỉ lệ 16:9, tốc độ `60 fps` siêu mượt mà.
- **Thẩm mỹ Chữ (Editorial Typography):** Kết hợp font thời trang *Cormorant Garamond* và font viết tay chữ ký *Great Vibes*.
- **Hiệu ứng Điện ảnh:** Chuyển động máy quay **Ken Burns** (Slow Zoom & Pan), hiệu ứng bụi vàng lung linh (**Golden Dust Bokeh**).
- **Nền vải lụa chuyển động:** Tone màu **Champagne Gold & Warm Ivory** ấm áp, sang trọng, tối ưu cho màn hình LED sân khấu tiệc cưới.
- **Dễ dàng Tùy biến (Custom):** Toàn bộ câu chữ tiếng Việt, ngày cưới, tên dâu rể và danh sách ảnh được quản lý tập trung trong file `src/config/weddingConfig.ts`.

---

## 🚀 Cài Đặt & Chạy Dự Án

### 1. Yêu cầu hệ thống
- **Node.js:** v18 trở lên (khuyên dùng Node 20+)
- **FFmpeg:** Đã cài đặt trên máy

### 2. Cài đặt thư viện
```bash
npm install
```

### 3. Mở xem trước trực tiếp trên trình duyệt (Preview Player)
```bash
npm start
```
Trình duyệt sẽ tự động mở trang web **Remotion Studio** tại `http://localhost:3000`. Bạn có thể:
- Bấm **Play / Pause** để xem video chạy kèm nhạc nền.
- Kéo thanh trượt thời gian để xem từng khung hình.
- Sửa chữ trong file cấu hình và thấy giao diện tự động cập nhật ngay lập tức.

### 4. Xuất video chất lượng cao (Render 2K MP4)
```bash
npm run build
```
hoặc:
```bash
npm run render:2k
```
File video hoàn chỉnh sẽ được xuất ra tại thư mục:
`out/video-dam-cuoi-2k.mp4`

---

## 🎨 Hướng Dẫn Tùy Biến (Custom)

Mở file:
👉 **`src/config/weddingConfig.ts`**

### Đổi tên, ngày cưới & nội dung chữ:
```typescript
export const weddingConfig = {
  groomName: "MINH TRÍ",
  brideName: "CẨM HƯƠNG",
  weddingDate: "27.09.2026",
  scenes: {
    scene01_welcome: { ... },
    scene05_parentGratitude: { ... },
    // ...
  }
};
```
Chỉ cần sửa nội dung tiếng Việt trong dấu ngoặc kép `""` và lưu lại.

### Đổi hình ảnh:
- Chép đè ảnh mới vào thư mục tương ứng trong `public/photos/` (từ thư mục `1` đến `12`).
- Hoặc chỉnh sửa tên file ảnh trong `src/config/weddingConfig.ts`.

---

## 📁 Cấu Trúc Thư Mục

```
video-slide-damcuoi/
├── public/
│   ├── audio/wedding-song.mp3       # Nhạc nền bài hát "Ngày Đầu Tiên"
│   ├── background/satin-backdrop.jpg# Nền vải lụa satin màu sâm banh
│   └── photos/                      # Toàn bộ ảnh cưới phân theo thư mục 1-12
├── src/
│   ├── config/
│   │   └── weddingConfig.ts         # File cấu hình trung tâm (Chữ & Ảnh)
│   ├── components/                  # Các component tái sử dụng (Khung ảnh, Bụi vàng, Nền...)
│   ├── scenes/                      # 12 Phân cảnh video
│   ├── MainVideo.tsx                # Composition tổng thể
│   ├── Root.tsx                     # Khai báo kích thước 2560x1440 @ 60fps
│   └── index.ts                     # Điểm khởi chạy Remotion
├── remotion.config.ts               # Cấu hình H.264, CRF 18, AAC 320k
└── package.json
```
