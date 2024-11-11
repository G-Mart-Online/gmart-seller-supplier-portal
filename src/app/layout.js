import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { THEME_OPTIONS } from "@/constants/constants";
import HomeLayout from "@/components/home/HomeLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "GMart",
  description: "GMart Supplier and Seller Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: THEME_OPTIONS.colorPrimary,
                borderRadius: THEME_OPTIONS.boarderRadius,
                colorBgContainer: THEME_OPTIONS.colourBgContainer,
                borderRadiusLG: THEME_OPTIONS.borderRadiusLG,
              },
            }}
          >
            <HomeLayout children={children} />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
