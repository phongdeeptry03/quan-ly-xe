import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: "Quản lý chuyến xe",
  description: "Quản lý doanh thu, chi phí và lợi nhuận xe tải"
};

export default function RootLayout({children}) {
  return (
    <html lang="vi">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
