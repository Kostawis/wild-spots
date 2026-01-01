import { FC } from "react";

const contactEmail = "kartforge.kontakt@gmail.com";

export const PrivacyPolicyPage: FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="mb-6 text-3xl font-bold">Polityka prywatności</h1>

      <p className="mb-6 text-sm text-gray-500">
        Ostatnia aktualizacja: 01.01.2025
      </p>

      {/* 1. Administrator */}
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">1. Administrator danych</h2>
        <p>
          Administratorem danych osobowych jest twórca aplikacji{" "}
          <strong>WildSpots</strong>.
        </p>
        <p className="mt-2">
          Kontakt w sprawach związanych z danymi osobowymi:
          <br />
          <strong>{contactEmail}</strong>
        </p>
      </section>

      {/* 2. Zakres danych */}
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">2. Jakie dane zbieramy</h2>
        <ul className="list-disc pl-6">
          <li>adres e-mail</li>
          <li>nazwa użytkownika (username)</li>
          <li>avatar (jeśli dostarczony przez zewnętrznego dostawcę)</li>
          <li>dane techniczne związane z logowaniem</li>
          <li>treści dodawane przez użytkownika (np. miejscówki)</li>
        </ul>
      </section>

      {/* 3. Cele */}
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          3. Cel przetwarzania danych
        </h2>
        <ul className="list-disc pl-6">
          <li>założenie i obsługa konta użytkownika</li>
          <li>logowanie i autoryzacja</li>
          <li>umożliwienie dodawania i zarządzania miejscówkami</li>
          <li>zapewnienie bezpieczeństwa aplikacji</li>
          <li>kontakt techniczny z użytkownikiem</li>
        </ul>
      </section>

      {/* 4. Podstawa prawna */}
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          4. Podstawa prawna przetwarzania
        </h2>
        <ul className="list-disc pl-6">
          <li>zgoda użytkownika</li>
          <li>wykonanie umowy (świadczenie usługi)</li>
          <li>obowiązki prawne administratora</li>
        </ul>
      </section>

      {/* 5. Dostawcy */}
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          5. Zewnętrzni dostawcy usług
        </h2>
        <p>Dane mogą być przetwarzane przez zaufanych dostawców:</p>
        <ul className="mt-2 list-disc pl-6">
          <li>
            <strong>Supabase</strong> - uwierzytelnianie użytkowników i baza
            danych
          </li>
          <li>
            Dostawcy OAuth (np. Discord) - jeśli użytkownik wybierze logowanie
            zewnętrzne
          </li>
        </ul>
      </section>

      {/* 6. Przechowywanie */}
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          6. Czas przechowywania danych
        </h2>
        <p>
          Dane są przechowywane przez czas istnienia konta użytkownika lub do
          momentu jego usunięcia.
        </p>
      </section>

      {/* 7. Prawa użytkownika */}
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">7. Prawa użytkownika</h2>
        <ul className="list-disc pl-6">
          <li>dostęp do swoich danych</li>
          <li>ich poprawianie</li>
          <li>usunięcie konta i danych</li>
          <li>ograniczenie przetwarzania</li>
          <li>wniesienie skargi do organu nadzorczego</li>
        </ul>
      </section>

      {/* 8. Cookies */}
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          8. Cookies i dane techniczne
        </h2>
        <p>
          Aplikacja wykorzystuje pliki cookies wyłącznie w celu zapewnienia
          prawidłowego działania sesji użytkownika.
        </p>
      </section>

      {/* 9. Zmiany */}
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          9. Zmiany w polityce prywatności
        </h2>
        <p>
          Polityka prywatności może być aktualizowana. O istotnych zmianach
          użytkownicy zostaną poinformowani w aplikacji.
        </p>
      </section>

      {/* 10. Kontakt */}
      <section>
        <h2 className="mb-2 text-xl font-semibold">10. Kontakt</h2>
        <p>
          W razie pytań dotyczących prywatności prosimy o kontakt:
          <br />
          <strong>{contactEmail}</strong>
        </p>
      </section>
    </div>
  );
};
