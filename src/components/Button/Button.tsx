import { ButtonStyle } from "./Button.style";

export default function Button({
  text,
  onClick,
  disabled,
  type,
  name,
}: {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  name?: string;
}) {
  return (
    <ButtonStyle onClick={onClick} disabled={disabled} type={type} name={name}>
      {text}
    </ButtonStyle>
  );
}
