import { test } from "node:test";
import assert from "node:assert/strict";
import { priceLine, effectivePrice, type PricedProduct } from "@/lib/pricing";

function p(overrides: Partial<PricedProduct>): PricedProduct {
  return {
    price: 20,
    salePrice: null,
    pricingType: "PER_LB",
    minimumQuantity: 1,
    quantityStep: 1,
    unit: "lb",
    isAvailable: true,
    trackInventory: false,
    stockQuantity: 0,
    ...overrides,
  };
}

test("prices per-pound lines correctly", () => {
  const r = priceLine(p({ price: 22 }), 2);
  assert.equal(r.ok, true);
  assert.equal(r.unitPrice, 22);
  assert.equal(r.subtotal, 44);
});

test("uses sale price when present", () => {
  assert.equal(effectivePrice(p({ price: 30, salePrice: 25 })), 25);
});

test("rejects below minimum quantity", () => {
  const r = priceLine(p({ minimumQuantity: 2 }), 1);
  assert.equal(r.ok, false);
  assert.match(r.reason ?? "", /Minimum quantity/);
});

test("rejects out-of-step quantity", () => {
  const r = priceLine(p({ quantityStep: 0.5 }), 1.25);
  assert.equal(r.ok, false);
  assert.match(r.reason ?? "", /increments/);
});

test("allows half-pound steps", () => {
  const r = priceLine(p({ quantityStep: 0.5, unit: "lb" }), 1.5);
  assert.equal(r.ok, true);
  assert.equal(r.subtotal, 30);
});

test("rejects contact-for-price products", () => {
  const r = priceLine(p({ pricingType: "CONTACT", price: 0 }), 1);
  assert.equal(r.ok, false);
  assert.match(r.reason ?? "", /contact/);
});

test("rejects unavailable products", () => {
  const r = priceLine(p({ isAvailable: false }), 1);
  assert.equal(r.ok, false);
});

test("rejects quantity above tracked stock", () => {
  const r = priceLine(p({ trackInventory: true, stockQuantity: 3 }), 4);
  assert.equal(r.ok, false);
  assert.match(r.reason ?? "", /in stock/);
});

test("rounds money to cents", () => {
  const r = priceLine(p({ price: 17.5, quantityStep: 0.5 }), 2.5);
  assert.equal(r.subtotal, 43.75);
});