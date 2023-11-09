import { assert, http } from '../../utils';
import { BASE_URL } from '../../utils/axios';

const getNotificationUuid = async () => {
  const res = await http.get(`${BASE_URL}/users/validate-token/`);
  return assert(res, res.data, 'Retrieval of asset by its company ID failed', res);
};
const getNotificationSettings = async () => {
  const res = await http.get(`${BASE_URL}/notification_settings/get/`);
  return assert(res, res.data, 'Retrieval of asset by its company ID failed', res);
};
const updateNotificationSettings = async (data) => {
  const res = await http.put(`${BASE_URL}/notification_settings/1/`, data);
  return assert(res, res.data, 'Retrieval of asset by its company ID failed', res);
};



const notificationService = {
  getNotificationUuid,
  getNotificationSettings,
  updateNotificationSettings,
};

export default notificationService;