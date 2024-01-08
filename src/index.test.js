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
  expect(hastMap.has("juan")).toBe(false);
  expect(hastMap.has("pedro")).toBe(false);
  expect(hastMap.has("alejandro")).toBe(false);
});
test.skip("test keys method", () => {
  hastMap.set("pedro", "martin");
  hastMap.set("alejandro", "martin");
  expect(hastMap.entries()).toBe("['juan','pedro','alejandro']");
});

test("test what happen when entry enough elements to trigger updateHashMapSize method", () => {
  hastMap.set("juan", "martin el original");
  hastMap.set("juanchis", "martin");
  hastMap.set("pedro jose", "martin");
  hastMap.set("alejandrito", "martin");
  hastMap.set("patricia", "maria");
  hastMap.set("ramona", "maria");
  hastMap.set("julia", "maria");
  hastMap.set("jess", "maria");
  hastMap.set("sofia", "maria");
  hastMap.set("manuel", "maria");
  hastMap.set("ramona sofia", "maria");
  hastMap.set("julia clara", "maria");
  hastMap.set("nathalia", "maria");
  hastMap.set("hernandito", "maria");
  hastMap.set("enmanuel", "maria");
  hastMap.set("rocio", "maria");
  hastMap.set("altagracia", "maria");
  hastMap.set("mariela", "maria");
  hastMap.set("chacon", "maria");
  hastMap.set("emiliano", "maria");
  hastMap.set("maximo", "maria");
  console.table(hastMap.storage);
  expect(hastMap.get("juan")).toBe("martin el original");
  expect(hastMap.storageLimit).toBe(32);
});
