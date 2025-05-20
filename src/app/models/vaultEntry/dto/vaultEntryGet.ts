
export interface vaultEntryGet{
  id: string;
  userId: number;
  name: string;
  username: string;
  decryptedPassword: string;
  url?: string;
  notes?: string;
}
