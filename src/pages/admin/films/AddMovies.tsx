import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { movieService } from "@/pages/admin/services/movie.service";
import { PATH } from "@/constants/path";
import { toast } from "sonner"; // Import Toast đẹp
import dayjs from "dayjs"; // Import thư viện xử lý ngày
import { GROUP_ID } from "@/constants/constants";

export const AddMovies = () => {
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  // 1. State lưu dữ liệu form
  const [formData, setFormData] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    danhGia: 10,
    dangChieu: false,
    sapChieu: false,
    hot: false,
  });

  // 2. Hàm xử lý nhập liệu (Text, Number, Checkbox)
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 3. Hàm xử lý chọn file ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImgPreview(URL.createObjectURL(selectedFile));
    }
  };

  // 4. Hàm Submit form (Cái ông bị mất nè)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tạo FormData để gửi file
    const data = new FormData();
    data.append("tenPhim", formData.tenPhim);
    data.append("trailer", formData.trailer);
    data.append("moTa", formData.moTa);
    data.append("maNhom", GROUP_ID); 
    
    // Format ngày: dd/mm/yyyy (API bắt buộc)
    data.append("ngayKhoiChieu", dayjs(formData.ngayKhoiChieu).format("DD/MM/YYYY"));
    
    data.append("danhGia", formData.danhGia.toString());
    data.append("dangChieu", formData.dangChieu.toString());
    data.append("sapChieu", formData.sapChieu.toString());
    data.append("hot", formData.hot.toString());

    if (file) {
      data.append("File", file);
    } else {
      toast.error("Vui lòng chọn hình ảnh!");
      return;
    }

    // Gọi API với Toast Sonner
    const promise = movieService.addMovie(data);

    toast.promise(promise, {
      loading: "Đang thêm phim...",
      success: () => {
        navigate(PATH.ADMIN_FILMS); // Chuyển trang sau khi thành công
        return "Thêm phim mới thành công!";
      },
      error: (err) => `Thêm thất bại: ${err.response?.data?.content || "Lỗi server"}`,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Thêm Phim Mới</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- CỘT TRÁI --- */}
          <div className="space-y-6">
            {/* Tên phim */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên phim</label>
              <input
                type="text"
                name="tenPhim"
                onChange={handleChange} // Nhớ thêm dòng này
                placeholder="Nhập tên phim..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Trailer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trailer URL</label>
              <input
                type="text"
                name="trailer"
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
              <textarea
                rows={5}
                name="moTa"
                onChange={handleChange}
                placeholder="Nhập nội dung phim..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* --- CỘT PHẢI --- */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Ngày khởi chiếu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày khởi chiếu</label>
                <input
                  type="date"
                  name="ngayKhoiChieu"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              {/* Đánh giá */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá (Sao)</label>
                <input
                  type="number"
                  name="danhGia"
                  min={1}
                  max={10}
                  defaultValue={10}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
            </div>

            {/* Switches */}
            <div className="flex items-center gap-8 py-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" name="dangChieu" onChange={handleChange} className="w-5 h-5 accent-blue-600" />
                <span className="text-sm font-medium text-gray-700">Đang chiếu</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" name="sapChieu" onChange={handleChange} className="w-5 h-5 accent-blue-600" />
                <span className="text-sm font-medium text-gray-700">Sắp chiếu</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" name="hot" onChange={handleChange} className="w-5 h-5 accent-red-500" />
                <span className="text-sm font-medium text-red-600">Phim Hot 🔥</span>
              </label>
            </div>

            {/* Upload Ảnh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
              <div className="flex items-start gap-4">
                <div className="w-32 h-44 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center overflow-hidden relative">
                  {imgPreview ? (
                    <img src={imgPreview} alt="Preview" className="w-full h-full object-cover" />
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
                  <p className="mt-2 text-xs text-gray-500">Chấp nhận: .jpg, .png, .gif (Max 1MB)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nút Submit */}
        <div className="mt-8 flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
            Thêm Phim
          </Button>
        </div>
      </form>
    </div>
  );
};