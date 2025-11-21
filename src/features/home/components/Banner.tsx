import { useQueryBanners } from '../useQueryBanners'

export const Banner = () => {
  const { data: banners, isLoading } = useQueryBanners()

  if (isLoading) return <div className="h-80 flex items-center justify-center">Loading...</div>

  return (
    <div className="container mx-auto mt-4">
      <div className="relative overflow-hidden rounded-xl h-80">
        {banners?.[0] && (
          <img
            src={banners[0].hinhAnh}
            alt="banner"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  )
}
