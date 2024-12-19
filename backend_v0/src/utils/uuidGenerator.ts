import { randomBytes } from 'crypto';

export class UuidGenerator {
  public static generateCustomUuid(prefix: string): string {
    const randomString = randomBytes(15).toString('hex');
    return `${prefix}-${randomString}`;
  }
}
