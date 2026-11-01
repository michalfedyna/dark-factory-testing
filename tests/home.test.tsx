import React from 'react';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync, readFileSync } from 'node:fs';
import Home from '../app/page';

const html = renderToStaticMarkup(<Home />);
test('contains the complete illustrative shop information and priced menu', () => {
  for (const text of ['ember', 'oak', 'A neighborhood kind of place', 'House espresso', '$3.00', 'Maple oat latte', '$5.50', 'Butter croissant', '$4.00', 'Monday – Friday', '7:00 am – 6:00 pm', 'Saturday – Sunday', '8:00 am – 5:00 pm', '24 Willow Lane', 'Bramblewick', 'fictional coffee shop', 'imaginary address', 'All prices in USD']) assert.ok(html.includes(text), text);
  assert.equal((html.match(/class="menu-item"/g) || []).length, 8);
});
test('semantic headings and keyboard-native navigation point to existing destinations', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  for (const anchor of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${anchor[1]}"`), anchor[1]);
  assert.ok(html.includes('Skip to content'));
  assert.ok(html.includes('aria-label="Main navigation"'));
  assert.ok(!html.includes('tabindex="-1"'));
  for (const image of html.matchAll(/<img\b[^>]*>/g)) assert.match(image[0], /alt="[^"]+"/);
});
test('page is informational only and assets resolve locally', () => {
  assert.doesNotMatch(html, /<(form|input|button|iframe)\b/);
  for (const anchor of html.matchAll(/href="([^"]+)"/g)) assert.ok(anchor[1].startsWith('#') || anchor[1].startsWith('/images/'));
  for (const image of html.matchAll(/src="([^"]+)"/g)) assert.ok(existsSync(`public${image[1]}`));
});
test('responsive and keyboard focus styles are present with reduced-motion support', () => {
  const css = readFileSync('app/globals.css', 'utf8');
  assert.match(css, /@media\(max-width:680px\)/);
  assert.match(css, /grid-template-columns:1fr/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
});
