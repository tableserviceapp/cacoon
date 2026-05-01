export default function Vision() {
  return (
    <section className="section bg-ink">
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          Our vision
        </div>
        <h2 className="display" style={{ marginTop: 12, color: 'var(--cocoon-cream)' }}>
          We&apos;re not building a better job board.
          <br />
          <em>We&apos;re building a different way to hire.</em>
        </h2>
        <p className="lede" style={{ margin: '32px auto 0', maxWidth: 640 }}>
          One where talent is found by what they can do, not what they wrote on a CV. Where companies meet the people who fit, not the people who knew which keywords to stuff. Where careers are built, not chased.
        </p>
      </div>
    </section>
  );
}
