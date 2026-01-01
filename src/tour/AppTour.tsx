import { useState } from "react";
import Joyride, { CallBackProps, EVENTS, STATUS } from "react-joyride";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";

const steps = [
  {
    target: "[data-tour='map']",
    content:
      'To jest mapa z miejscówkami, po kliknięciu w dane miejsce mozesz dodać je do mapy jako "miejscówkę"',
    route: routes.home,
  },
  {
    target: "[data-tour='user-menu']",
    content: "Tutaj zarządzasz swoim kontem",
    route: routes.home,
  },
  {
    target: "[data-tour='my-places']",
    content: "Tutaj widzisz wszystkie dodane przez siebie miejscówki",
    route: routes.dashboard.places,
  },
];

export const AppTour = () => {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { index, type, status } = data;

    const nextStep = steps[index + 1];

    // ⛔ koniec tutoriala
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      return;
    }

    // 👉 PO KROKU
    if (type === EVENTS.STEP_AFTER) {
      // ⬇️ routing między krokami
      if (index === 1) {
        navigate(nextStep.route);
      }

      setStepIndex(index + 1);
    }
  };

  return (
    <Joyride
      steps={steps}
      stepIndex={stepIndex}
      callback={handleJoyrideCallback}
      continuous
      showSkipButton
      showProgress
    />
  );
};
