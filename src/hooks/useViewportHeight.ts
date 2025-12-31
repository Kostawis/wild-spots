import { useEffect } from "react";

export const useViewportHeight = () => {
  useEffect(() => {
    const setVh = () => {
      // 1️⃣ Pobieramy faktyczną wysokość okna
      const vh = window.innerHeight * 0.01;

      // 2️⃣ Ustawiamy zmienną CSS --vh
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // 3️⃣ Ustaw na starcie
    setVh();

    // 4️⃣ Aktualizuj przy resize / scroll UI przeglądarki
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);
};
