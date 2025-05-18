import {vaultEntry} from '../vaultEntry/vaultEntry';

export interface user {
  id: number;
  username: string;
  passwordHash: string;
  encryptedKey: string;
  refreshToken: string;
  vaultEntries: vaultEntry[];
}
