import styles from './Icon.module.css';

// Icon komponenti — public dizinindeki sprite kullanılır.
// Gereken: public/icons/symbol-defs.svg
// Symbol id'leri `icon-<name>` formatında olmalıdır (ör. icon-delete).
const SPRITE_PATH = '/icons/symbol-defs.svg';

const Icon = ({ name, width = 24, height = 24, className = '', title = '', ariaHidden = false, ...props }) => {
  if (!name) return null;

  const symbolId = name.startsWith('icon-') ? name : `icon-${name}`;
  const href = `${SPRITE_PATH}#${symbolId}`;

  return (
    <svg
      className={`${styles.icon} ${className}`.trim()}
      width={width}
      height={height}
      aria-hidden={ariaHidden || !title}
      role={title ? 'img' : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <use href={href} xlinkHref={href} />
    </svg>
  );
};

export default Icon;