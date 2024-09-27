export interface User {
  id: string;
  email: string;
  password: string; // 在实际应用中，这应该是加密的
  name: string;
}
