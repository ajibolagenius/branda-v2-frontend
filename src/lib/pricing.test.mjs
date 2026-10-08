// Run with `pnpm test` (Node 22.18+ strips TypeScript types natively).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { orderSummary } from './markets.ts';
import { getService, queryCatalog, unitPrice, PAGE_SIZE } from './services-data.ts';

test('unit price applies discount and option multipliers', () => {
  const logo = getService('logo-design'); // ng 350000, 10% off
  assert.equal(unitPrice(logo, 'ng'), 315000);
  assert.equal(unitPrice(logo, 'ng', { Package: 'Plus social kit', Speed: 'Rush, 48 hours' }), Math.round(350000 * 0.9 * 1.4 * 1.35));
});

test('order summary: per-market items, tax, free-shipping threshold', () => {
  const item = (market, unitPrice, quantity) => ({ id: market + unitPrice, slug: 'x', name: 'x', image: '', market, options: {}, unitPrice, quantity });
  const small = orderSummary([item('ng', 10000, 2), item('us', 999, 1)], 'ng');
  assert.equal(small.count, 2);
  assert.equal(small.subtotal, 20000);
  assert.equal(small.tax, 1500);
  assert.equal(small.shipping, 5000);
  assert.equal(small.total, 26500);

  const big = orderSummary([item('ng', 150000, 1)], 'ng');
  assert.equal(big.shipping, 0);
  assert.equal(orderSummary([], 'ng').total, 0);
});

test('catalog: filters, smart search and pagination', () => {
  assert.ok(queryCatalog('ng', { category: 'gifts' }).results.every((s) => s.category === 'gifts'));
  assert.equal(queryCatalog('ng', { search: 'mug' }).results[0].slug, 'branded-mugs');
  assert.equal(queryCatalog('ng', { search: 't-shirt' }).results[0].slug, 'custom-apparel');
  assert.equal(queryCatalog('ng', { search: 'zzz' }).total, 0);

  const sorted = queryCatalog('us', { sort: 'price-asc', page: '1' }).results.map((s) => unitPrice(s, 'us'));
  assert.deepEqual(sorted, [...sorted].sort((a, b) => a - b));
  assert.equal(queryCatalog('ng', {}).results.length, PAGE_SIZE);
  assert.equal(queryCatalog('ng', { page: '999' }).page, queryCatalog('ng', {}).pages);
});
