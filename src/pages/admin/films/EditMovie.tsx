import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 👈 Import cái này để lấy ID trên URL
import { Button } from "@/components/ui/button";

export const EditMovie = () => {
  const { id } = useParams(); // Lấy mã phim từ URL
  const [imgPreview, setImgPreview] = useState<string>("");

  // State giả lập dữ liệu form (Sau này dùng React Hook Form sẽ gọn hơn)
  const [formData, setFormData] = useState({
    tenPhim: "",
    moTa: "",
    trailer: "",
    ngayKhoiChieu: "",
    danhGia: 0,
    dangChieu: false, // Thêm cái này
    sapChieu: false, // Thêm cái này
    hot: false, // Thêm cái này
  });

  // Giả bộ gọi API lấy thông tin phim khi vào trang
  useEffect(() => {
    const mockDataTuAPI = {
      tenPhim: "Mai (Đã chỉnh sửa)",
      moTa: "Phim của Trấn Thành...",
      trailer: "https://youtube.com/...",
      ngayKhoiChieu: "2024-02-10",
      danhGia: 9,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/mai_gp01.jpg",
      dangChieu: true, // Giả sử phim này đang chiếu
      sapChieu: false,
      hot: true, // Và nó đang Hot
    };

    setFormData(mockDataTuAPI);
    setImgPreview(mockDataTuAPI.hinhAnh);
  }, [id]);

  // ... (Giữ nguyên hàm handleFileChange)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif")
    ) {
      const url = URL.createObjectURL(file);
      setImgPreview(url);
    } else {
      alert("Vui lòng chọn file ảnh (jpg, png, gif)!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        Cập nhật Phim: <span className="text-blue-400">{id}</span>
      </h1>

      <form className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CỘT TRÁI */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên phim
              </label>
              <input
                type="text"
                defaultValue={formData.tenPhim} // 👈 Dùng defaultValue để hiện data cũ
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trailer
              </label>
              <input
                type="text"
                defaultValue={formData.trailer}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                rows={5}
                defaultValue={formData.moTa}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
              />
            </div>
          </div>

          {/* CỘT PHẢI */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày khởi chiếu
                </label>
                <input
                  type="date"
                  defaultValue={formData.ngayKhoiChieu}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá
                </label>
                <input
                  type="number"
                  defaultValue={formData.danhGia}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
            </div>

            {/* ... (Phần Switch giữ nguyên) ... */}
            {/* --- CHÈN ĐOẠN NÀY VÀO GIỮA "NGÀY/ĐÁNH GIÁ" VÀ "UPLOAD ẢNH" --- */}
            <div className="flex items-center gap-8 py-4">
              {/* Switch Đang chiếu */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                  checked={formData.dangChieu} // Binding dữ liệu (True thì tick)
                  onChange={(e) =>
                    setFormData({ ...formData, dangChieu: e.target.checked })
                  } // Cập nhật state khi bấm
                />
                <span className="text-sm font-medium text-gray-700">
                  Đang chiếu
                </span>
              </label>

              {/* Switch Sắp chiếu */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                  checked={formData.sapChieu}
                  onChange={(e) =>
                    setFormData({ ...formData, sapChieu: e.target.checked })
                  }
                />
                <span className="text-sm font-medium text-gray-700">
                  Sắp chiếu
                </span>
              </label>

              {/* Switch Hot */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-red-500 cursor-pointer"
                  checked={formData.hot}
                  onChange={(e) =>
                    setFormData({ ...formData, hot: e.target.checked })
                  }
                />
                <span className="text-sm font-medium text-red-600">
                  Phim Hot 🔥
                </span>
              </label>
            </div>

            {/* Upload Ảnh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hình ảnh
              </label>
              <div className="flex items-start gap-4">
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
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 px-8"
          >
            Lưu Cập Nhật
          </Button>
        </div>
      </form>
    </div>
  );
};
