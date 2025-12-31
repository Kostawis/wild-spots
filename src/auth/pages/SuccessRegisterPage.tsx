import { FC } from "react";
import Heading from "../../components/text/Heading";
import Paragraph from "../../components/text/Paragraph";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";

type Cases = "processing";
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
  processing: {
    heading: "Zweryfikuj swoje konto",
    message:
      "Wysłaliśmy maila z linkiem do potwierdzenia rejestracji. Sprawdź swoją skrzynkę pocztową.",
    button: {
      text: "Powrót do strony głównej",
      link: routes.home,
    },
  },
};

export const SuccessRegisterPage: FC<{
  caseType: Cases;
}> = ({ caseType }) => {
  const { heading, message, button } = MESSAGES[caseType];

  return (
    <>
      <Heading.H1>{heading}</Heading.H1>
      <Paragraph>{message}</Paragraph>

      {button && (
        <Link to={button.link}>
          <Button className="mt-5">{button.text}</Button>
        </Link>
      )}
    </>
  );
};
