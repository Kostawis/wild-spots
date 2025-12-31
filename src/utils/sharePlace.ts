import { toast } from "sonner";

export const sharePlace = async (placeId: number, placeName?: string) => {
  const url = `${window.location.origin}/?place=${placeId}`;

  // 1️⃣ Native share (mobile + nowoczesne przeglądarki)
  if (navigator.share) {
    try {
      await navigator.share({
        title: placeName ?? "Miejscówka DirtBase",
        text: placeName
          ? `Sprawdź tą miejscówkę: ${placeName}`
          : "Sprawdź tą miejscówkę na DirtBase",
        url,
      });
      return;
    } catch (err) {
      // user anulował → ignorujemy
      console.warn("Share cancelled", err);
    }
  }

  // 2️⃣ Fallback – kopiuj do schowka
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Link skopiowany do schowka");
  } catch {
    prompt("Skopiuj link ręcznie:", url);
  }
};
