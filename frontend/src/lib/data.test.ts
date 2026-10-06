import { test } from "node:test";
import assert from "node:assert/strict";
import { LOCATIONS } from "./data";

test("excludes the closed Ariapita Avenue location", () => {
  assert.equal(
    LOCATIONS.some((location) => location.name === "Ariapita Avenue"),
    false,
  );
  assert.equal(LOCATIONS.length, 7);
});

test("assigns an image to every open location", () => {
  const images = LOCATIONS.map((location) => location.image);

  assert.equal(images.filter(Boolean).length, LOCATIONS.length);
  assert.ok(
    images.every((image) => image?.startsWith("/images/locations/")),
  );
});
