import { useAppSelector } from '@/store/config'

export const useAuth = () => {
  const { user, accessToken } = useAppSelector((state) => state.signIn)
  return { user, accessToken }
}
