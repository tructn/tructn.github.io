import { FaApple } from "react-icons/fa";
import type { App } from "app/apps";

const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

/* The store's "Get" pill. An app without a store link yet shows its label
   as a plain badge, with the note underneath when there's room. */
export function GetButton({
  app,
  variant,
  withNote,
}: {
  app: App;
  variant?: "soft" | "light";
  withNote?: boolean;
}) {
  let { label, url, note } = app.get;

  if (!url) {
    return (
      <span className="inline-flex flex-col items-center gap-1">
        <span className="get get-static" title={note}>
          <FaApple aria-hidden="true" />
          {label}
        </span>
        {withNote && note && <span className="muted text-xs">{note}</span>}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cx("get", variant && `get-${variant}`)}
    >
      {label}
    </a>
  );
}
