import bcrypt from 'bcryptjs';
const saltRounds = 10;

/**
 * Bcrypt password encryption for securly storing passwords in the database
 */
class Hasher {
  async hashPassword(password) {
      return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password, hash) {
      return await bcrypt.compare(password, hash);
  }
}

export default new Hasher();