declare module "better-auth/react" {
  export type CreateAuthClientOptions = {
    baseURL?: string;
  };

  export type SignInEmailParams = {
    email: string;
    password: string;
  };

  export type AuthClient = {
    signIn: {
      email: (params: SignInEmailParams) => Promise<unknown>;
    };
    signUp: unknown;
    signOut: () => Promise<void>;
    useSession: () => { data: unknown; isPending: boolean };
  };

  export function createAuthClient(
    options?: CreateAuthClientOptions,
  ): AuthClient;
}
