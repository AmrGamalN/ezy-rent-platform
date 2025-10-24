import { encrypt } from './encrypt.util';

export const generateToken = ({
  status,
  message,
}: {
  status: string;
  message: string;
}): string => {
  const payload = {
    status,
    message,
  };
  const token = encrypt(JSON.stringify(payload));
  return token;
};
