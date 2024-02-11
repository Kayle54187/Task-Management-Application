import * as bcrypt from 'bcryptjs';

export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return await bcrypt.hash(password, salt);
}
