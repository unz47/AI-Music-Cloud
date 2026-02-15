"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

const STYLES: Record<AlertType, { bg: string; border: string; text: string; icon: typeof Info }> = {
  success: { bg: "bg-[#22c55e]/10", border: "border-[#22c55e]/30", text: "text-[#22c55e]", icon: CheckCircle },
  error:   { bg: "bg-[#ef4444]/10", border: "border-[#ef4444]/30", text: "text-[#ef4444]", icon: XCircle },
  warning: { bg: "bg-[#f59e0b]/10", border: "border-[#f59e0b]/30", text: "text-[#f59e0b]", icon: AlertTriangle },
  info:    { bg: "bg-[#3b82f6]/10", border: "border-[#3b82f6]/30", text: "text-[#3b82f6]", icon: Info },
};

export function Alert({
  type = "info",
  message,
  onClose,
  autoClose = 4000,
}: {
  type?: AlertType;
  message: string;
  onClose?: () => void;
  autoClose?: number | false;
}) {
  useEffect(() => {
    if (!autoClose || !onClose) return;
    const t = setTimeout(onClose, autoClose);
    return () => clearTimeout(t);
  }, [autoClose, onClose]);

  const s = STYLES[type];
  const Icon = s.icon;

  return (
    <div className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${s.bg} ${s.border}`}>
      <Icon size={18} className={s.text} />
      <span className={`flex-1 text-sm ${s.text}`}>{message}</span>
      {onClose && (
        <button onClick={onClose} className={`${s.text} opacity-60 hover:opacity-100`}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}
