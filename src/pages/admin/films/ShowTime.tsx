// src/pages/admin/films/Showtime.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Showtime = () => {
  const { id } = useParams();

  // State form nhập liệu
  const [formData, setFormData] = useState({
    heThongRap: "",
    cumRap: "",
    ngayChieuGioChieu: "",
    giaVe: 75000,
  });

  // State lưu thông tin phim đang được chọn
  const [movieInfo, setMovieInfo] = useState<any>(null);

  // --- MOCK DATA ---
  const heThongRapMock = [
    {
      maHeThongRap: "BHDStar",
      tenHeThongRap: "BHD Star Cineplex",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png",
    },
    {
      maHeThongRap: "CGV",
      tenHeThongRap: "CGV Cinema",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/cgv.png",
    },
    {
      maHeThongRap: "LotteCinima",
      tenHeThongRap: "Lotte Cinema",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png",
    },
  ];

  const cumRapMock = {
    BHDStar: [
      { maCumRap: "bhd-3-2", tenCumRap: "BHD Star 3/2" },
      { maCumRap: "bhd-bitexco", tenCumRap: "BHD Star Bitexco" },
    ],
    CGV: [
      { maCumRap: "cgv-aeon-binh-tan", tenCumRap: "CGV Aeon Bình Tân" },
      { maCumRap: "cgv-hung-vuong-plaza", tenCumRap: "CGV Hùng Vương Plaza" },
    ],
    LotteCinima: [
      { maCumRap: "lotte-nam-sai-gon", tenCumRap: "Lotte Nam Sài Gòn" },
    ],
  };

  // --- EFFECT: Lấy thông tin phim theo ID ---
  useEffect(() => {
    // Giả lập API lấy chi tiết phim
    const mockMovies = [
      {
        maPhim: "1314",
        tenPhim: "Mai",
        hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/mai_gp01.jpg",
      },
      {
        maPhim: "1329",
        tenPhim: "Đào, Phở và Piano",
        hinhAnh:
          "https://movienew.cybersoft.edu.vn/hinhanh/dao-pho-va-piano_gp01.png",
      },
      {
        maPhim: "1344",
        tenPhim: "Kung Fu Panda 4",
        hinhAnh:
          "https://movienew.cybersoft.edu.vn/hinhanh/kung-fu-panda-4_gp01.jpg",
      },
    ];

    const foundMovie = mockMovies.find((m) => m.maPhim.toString() === id);

    // Nếu tìm thấy thì set, không thì set mặc định để test
    setMovieInfo(
      foundMovie || {
        maPhim: id,
        tenPhim: "Phim chưa cập nhật tên",
        hinhAnh: "https://via.placeholder.com/150",
      }
    );
  }, [id]);

  // @ts-ignore
  const danhSachCumRap = formData.heThongRap
    ? cumRapMock[formData.heThongRap] || []
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payload tạo lịch:", { maPhim: id, ...formData });
    alert("Đã tạo lịch chiếu thành công!");
  };

  return (
    <div className="p-6 flex gap-8">
      {/* --- CỘT TRÁI: INFO PHIM --- */}
      <div className="w-1/3">
        <h2 className="text-xl font-bold text-gray-100 mb-4">Phim đang chọn</h2>
        {movieInfo && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
            <img
              src={movieInfo.hinhAnh}
              alt={movieInfo.tenPhim}
              className="w-48 h-72 object-cover rounded-md shadow-md mb-4"
            />
            <h3 className="text-2xl font-bold text-blue-600 mb-1">
              {movieInfo.tenPhim}
            </h3>
            <p className="text-gray-500 font-mono text-sm">Mã phim: {id}</p>
          </div>
        )}
      </div>

      {/* --- CỘT PHẢI: FORM TẠO LỊCH --- */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">
          Tạo Lịch Chiếu
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Hệ thống rạp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hệ thống rạp
              </label>
              <div className="grid grid-cols-3 gap-4">
                {heThongRapMock.map((htr) => (
                  <div
                    key={htr.maHeThongRap}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        heThongRap: htr.maHeThongRap,
                        cumRap: "",
                      })
                    }
                    className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-blue-50 transition-all ${
                      formData.heThongRap === htr.maHeThongRap
                        ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={htr.logo}
                      alt={htr.tenHeThongRap}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-xs font-semibold text-center">
                      {htr.tenHeThongRap}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Cụm rạp */}
            {formData.heThongRap && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cụm rạp
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white"
                  value={formData.cumRap}
                  onChange={(e) =>
                    setFormData({ ...formData, cumRap: e.target.value })
                  }
                >
                  <option value="">-- Chọn cụm rạp --</option>
                  {danhSachCumRap.map((cr: any) => (
                    <option key={cr.maCumRap} value={cr.maCumRap}>
                      {cr.tenCumRap}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 3. Ngày giờ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày giờ chiếu
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ngayChieuGioChieu: e.target.value,
                    })
                  }
                />
              </div>

              {/* 4. Giá vé */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá vé (VND)
                </label>
                <input
                  type="number"
                  step={5000}
                  value={formData.giaVe}
                  onChange={(e) =>
                    setFormData({ ...formData, giaVe: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 font-bold text-green-600"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 px-8"
              >
                Xác nhận tạo lịch
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
