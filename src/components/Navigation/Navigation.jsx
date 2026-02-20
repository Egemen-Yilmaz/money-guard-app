import sprite from "../assets/icons/symbol-defs.svg";

export default function TestIcon() {
  return (
    <svg width="240" height="240">
      <use href={`${sprite}plus`} />
    </svg>
  );
}