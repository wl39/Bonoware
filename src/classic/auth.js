import { api } from "../app/api";
export const Auth = {
  currentCredentials: async () => ({}),
  essentialCredentials: () => ({}),
  currentAuthenticatedUser: async () => {
    const session = await api("/session");
    if (!session.user) throw new Error("로그인 후 이용해주세요.");
    return {
      username: session.user.name,
      attributes: {
        ...session.user,
        name: session.user.name,
        nick_name: session.user.name,
        following: session.following,
      },
    };
  },
  signOut: () => api("/auth/logout", { method: "POST" }),
};
export default { Auth, configure: () => {} };
