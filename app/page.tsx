import React from 'react';

const coffee = [
  ['House espresso', 'Rich, rounded, a little chocolatey.', '$3.00'],
  ['Flat white', 'Velvety milk, a double shot of comfort.', '$4.50'],
  ['Maple oat latte', 'Espresso, oat milk & a touch of maple.', '$5.50'],
  ['Slow brew', 'Our seasonal single-origin pour-over.', '$4.50'],
];
const bites = [
  ['Butter croissant', 'Golden, flaky, baked for slow mornings.', '$4.00'],
  ['Cinnamon morning bun', 'A soft swirl of cinnamon & brown sugar.', '$4.50'],
  ['Banana & walnut loaf', 'A thick slice, best enjoyed toasted.', '$4.00'],
  ['Sourdough toast', 'Cultured butter & seasonal fruit jam.', '$5.00'],
];
function Cup({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M10 20h25v10a11 11 0 0 1-11 11h-3a11 11 0 0 1-11-11V20Zm25 2h3a6 6 0 0 1 0 12h-4M7 43h32M18 14c-5-5 5-5 0-11m10 11c-5-5 5-5 0-11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function MenuList({ title, items }: { title: string; items: string[][] }) {
  return <div className="menu-column"><h3>{title}</h3><dl>{items.map(([name, detail, price]) => <div className="menu-item" key={name}><dt>{name}</dt><dd className="price">{price}</dd><dd className="description">{detail}</dd></div>)}</dl></div>;
}
export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header wrap">
      <a className="brand" href="#home" aria-label="Ember & Oak home"><Cup /><span>ember <i>&</i> oak<small>COFFEE & GOOD COMPANY</small></span></a>
      <nav aria-label="Main navigation"><a href="#story">Our story</a><a href="#menu">The menu</a><a className="nav-visit" href="#visit">Come on in <span aria-hidden="true">↗</span></a></nav>
    </header>
    <main id="main">
      <section className="hero wrap" id="home" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="little-line" /> YOUR LITTLE CORNER OF CALM</p><h1 id="hero-title">Good coffee.<br />Warm company.<br /><em>Stay a little.</em></h1><p className="hero-description">A neighborhood kind of place. Thoughtfully brewed coffee, something fresh from the oven, and a little room to slow down.</p><a className="button" href="#menu">Find your favorite <span aria-hidden="true">↗</span></a><div className="hero-footnote"><span className="sun" aria-hidden="true">☼</span> Slow mornings. Simple pleasures.</div></div>
        <div className="hero-photo"><img src="/images/coffee.jpg" alt="Hot water poured slowly over freshly ground coffee in a glass brewer" width="1600" height="1067" fetchPriority="high" /><div className="photo-label"><span className="label-star" aria-hidden="true">✳</span><span>BREWED WITH CARE.<br />SERVED WITH HEART.</span></div><span className="photo-caption">A little ritual. A better day.</span></div>
      </section>
      <div className="values-strip"><div className="wrap"><span>Thoughtfully sourced</span><b aria-hidden="true">✳</b><span>Freshly baked</span><b aria-hidden="true">✳</b><span>Always welcoming</span><b aria-hidden="true">✳</b><span>Never in a hurry</span></div></div>
      <section className="story wrap section" id="story" aria-labelledby="story-title"><div className="story-image"><img src="/images/cafe.jpg" alt="A cozy café with wooden tables, plants, and warm hanging lights" width="1100" height="733" loading="lazy" /><span className="image-note">Make yourself at home.</span></div><div className="story-copy"><p className="eyebrow">A SMALL SHOP. A SIMPLE IDEA.</p><h2 id="story-title">A good day starts<br />with a little <em>warmth.</em></h2><p>We imagined Ember & Oak as the kind of place you stumble upon, then keep coming back to. A sunlit table. Your favorite cup. A familiar hello.</p><p>Here, we believe the best things aren’t rushed. From the first grind to the last crumb, there’s care in the little things — and always a seat for you.</p><span className="signature">See you around the table.</span></div></section>
      <section className="menu-section" id="menu" aria-labelledby="menu-title"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">MADE FOR YOUR EVERYDAY</p><h2 id="menu-title">A few good <em>favorites.</em></h2></div><p>Something to sip. Something to savor.<br />Nothing more complicated than that.</p></div><div className="menu-grid"><MenuList title="From the coffee bar" items={coffee} /><MenuList title="From the oven" items={bites} /></div><div className="menu-note"><Cup /><p>Not a coffee person? There’s tea & hot chocolate, too.<br /><span>Sample menu · All prices in USD · Oat milk always welcome</span></p></div></div></section>
      <section className="visit wrap section" id="visit" aria-labelledby="visit-title"><div className="visit-intro"><p className="eyebrow">THERE’S A SEAT FOR YOU</p><h2 id="visit-title">Around the corner.<br /><em>A world away.</em></h2><p>Bring a book, bring a friend, or just bring yourself.<br />We’ll put the kettle on.</p><p className="fiction-note">A little daydream, not a real destination.<br />Ember & Oak is a fictional coffee shop.</p></div><div className="visit-details"><div><h3>Find our little corner</h3><address>24 Willow Lane<br />Bramblewick, BW 1042</address><p className="muted">An imaginary address in an imaginary town.</p></div><div><h3>Time for a good cup</h3><dl className="hours"><div><dt>Monday – Friday</dt><dd>7:00 am – 6:00 pm</dd></div><div><dt>Saturday – Sunday</dt><dd>8:00 am – 5:00 pm</dd></div></dl><p className="muted">Slow starts and warm welcomes, every day.</p></div></div></section>
    </main>
    <footer><div className="wrap footer-inner"><a className="footer-brand" href="#home">ember <i>&</i> oak</a><p>A fictional café. A very real love of coffee.</p><a href="#home">Back to the top <span aria-hidden="true">↑</span></a></div><div className="wrap footer-bottom"><span>© {2026} Ember & Oak · An imaginary neighborhood coffee shop</span><span>Made for the slower moments.</span></div></footer>
  </>;
}
