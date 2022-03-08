import { useState } from "react";

export default function useText() {
  const [text, setText] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return { text, setText, onChange };
}
