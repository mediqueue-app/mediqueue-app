"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PermissionPrimer } from "@/components/ui/PermissionPrimer";
import {
  openFilePicker,
  queryPermission,
  requestLocation,
  requestNotifications,
} from "@/lib/browser-permissions";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * File / camera pickers have no durable "granted" state. Always explain
 * first, then open the native picker in the same Continue click.
 * Just-in-time: mount only on the upload control, never on layout/login.
 */
export function FilePermissionTrigger({
  accept = "image/*,.pdf,application/pdf",
  capture,
  multiple,
  className,
  children,
  description,
  ariaLabel,
  title,
  onPicked,
}: {
  accept?: string;
  capture?: boolean | "user" | "environment";
  multiple?: boolean;
  className?: string;
  children: ReactNode;
  description?: string;
  ariaLabel?: string;
  title?: string;
  onPicked?: (files: FileList) => void;
}) {
  const t = useT();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        capture={capture}
        multiple={multiple}
        className="hidden"
        tabIndex={-1}
        aria-hidden
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onPicked?.(e.target.files);
          }
          e.target.value = "";
        }}
      />
      <button
        type="button"
        className={className}
        aria-label={ariaLabel}
        title={title}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <PermissionPrimer
        open={open}
        kind="camera"
        title={t("permission.cameraTitle")}
        description={description ?? t("permission.cameraId")}
        confirmLabel={t("permission.cameraAction")}
        onContinue={() => {
          openFilePicker(inputRef.current);
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export function useLocationPermission() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [geoState, setGeoState] = useState<PermissionState | "unknown">(
    "unknown"
  );

  // Status probe only (no native prompt). Needed so a later tap can skip
  // the primer without awaiting queryPermission (await drops the gesture).
  useEffect(() => {
    void queryPermission("geolocation").then(setGeoState);
  }, []);

  const runNative = useCallback(() => {
    void requestLocation()
      .then(() => {
        setGeoState("granted");
        setMessage(t("permission.locationOk"));
      })
      .catch(() => setMessage(t("permission.locationDenied")));
  }, [t]);

  const ask = useCallback(() => {
    if (geoState === "granted") {
      runNative();
      return;
    }
    setOpen(true);
  }, [geoState, runNative]);

  const primer = (
    <PermissionPrimer
      open={open}
      kind="location"
      title={t("permission.locationTitle")}
      description={t("permission.locationBody")}
      confirmLabel={t("permission.locationAction")}
      onContinue={() => {
        runNative();
        setOpen(false);
      }}
      onClose={() => setOpen(false)}
    />
  );

  return { ask, primer, message, located: geoState === "granted" && Boolean(message) };
}

export function BrowserNotifyOptIn({
  className,
  hideWhenSettled,
}: {
  className?: string;
  hideWhenSettled?: boolean;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    NotificationPermission | "unsupported" | null
  >(null);

  useEffect(() => {
    if (typeof Notification === "undefined") {
      setStatus("unsupported");
      return;
    }
    setStatus(Notification.permission);
  }, []);

  if (status === null) return null;

  if (status === "unsupported") {
    if (hideWhenSettled) return null;
    return (
      <p className={cn("text-xs text-slate-500", className)}>
        {t("permission.notifyUnsupported")}
      </p>
    );
  }

  if (status === "granted") {
    if (hideWhenSettled) return null;
    return (
      <p className={cn("text-xs font-medium text-emerald-700", className)}>
        {t("permission.notifyOn")}
      </p>
    );
  }

  if (status === "denied") {
    if (hideWhenSettled) return null;
    return (
      <p className={cn("text-xs text-slate-500", className)}>
        {t("permission.notifyDenied")}
      </p>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex min-h-12 items-center rounded-xl px-3 py-2 text-xs font-semibold text-primary hover:bg-primary-light",
          className
        )}
      >
        {t("permission.notifyEnable")}
      </button>
      <PermissionPrimer
        open={open}
        kind="notifications"
        title={t("permission.notifyTitle")}
        description={t("permission.notifyBody")}
        confirmLabel={t("permission.notifyAction")}
        onContinue={() => {
          void requestNotifications().then(setStatus);
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
