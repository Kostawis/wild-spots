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
        className="transition rounded-full hover:ring-2 hover:ring-red-500"
      >
        <ProfileImage
          username={profile?.username}
          avatarUrl={profile?.avatar_url}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 w-48 mt-2 border border-gray-200 rounded-lg shadow-xl top-10 bg-gray-50">
          <div className="px-4 py-3 border-b border-gray-700">
            <Heading.H4 noMargin>{username || "User"}</Heading.H4>
            {email && <p className="text-sm text-gray-400 truncate">{email}</p>}
          </div>

          <button
            onClick={() => {
              setOpen(false);
              navigate(routes.dashboard.places);
            }}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-300"
          >
            Moje miejscówki
          </button>

          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-sm text-left text-red-800 hover:bg-gray-300"
          >
            Wyloguj
          </button>
        </div>
      )}
    </div>
  );
};
