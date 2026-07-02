import { siteConfig } from "@/data/config";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12 lg:px-20">
        <span className="text-xs text-text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span className="text-xs text-text-muted">
          Built with care
        </span>
      </div>
    </footer>
  );
}
