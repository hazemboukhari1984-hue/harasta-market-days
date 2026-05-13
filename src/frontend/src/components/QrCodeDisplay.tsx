import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import QRCode from "qrcode";
import { useCallback, useEffect, useRef, useState } from "react";

interface QrCodeDisplayProps {
  value: string;
  label?: string;
  size?: number;
  showButtons?: boolean;
  className?: string;
}

export function QrCodeDisplay({
  value,
  label,
  size = 200,
  showButtons = true,
  className = "",
}: QrCodeDisplayProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    })
      .then(() => {
        setDataUrl(canvasRef.current?.toDataURL("image/png") ?? null);
      })
      .catch(() => {});
  }, [value, size]);

  const handleDownload = useCallback(() => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `booking-qr-${value}.png`;
    a.click();
  }, [dataUrl, value]);

  const handlePrint = useCallback(() => {
    if (!dataUrl) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Booking Confirmation — ${value}</title>
          <style>
            body { font-family: system-ui, sans-serif; text-align: center; padding: 40px; }
            img { display: block; margin: 0 auto 20px; }
            .ref { font-family: monospace; font-size: 22px; font-weight: bold; letter-spacing: 2px; margin-bottom: 8px; }
            .label { color: #666; font-size: 14px; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="label">Harasta Market Days — أيام سوق حرستا</div>
          <br/>
          <img src="${dataUrl}" width="250" height="250" alt="QR Code" />
          <div class="ref">${value}</div>
          <div class="label">Booking Reference / رقم الحجز</div>
          <script>window.onload = function(){ window.print(); }<\/script>
        </body>
      </html>
    `);
    win.document.close();
  }, [dataUrl, value]);

  return (
    <div
      className={`flex flex-col items-center gap-3 ${className}`}
      data-ocid="qr.container"
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="rounded-lg border border-border/60 shadow-sm"
        aria-label={`QR code for booking ${value}`}
      />
      {label && (
        <p className="text-xs text-muted-foreground text-center">{label}</p>
      )}
      {showButtons && (
        <div className="flex gap-2 flex-wrap justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={!dataUrl}
            className="border-primary/40 text-primary hover:bg-primary/10 text-xs"
            data-ocid="qr.download_button"
          >
            {t("qrDownload")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            disabled={!dataUrl}
            className="border-border/60 text-muted-foreground hover:text-foreground text-xs"
            data-ocid="qr.print_button"
          >
            {t("qrPrint")}
          </Button>
        </div>
      )}
    </div>
  );
}
