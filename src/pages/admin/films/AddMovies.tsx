import { useState } from "react";
import { Button } from "@/components/ui/button"; // Component nút của ông

export const AddMovies = () => {
  // 1. State để lưu đường dẫn ảnh tạm thời (blob url)
  const [imgPreview, setImgPreview] = useState<string>("");

  // 2. Hàm xử lý khi người dùng chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Kiểm tra xem có file và có phải là ảnh không
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif")
    ) {
      // Tạo một cái URL ảo cho file đó để hiển thị
      const url = URL.createObjectURL(file);
      setImgPreview(url);
    } else {
      alert("Vui lòng chọn file ảnh (jpg, png, gif)!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Thêm Phim Mới</h1>

      {/* ... Phần form sẽ nằm ở đây ... */}
      <form className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- CỘT TRÁI: THÔNG TIN CƠ BẢN --- */}
          <div className="space-y-6">
            {/* Tên phim */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên phim
              </label>
              <input
                type="text"
                placeholder="Nhập tên phim..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Trailer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trailer URL
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                rows={5}
                placeholder="Nhập nội dung phim..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* --- CỘT PHẢI: SỐ LIỆU & ẢNH --- */}
          <div className="space-y-6">
            {/* Ngày khởi chiếu & Đánh giá (Xếp cùng 1 hàng cho gọn) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày khởi chiếu
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá (Sao)
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
            </div>

            {/* Các nút Switch (Đang chiếu / Hot...) */}
            {/* Phần này tôi sẽ chỉ cách "hack" checkbox thành switch ở dưới */}
            <div className="flex items-center gap-8 py-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 accent-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Đang chiếu
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 accent-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Sắp chiếu
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 accent-red-500" />
                <span className="text-sm font-medium text-red-600">
                  Phim Hot 🔥
                </span>
              </label>
            </div>

            {/* --- UPLOAD ẢNH (Quan trọng) --- */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hình ảnh
              </label>

              <div className="flex items-start gap-4">
                {/* Khung Preview Ảnh */}
                <div className="w-32 h-44 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center overflow-hidden relative">
                  {imgPreview ? (
                    <img
                      src={imgPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Chưa có ảnh</span>
                  )}
                </div>

                {/* Input chọn file */}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} // Gắn hàm xử lý vào đây
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        cursor-pointer"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Chấp nhận: .jpg, .png, .gif (Max 1MB)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nút Submit dưới cùng */}
        <div className="mt-8 flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
            Thêm Phim
          </Button>
        </div>
      </form>
    </div>
  );
};
