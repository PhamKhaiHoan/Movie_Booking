import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { movieService } from "@/pages/admin/services/movie.service";
import { PATH } from "@/constants/path";
import dayjs from "dayjs";

export const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    tenPhim: "",
    moTa: "",
    trailer: "",
    ngayKhoiChieu: "",
    danhGia: 0,
    dangChieu: false,
    sapChieu: false,
    hot: false,
  });

  // Gọi API lấy chi tiết phim
  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        const res = await movieService.getMovieDetail(id);
        const movie = res.data.content;

        setFormData({
          tenPhim: movie.tenPhim,
          moTa: movie.moTa,
          trailer: movie.trailer,
          // Format lại ngày cho đúng chuẩn input date (yyyy-MM-dd)
          ngayKhoiChieu: dayjs(movie.ngayKhoiChieu).format("YYYY-MM-DD"),
          danhGia: movie.danhGia,
          dangChieu: movie.dangChieu,
          sapChieu: movie.sapChieu,
          hot: movie.hot,
        });
        setImgPreview(movie.hinhAnh);
      } catch (error) {
        console.error("Lỗi lấy chi tiết phim:", error);
      }
    };
    fetchDetail();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImgPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("maPhim", id || "");
    data.append("tenPhim", formData.tenPhim);
    data.append("trailer", formData.trailer);
    data.append("moTa", formData.moTa);
    data.append("maNhom", "GP01");
    // Format ngày gửi lên API phải là dd/mm/yyyy
    data.append(
      "ngayKhoiChieu",
      dayjs(formData.ngayKhoiChieu).format("DD/MM/YYYY")
    );
    data.append("danhGia", formData.danhGia.toString());
    data.append("dangChieu", formData.dangChieu.toString());
    data.append("sapChieu", formData.sapChieu.toString());
    data.append("hot", formData.hot.toString());

    if (file) {
      data.append("File", file);
    }

    try {
      await movieService.updateMovie(data);
      alert("Cập nhật phim thành công!");
      navigate(PATH.ADMIN_FILMS);
    } catch (error) {
      console.error("Lỗi update:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        Cập nhật Phim: <span className="text-blue-400">{id}</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- CỘT TRÁI --- */}
          <div className="space-y-6">
            {/* Tên phim */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên phim
              </label>
              <input
                type="text"
                name="tenPhim" // 👈 1. Thêm name
                value={formData.tenPhim} // 👈 2. Đổi defaultValue thành value
                onChange={handleChange} // 👈 3. Thêm onChange
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>

            {/* Trailer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trailer
              </label>
              <input
                type="text"
                name="trailer"
                value={formData.trailer}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                rows={5}
                name="moTa"
                value={formData.moTa}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* --- CỘT PHẢI --- */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Ngày khởi chiếu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày khởi chiếu
                </label>
                <input
                  type="date"
                  name="ngayKhoiChieu"
                  value={formData.ngayKhoiChieu}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                />
              </div>

              {/* Đánh giá */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá
                </label>
                <input
                  type="number"
                  name="danhGia"
                  value={formData.danhGia}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* --- SWITCHES (Cập nhật lại cho gọn code) --- */}
            <div className="flex items-center gap-8 py-4">
              {/* Đang chiếu */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="dangChieu" // Thêm name
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                  checked={formData.dangChieu}
                  onChange={handleChange} // Dùng chung handleChange luôn
                />
                <span className="text-sm font-medium text-gray-700">
                  Đang chiếu
                </span>
              </label>

              {/* Sắp chiếu */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="sapChieu"
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                  checked={formData.sapChieu}
                  onChange={handleChange}
                />
                <span className="text-sm font-medium text-gray-700">
                  Sắp chiếu
                </span>
              </label>

              {/* Hot */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="hot"
                  className="w-5 h-5 accent-red-500 cursor-pointer"
                  checked={formData.hot}
                  onChange={handleChange}
                />
                <span className="text-sm font-medium text-red-600">
                  Phim Hot 🔥
                </span>
              </label>
            </div>

            {/* Upload Ảnh (Giữ nguyên) */}
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
