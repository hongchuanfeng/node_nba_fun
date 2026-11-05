import Link from "next/link";
import { AnalyticsClientLoader } from "@/components/AnalyticsClientLoader";

export default function NotFound() {
  return (
    <div className="container">
      <AnalyticsClientLoader />
      <div className="article" style={{ textAlign: "center" }}>
        <h1>404</h1>
        <p className="lead">这个页面不存在，或者已经被移动。 / This page does not exist.</p>
        <Link className="btn" href="/zh">
          返回首页
        </Link>
      </div>
    </div>
  );
}
