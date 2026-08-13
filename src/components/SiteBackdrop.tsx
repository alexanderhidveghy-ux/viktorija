export default function SiteBackdrop() {
    return (
        <div className="test2-page-background" style={{ position: "fixed", inset: 0, zIndex: 0 }} aria-hidden="true">
            <div className="test2-page-background__base" />
            <div className="test2-page-background__pearl-wave test2-page-background__pearl-wave--primary" />
            <div className="test2-page-background__pearl-wave test2-page-background__pearl-wave--secondary" />
            <div className="test2-page-background__silk-sheen" />
            <div className="test2-page-background__vignette" />
        </div>
    );
}
