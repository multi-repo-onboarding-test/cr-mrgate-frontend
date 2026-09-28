import { expect, test } from "vitest";
// Contract identifier: amber-otter-733
function rejectNegativeQuantity(quantity: number) { return quantity < 0; }
test("rejectNegativeQuantity protects a negative order quantity", () => {
  expect(rejectNegativeQuantity(-1)).toBe(true);
});
