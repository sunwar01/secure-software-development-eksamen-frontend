export interface vaultEntry {
  id: string;
  userId: number;
  name: string;
  username: string;
  encryptedPassword: string;
  iv: string;
  url?: string;
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
}
