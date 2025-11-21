import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { movieService } from "@/pages/admin/services/movie.service";
import { cinemaService } from "@/pages/admin/services/cinema.service";
import dayjs from "dayjs";
import { toast } from "sonner";

export const Showtime = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState<any>(null);

  // Data cho Select box
  const [heThongRap, setHeThongRap] = useState<any[]>([]);
  const [cumRap, setCumRap] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    maHeThongRap: "",
    maRap: "", // Mã cụm rạp
    ngayChieuGioChieu: "",
    giaVe: 75000,
  });

  // --- EFFECT: Lấy thông tin phim theo ID ---
  // 1. Lấy thông tin phim + Hệ thống rạp khi mới vào trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chạy song song 2 API cho nhanh
        const [movieRes, sysRes] = await Promise.all([
          movieService.getMovieDetail(id!),
          cinemaService.getCinemaSystems(),
        ]);

        setMovieInfo(movieRes.data.content);
        setHeThongRap(sysRes.data.content);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      }
    };
    fetchData();
  }, [id]);

  // 2. Khi chọn Hệ thống rạp -> Gọi API lấy Cụm rạp
  const handleSelectHeThongRap = async (maHeThongRap: string) => {
    setFormData({ ...formData, maHeThongRap, maRap: "" }); // Reset cụm rạp
    try {
      const res = await cinemaService.getCinemaClusters(maHeThongRap);
      setCumRap(res.data.content);
    } catch (error) {
      console.error("Lỗi lấy cụm rạp:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      maPhim: id,
      ngayChieuGioChieu: dayjs(formData.ngayChieuGioChieu).format(
        "DD/MM/YYYY HH:mm:ss"
      ),
      maRap: formData.maRap,
      giaVe: formData.giaVe,
    };

    const promise = cinemaService.createShowtime(payload);

    toast.promise(promise, {
      loading: "Đang tạo lịch chiếu...",
      success: "Tạo lịch chiếu thành công!",
      error: (err) =>
        `Thất bại: ${err.response?.data?.content || "Lỗi không xác định"}`,
    });
  };

  return (
    <div className="p-6 flex gap-8">
      {/* Cột trái: Info Phim */}
      <div className="w-1/3">
        {movieInfo && (
          <div className="bg-white p-4 rounded shadow text-center">
            <img
              src={movieInfo.hinhAnh}
              alt={movieInfo.tenPhim}
              className="w-full h-64 object-cover rounded mb-2"
            />
            <h3 className="font-bold text-xl">{movieInfo.tenPhim}</h3>
          </div>
        )}
      </div>

      {/* Cột phải: Form */}
      <div className="flex-1 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Tạo Lịch Chiếu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Chọn Hệ Thống Rạp */}
          <div className="grid grid-cols-3 gap-4">
            {heThongRap.map((htr) => (
              <div
                key={htr.maHeThongRap}
                onClick={() => handleSelectHeThongRap(htr.maHeThongRap)}
                className={`border p-2 rounded cursor-pointer flex flex-col items-center hover:bg-blue-50 ${
                  formData.maHeThongRap === htr.maHeThongRap
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                <img src={htr.logo} className="w-10 h-10" />
                <span className="text-xs mt-1 font-bold">
                  {htr.tenHeThongRap}
                </span>
              </div>
            ))}
          </div>

          {/* Chọn Cụm Rạp */}
          <select
            className="w-full border p-2 rounded"
            value={formData.maRap}
            onChange={(e) =>
              setFormData({ ...formData, maRap: e.target.value })
            }
          >
            <option value="">-- Chọn cụm rạp --</option>
            {cumRap.map((cr) => (
              <option key={cr.maCumRap} value={cr.maCumRap}>
                {cr.tenCumRap}
              </option>
            ))}
          </select>

          {/* Ngày giờ & Giá vé */}
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFormData({ ...formData, ngayChieuGioChieu: e.target.value })
            }
          />

          <input
            type="number"
            className="w-full border p-2 rounded"
            value={formData.giaVe}
            onChange={(e) =>
              setFormData({ ...formData, giaVe: Number(e.target.value) })
            }
          />

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Xác nhận
          </Button>
        </form>
      </div>
    </div>
  );
};
