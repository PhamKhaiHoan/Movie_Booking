import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";
import { Calendar, Edit, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../services/movie.service";
import { toast } from "sonner";

interface Movie {
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  moTa: string;
}

export const MovieList = () => {
  const navigate = useNavigate();

  // 1. State lưu TOÀN BỘ danh sách phim từ API
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [keyword, setKeyword] = useState("");

  // 2. Gọi API lấy hết phim về 1 lần duy nhất
  const fetchMovies = useCallback(async () => {
    try {
      const res = await movieService.getMovieList();
      if (res.data && res.data.content) {
        setMovieList(res.data.content);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách phim:", error);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // 3. Logic tìm kiếm CLIENT-SIDE (Cực nhanh và chính xác)
  // Lọc từ danh sách gốc dựa trên từ khóa
  const filteredMovies = movieList.filter((phim) =>
    phim.tenPhim.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleDelete = async (maPhim: number) => {
    const deletePromise = movieService.deleteMovie(maPhim);

    toast.promise(deletePromise, {
      loading: "Đang xóa phim...",
      success: () => {
        fetchMovies(); 
        return "Xóa phim thành công!";
      },
      error: "Xóa thất bại! (Có thể do phim đã có lịch chiếu)",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Quản lý Phim</h1>
        <Button
          onClick={() => navigate(PATH.ADMIN_ADD_FILM)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm Phim
        </Button>
      </div>

      {/* Thanh Tìm Kiếm */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Nhập tên phim để tìm..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all"
            value={keyword}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Table Danh Sách */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Mã</th>
              <th className="px-6 py-4 font-medium text-gray-900">Hình ảnh</th>
              <th className="px-6 py-4 font-medium text-gray-900">Tên phim</th>
              <th className="px-6 py-4 font-medium text-gray-900">Mô tả</th>
              <th className="px-6 py-4 font-medium text-gray-900 text-right">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {/* 👇 Render filteredMovies thay vì dataPhim */}
            {filteredMovies.length > 0 ? (
              filteredMovies.map((phim) => (
                <tr
                  key={phim.maPhim}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {phim.maPhim}
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-24 w-16 overflow-hidden rounded-md border border-gray-200 shadow-sm">
                      <img
                        src={phim.hinhAnh}
                        alt={phim.tenPhim}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-lg font-semibold text-gray-800">
                    {phim.tenPhim}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate" title={phim.moTa}>
                    {phim.moTa}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                        onClick={() =>
                          navigate(`/admin/films/edit/${phim.maPhim}`)
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={() => handleDelete(phim.maPhim)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                        onClick={() =>
                          navigate(`/admin/showtimes/${phim.maPhim}`)
                        }
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-500 italic"
                >
                  Không tìm thấy phim nào phù hợp với từ khóa "{keyword}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
