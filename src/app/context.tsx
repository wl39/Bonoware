import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api, getSession, json, mockMode } from "./api";
import { DB_KEY } from "./storage-key";
import type { Session } from "./types";

interface AppState extends Session {
  pending: boolean;
  sessionError: string;
  notice: string;
  setSession: (session: Session) => void;
  refreshSession: () => Promise<void>;
  notify: (message: string) => void;
  logout: () => Promise<void>;
  follow: (id: string) => Promise<void>;
}
const Context = createContext<AppState | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({
    user: null,
    following: [],
  });
  const [pending, setPending] = useState(true);
  const [sessionError, setSessionError] = useState("");
  const [notice, setNotice] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const refreshSession = useCallback(async () => {
    setPending(true);
    setSessionError("");
    try {
      setSession(await getSession());
    } catch (error) {
      setSessionError((error as Error).message);
    } finally {
      setPending(false);
    }
  }, []);
  useEffect(() => {
    void refreshSession();
    return () => clearTimeout(timer.current);
  }, [refreshSession]);
  useEffect(() => {
    if (!mockMode) return;
    const synchronize = (event: StorageEvent) => {
      if (event.key !== DB_KEY) return;
      // Also updates wishlists when another tab uses this browser's shared session.
      void getSession()
        .then(setSession)
        .catch(() => void refreshSession());
    };
    window.addEventListener("storage", synchronize);
    return () => window.removeEventListener("storage", synchronize);
  }, [refreshSession]);
  const notify = useCallback((message: string) => {
    clearTimeout(timer.current);
    setNotice(message);
    timer.current = setTimeout(() => setNotice(""), 4500);
  }, []);
  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
      startTransition(() => {
        setSession({ user: null, following: [] });
        navigate("/", { replace: true });
      });
      notify("로그아웃했습니다.");
    } catch (error) {
      notify((error as Error).message);
    }
  }
  async function follow(id: string) {
    if (!session.user) {
      navigate("/login", {
        state: { from: location.pathname + location.search },
      });
      return;
    }
    try {
      const saved = !session.following.includes(id);
      const result = await api<{ following: string[] }>(`/following/${id}`, {
        method: "PUT",
        body: json({ saved }),
      });
      setSession((s) => ({ ...s, following: result.following }));
      notify(
        saved ? "관심 상품에 저장했습니다." : "관심 상품에서 삭제했습니다.",
      );
    } catch (error) {
      notify((error as Error).message);
    }
  }
  return (
    <Context.Provider
      value={{
        ...session,
        pending,
        sessionError,
        notice,
        setSession,
        refreshSession,
        notify,
        logout,
        follow,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useApp() {
  const context = useContext(Context);
  if (!context) throw new Error("AppProvider is required");
  return context;
}

export function useResource<T>(path: string | null, version: unknown = 0) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(path));
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    if (!path) {
      setData(undefined);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError("");
    api<T>(path, { signal: controller.signal })
      .then((value) => {
        if (!controller.signal.aborted) setData(value);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [path, version, revision]);
  return { data, error, loading, reload: () => setRevision((v) => v + 1) };
}
