import { useEffect, useState } from "react";
import { PageNav } from "./components/PageNav";
import type { ReportPage } from "./data/survey";
import { AirportPage } from "./pages/AirportPage";
import { ComparePage } from "./pages/ComparePage";
import { CoverPage } from "./pages/CoverPage";

function readPage(): ReportPage {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") ?? params.get("view");
  if (page === "vli" || page === "son" || page === "compare" || page === "cover") {
    return page;
  }
  return "cover";
}

function writePage(page: ReportPage) {
  const next = page === "cover" ? window.location.pathname : `?page=${page}`;
  window.history.replaceState(null, "", next);
}

export default function App() {
  const [page, setPage] = useState<ReportPage>(readPage);

  const go = (next: ReportPage) => {
    setPage(next);
    writePage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const order: ReportPage[] = ["cover", "vli", "son", "compare"];
      const index = order.indexOf(page);
      const next =
        event.key === "ArrowRight"
          ? order[Math.min(order.length - 1, index + 1)]
          : order[Math.max(0, index - 1)];
      go(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page]);

  return (
    <div className="leaf-wash min-h-screen">
      <PageNav page={page} onPage={go} />
      {page === "cover" ? <CoverPage onPage={go} /> : null}
      {page === "vli" ? <AirportPage id="vli" onPage={go} /> : null}
      {page === "son" ? <AirportPage id="son" onPage={go} /> : null}
      {page === "compare" ? <ComparePage /> : null}
    </div>
  );
}
