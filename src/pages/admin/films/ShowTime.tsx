import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Showtime = () => {
  const { id } = useParams(); // Lấy mã phim từ URL

  // State lưu thông tin form
  const [formData, setFormData] = useState({
    heThongRap: "",
    cumRap: "",
    ngayChieuGioChieu: "",
    giaVe: 75000, // Giá mặc định
  });

  // Dữ liệu giả: Hệ thống rạp
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

  // Dữ liệu giả: Cụm rạp (Sẽ lọc theo Hệ thống rạp)
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

  // Lấy danh sách cụm rạp tương ứng khi chọn Hệ thống rạp
  // @ts-ignore
  const danhSachCumRap = formData.heThongRap
    ? cumRapMock[formData.heThongRap] || []
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu lịch chiếu gửi đi:", {
      maPhim: id,
      ...formData,
    });
    alert("Tạo lịch chiếu thành công! (Check console)");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-2">Tạo Lịch Chiếu</h1>
      <p className="text-gray-400 mb-6">
        Cho phim có mã: <span className="text-blue-400 font-bold">{id}</span>
      </p>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Chọn Hệ thống rạp */}
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

          {/* 2. Chọn Cụm rạp (Chỉ hiện khi đã chọn Hệ thống) */}
          {formData.heThongRap && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cụm rạp
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
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
            {/* 3. Ngày giờ chiếu */}
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

          {/* Submit Button */}
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
  );
};
