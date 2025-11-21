import { STORAGEKEYS } from '@/constants'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UserInfo = {
  taiKhoan: string
  email: string
  hoTen: string
  soDT: string
  maLoaiNguoiDung: 'QuanTri' | 'KhachHang'
}

type SignInState = {
  accessToken?: string
  user?: UserInfo
}

const initialState: SignInState = {
  accessToken: localStorage.getItem(STORAGEKEYS.ACCESSTOKEN) || '',
  user: localStorage.getItem(STORAGEKEYS.USER)
    ? JSON.parse(localStorage.getItem(STORAGEKEYS.USER) as string)
    : undefined,
}

export const { reducer: signInReducer, actions: signInActions } = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user: UserInfo }>
    ) => {
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user

      localStorage.setItem(STORAGEKEYS.ACCESSTOKEN, action.payload.accessToken)
      localStorage.setItem(STORAGEKEYS.USER, JSON.stringify(action.payload.user))
    },
    signOut: (state) => {
      state.accessToken = ''
      state.user = undefined
      localStorage.removeItem(STORAGEKEYS.ACCESSTOKEN)
      localStorage.removeItem(STORAGEKEYS.USER)
    },
  },
})
