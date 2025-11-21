import { useEffect, useState } from "react";
import { cinemaService } from "@/pages/admin/services/cinema.service";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface FlatShowtime {
  maLichChieu: number;
  tenHeThongRap: string;
  tenCumRap: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieuGioChieu: string;
  giaVe: number;
  thoiLuong: number;
}
export const ShowtimeList = () => {
  const navigate = useNavigate();
  const [showtimes, setShowtimes] = useState<FlatShowtime[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  // 1. Cấu hình phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Số lượng hiển thị trên 1 trang

  useEffect(() => {
    const fetchShowtimes = async () => {
      setLoading(true);
      try {
        const res = await cinemaService.getShowtimesBySystem();
        const rawData = res.data.content;

        const flatList: FlatShowtime[] = [];
        rawData.forEach((heThong: any) => {
          heThong.lstCumRap.forEach((cumRap: any) => {
            cumRap.danhSachPhim.forEach((phim: any) => {
              phim.lstLichChieuTheoPhim.forEach((lichChieu: any) => {
                flatList.push({
                  maLichChieu: lichChieu.maLichChieu,
                  tenHeThongRap: heThong.tenHeThongRap,
                  tenCumRap: cumRap.tenCumRap,
                  tenPhim: phim.tenPhim,
                  hinhAnh: phim.hinhAnh,
                  ngayChieuGioChieu: lichChieu.ngayChieuGioChieu,
                  giaVe: lichChieu.giaVe,
                  thoiLuong: 120,
                });
              });
            });
          });
        });

        // Sort mới nhất
        flatList.sort(
          (a, b) =>
            dayjs(b.ngayChieuGioChieu).unix() -
            dayjs(a.ngayChieuGioChieu).unix()
        );

        setShowtimes(flatList);
      } catch (error) {
        console.error("Lỗi lấy lịch chiếu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  // Reset về trang 1 khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  // 2. Lọc & Tính toán dữ liệu cho trang hiện tại
  const filteredShowtimes = showtimes.filter(
    (item) =>
      item.tenPhim.toLowerCase().includes(keyword.toLowerCase()) ||
      item.tenCumRap.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(filteredShowtimes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredShowtimes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="pb-10">
      {" "}
      {/* Thêm padding bottom để không bị che footer */}
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Quản lý Lịch Chiếu</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate(PATH.ADMIN_FILMS)}
        >
          + Tạo Lịch Mới (Vào Phim)
        </Button>
      </div>
      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên phim hoặc tên rạp..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white flex flex-col">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            Đang tải dữ liệu lịch chiếu...
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Mã lịch
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Hệ thống / Rạp
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Phim
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Ngày giờ chiếu
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Giá vé
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <tr key={item.maLichChieu} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-xs">
                          {item.maLichChieu}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {item.tenHeThongRap}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.tenCumRap}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <img
                              src={item.hinhAnh}
                              alt=""
                              className="w-10 h-14 object-cover rounded shadow-sm"
                            />
                            <span
                              className="font-bold text-gray-800 max-w-[200px] truncate"
                              title={item.tenPhim}
                            >
                              {item.tenPhim}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-green-600">
                            {dayjs(item.ngayChieuGioChieu).format("DD/MM/YYYY")}
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            {dayjs(item.ngayChieuGioChieu).format("HH:mm")}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-orange-600">
                          {formatCurrency(item.giaVe)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-gray-400"
                      >
                        Không tìm thấy lịch chiếu nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 3. Thanh Phân Trang (Pagination Bar) */}
            {filteredShowtimes.length > 0 && (
              <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6">
                {/* Mobile view */}
                <div className="flex flex-1 justify-between sm:hidden">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Trước
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Sau
                  </Button>
                </div>

                {/* Desktop view */}
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Hiển thị{" "}
                      <span className="font-medium">{startIndex + 1}</span> đến{" "}
                      <span className="font-medium">
                        {Math.min(
                          startIndex + itemsPerPage,
                          filteredShowtimes.length
                        )}
                      </span>{" "}
                      trong tổng số{" "}
                      <span className="font-medium">
                        {filteredShowtimes.length}
                      </span>{" "}
                      kết quả
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <Button
                        variant="outline"
                        className="rounded-l-md px-3 py-2"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center justify-center px-4 border-y border-input bg-white text-sm font-medium min-w-[100px]">
                        Trang {currentPage} / {totalPages}
                      </div>

                      <Button
                        variant="outline"
                        className="rounded-r-md px-3 py-2"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
