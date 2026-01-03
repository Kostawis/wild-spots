import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase";
import { Tables } from "../supabase/database.types";

type Profile = Tables<"profiles">;

const SessionContext = createContext<{
  session: Session | null;
  profile: Profile | null;
}>({
  session: null,
  profile: null,
});

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

type Props = { children: React.ReactNode };
export const SessionProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [sessionLoading, setSessionLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // 1️⃣ LISTENER SESJI
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
        setSessionLoading(false);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 2️⃣ POBIERANIE PROFILU (TYLKO GDY JEST SESSION)
  useEffect(() => {
    if (!session?.user?.id) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }

    setProfileLoading(true);

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        setProfile(null);
      } else {
        setProfile(data);
      }

      setProfileLoading(false);
    };

    fetchProfile();
  }, [session?.user?.id]);

  // 3️⃣ KLUCZOWA LOGIKA UI
  const isLoading = sessionLoading || (session && profileLoading);

  if (isLoading) {
    return null;
  }

  return (
    <SessionContext.Provider value={{ session, profile }}>
      {children}
    </SessionContext.Provider>
  );
};
