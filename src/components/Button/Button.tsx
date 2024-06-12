import { ButtonStyle } from "./Button.style";

export default function Button({
  text,
  onClick,
}: {
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <ButtonStyle onClick={onClick}>{text}</ButtonStyle>;
}
