// src/pages/admin/films/MovieList.tsx
import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";
import { Calendar, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MovieList = () => {
  const navigate = useNavigate();

  // Mock Data (Dữ liệu giả để test UI)
  const [dataPhim, setDataPhim] = useState([
    {
      maPhim: 1314,
      tenPhim: "Mai",
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/mai_gp01.jpg",
      moTa: "Phim của Trấn Thành, doanh thu 500 tỷ...",
    },
    {
      maPhim: 1329,
      tenPhim: "Đào, Phở và Piano",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/dao-pho-va-piano_gp01.png",
      moTa: "Phim lịch sử cháy vé tại các rạp quốc gia...",
    },
    {
      maPhim: 1344,
      tenPhim: "Kung Fu Panda 4",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/kung-fu-panda-4_gp01.jpg",
      moTa: "Gấu béo trở lại lợi hại hơn xưa...",
    },
  ]);

  const handleDelete = (maPhim: number) => {
    // Lọc ra những phim KHÔNG trùng mã (nghĩa là giữ lại phim khác, bỏ phim này)
    const newData = dataPhim.filter((phim) => phim.maPhim !== maPhim);

    // Cập nhật lại State
    setDataPhim(newData);

    // Alert cho ngầu (sau này thay bằng Toast message)
    alert("Xóa thành công!");
  };

  return (
    <div>
      {/* --- Header & Button Thêm --- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Quản lý Phim</h1>
        <Button
          onClick={() => navigate(PATH.ADMIN_ADD_FILM)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm Phim
        </Button>
      </div>

      {/* --- Table Danh Sách --- */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Mã
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Hình ảnh
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tên phim
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Mô tả
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-right"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {dataPhim.map((phim) => (
              <tr key={phim.maPhim} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {phim.maPhim}
                </td>
                <td className="px-6 py-4">
                  <div className="h-80 w-50 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={phim.hinhAnh}
                      alt={phim.tenPhim}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-3xl font-semibold text-gray-700">
                  {phim.tenPhim}
                </td>
                <td className="px-6 py-4 max-w-xs truncate" title={phim.moTa}>
                  {phim.moTa}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {/* Nút Edit */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() =>
                        navigate(`/admin/films/edit/${phim.maPhim}`)
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    {/* Nút Delete */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(phim.maPhim)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    {/* Nút Lịch Chiếu */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => navigate(`/admin/showtimes/${phim.maPhim}`)}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
