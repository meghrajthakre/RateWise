export default function Header() {
  return (
    <header className="app-header">
      <div className="brand-mark" aria-hidden="true">RW</div>
      <div className="brand-copy">
        <h1>RateWise</h1>
        <p>Compare smarter. Stay wiser.</p>
      </div>
      <button className="icon-button" type="button" aria-label="Settings" title="Settings">⚙</button>
    </header>
  );
}