import { hastMap } from "./index";

test("check that hash not be too big", () => {
  expect(hastMap.hash("juan")).toBeLessThanOrEqual(hastMap.storageLimit);
  expect(hastMap.hash("maneul")).toBeLessThanOrEqual(hastMap.storageLimit);
  expect(hastMap.hash("francisquito metronilo martin")).toBeLessThanOrEqual(
    hastMap.storageLimit,
  );
});

test("check set method", () => {
  let numElements = hastMap.numElements;
  let numBuckets = hastMap.numBuckets;
  hastMap.set("juan", "martin");
  expect(hastMap.has("juan")).toBe(true);
  expect(hastMap.numElements).toBe(numElements + 1);
  expect(hastMap.numBuckets).toBe(numBuckets + 1);
});

test("check colition when set with the same key", () => {
  let numElements = hastMap.numElements;
  let numBuckets = hastMap.numBuckets;
  hastMap.set("juan", "pedro");
  expect(hastMap.get("juan")).toBe("pedro");
  expect(hastMap.numElements).toBe(numElements);
  expect(hastMap.numBuckets).toBe(numBuckets);
});
test("test get method", () => {
  expect(hastMap.get("juan")).toBe("pedro");
  expect(hastMap.get("alejandro")).toBe(null);
});
test("test has method", () => {
  expect(hastMap.has("juan")).toBe(true);
  expect(hastMap.has("alejandro")).toBe(false);
});
test("test remove method", () => {
  let numElements = hastMap.numElements;
  let numBuckets = hastMap.numBuckets;
  hastMap.remove("juan");
  expect(hastMap.has("juan")).toBe(false);
  expect(hastMap.numElements).toBe(numElements - 1);
  expect(hastMap.numBuckets).toBe(numBuckets - 1);
});
test("test clear method", () => {
  hastMap.set("juan", "martin");
  hastMap.set("pedro", "martin");
  hastMap.set("alejandro", "martin");
  expect(hastMap.has("juan")).toBe(true);
  expect(hastMap.has("pedro")).toBe(true);
  expect(hastMap.has("alejandro")).toBe(true);
  hastMap.clear();
  console.table(hastMap.storage);
  expect(hastMap.has("juan")).toBe(false);
  expect(hastMap.has("pedro")).toBe(false);
  expect(hastMap.has("alejandro")).toBe(false);
});
test("test keys method", () => {
  hastMap.set("juan", "martin");
  hastMap.set("pedro", "martin");
  hastMap.set("alejandro", "martin");
  expect(hastMap.entries()).toBe("['juan','pedro','alejandro']");
});
