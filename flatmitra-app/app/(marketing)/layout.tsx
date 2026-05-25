import MarketingLayout from "./MarketingLayout";
import "./marketing-globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-root">
      <MarketingLayout>{children}</MarketingLayout>
    </div>
  );
}
