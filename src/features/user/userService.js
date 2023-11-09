import { assert, http } from '../../utils'
import { BASE_URL } from '../../utils/axios'

const getUserProfile = async () => {
  const res = await http.get(`${BASE_URL}/users/user-profile/`)
  return assert(res, res.data, 'Retrieval of User profile failed', res)
}

const updateUserProfile = async data => {
  console.log('in service', data)
  const res = await http.patch(`${BASE_URL}/users/user-profile/`, data)
  return assert(res, res.data, 'user profile update failed', res)
}

const getAllUsers = async () => {
  const res = await http.get(`${BASE_URL}/users/`)
  return assert(res, res.data, 'Retrieval of User profile failed', res)
}
const updateUserProfileImg = async data => {
  // TODO: update the endpoint for image upload image
  const res = await http.patch(`${BASE_URL}/users/user-profile/`, data)
  return assert(res, res.data, 'Upload of user profile image failed', res)
}
const userService = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserProfileImg
}

export default userService
