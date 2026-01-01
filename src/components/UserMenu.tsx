import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { useSession } from "../context/sessionContext";
import { routes } from "../router/routes";
import ProfileImage from "./molecules/ProfileImage";
import Heading from "./text/Heading";

// tutaj możesz podać URL do awatara użytkownika

export const UserMenu = () => {
  const { session, profile } = useSession();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { email } = session?.user || {};
  const { username } = profile || {};

  // zamykanie po kliknięciu poza menu
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex" data-tour="user-menu">
      {/* AVATAR */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full transition hover:ring-2 hover:ring-red-500"
      >
        <ProfileImage
          username={profile?.username}
          avatarUrl={profile?.avatar_url}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-10 mt-2 w-48 rounded-lg border border-gray-200 bg-gray-50 shadow-xl">
          <div className="border-b border-gray-700 px-4 py-3">
            <Heading.H4 noMargin>{username || "User"}</Heading.H4>
            {email && <p className="truncate text-sm text-gray-400">{email}</p>}
          </div>

          <button
            onClick={() => {
              setOpen(false);
              navigate(routes.dashboard.main);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300"
          >
            Mój profil
          </button>

          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-800 hover:bg-gray-300"
          >
            Wyloguj
          </button>
        </div>
      )}
    </div>
  );
};
