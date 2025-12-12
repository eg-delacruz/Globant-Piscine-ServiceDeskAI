import { hash } from 'bcrypt';

import { User } from '@modules/user/user.model';
import { logger } from '@config/logger';
import env from '@config/env';

export const ensureSuperUser = async () => {
  const email = env.SUPER_EMAIL;
  const password = env.SUPER_PASS;

  if (!email || !password) {
    logger.error('Super user env variables missing (SUPER_EMAIL, SUPER_PASS).');
    return;
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      logger.info(`Super user already exists (${email})`);
      return;
    }
    // Create new super user
    const hashed = await hash(password, 10);
    await User.create({
      email,
      password: hashed,
      role: 'super_user',
    });
    logger.info(`Super user created successfully (${email})`);
  } catch (err) {
    logger.error('Error ensuring super user: ' + err);
  }
};
