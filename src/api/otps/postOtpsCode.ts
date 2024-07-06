import { instance } from '../instanse';

export const postOtpsCode = async (Phone: string) =>
  await instance.post('/auth/otp', { phone: Phone });
