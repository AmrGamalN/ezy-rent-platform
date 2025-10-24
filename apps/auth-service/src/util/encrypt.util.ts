import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import config from '../config/env.config';
import { CustomError } from '@amrogamal/shared-code';


const ENCRYPTION_KEY = config.encryption.key;
const IV_LENGTH = 16;
const key = crypto.createHash('sha256').update(ENCRYPTION_KEY!).digest();

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

export const decrypt = (encryptedText: string): string | void => {
  try {
    const [iv, encrypted] = encryptedText.split(':');
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(key!),
      Buffer.from(iv, 'hex'),
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch {
    throw new CustomError('Unauthorized', 401, 'Invalid token', false);
  }
};

export const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const comparePassword = (
  password: string,
  hash: string,
): Promise<boolean> => bcrypt.compare(password, hash);
