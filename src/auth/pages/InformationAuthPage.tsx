import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Heading from "../../components/text/Heading";
import Paragraph from "../../components/text/Paragraph";
import { routes } from "../../router/routes";

type Cases = "registerSuccess" | "forgotPasswordSuccess";
type ButtonType = {
  text: string;
  link: string;
} | null;

const MESSAGES: {
  [key in Cases]: {
    heading: string;
    message: string;
    button: ButtonType;
  };
} = {
  registerSuccess: {
    heading: "Zweryfikuj swoje konto",
    message:
      "Wysłaliśmy maila z linkiem do potwierdzenia rejestracji. Sprawdź swoją skrzynkę pocztową.",
    button: {
      text: "Powrót do strony głównej",
      link: routes.home,
    },
  },
  forgotPasswordSuccess: {
    heading: "Resetowanie hasła",
    message:
      "Wysłaliśmy maila z linkiem do zresetowania Twojego hasła. Sprawdź swoją skrzynkę pocztową.",
    button: {
      text: "Powrót do logowania",
      link: routes.login,
    },
  },
};

export const InformationAuthPage: FC<{
  caseType: Cases;
}> = ({ caseType }) => {
  const { heading, message, button } = MESSAGES[caseType];

  return (
    <>
      <Heading.H1>{heading}</Heading.H1>
      <Paragraph>{message}</Paragraph>

      {button && (
        <Button className="mt-5">
          <Link to={button.link}>{button.text}</Link>
        </Button>
      )}
    </>
  );
};
