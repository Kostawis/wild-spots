import { ReactNode } from "react";
import Heading from "../../components/text/Heading";

const FormHeader = ({ children }: { children: ReactNode }) => {
  return <Heading.H1>{children}</Heading.H1>;
};

export default FormHeader;
