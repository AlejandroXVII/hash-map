import { hastMap } from "./index";

test("check that hash not be too big", () => {
  expect(hastMap.hash("juan")).toBeLessThanOrEqual(hastMap.storageLimit);
  expect(hastMap.hash("maneul")).toBeLessThanOrEqual(hastMap.storageLimit);
  expect(hastMap.hash("francisquito metronilo martin")).toBeLessThanOrEqual(
    hastMap.storageLimit,
  );
});

test("check set method", () => {
  hastMap.set("juan", "martin");
  expect(hastMap.storage[hastMap.hash("juan")][0]).toStrictEqual({
    key: "juan",
    value: "martin",
  });
});

test("check colition when set with the same key", () => {
  hastMap.set("juan", "martin");
  hastMap.set("juan", "pedro");
  expect(hastMap.storage[hastMap.hash("juan")][0]).toStrictEqual({
    key: "juan",
    value: "pedro",
  });
});
test("test get method", () => {
  expect(hastMap.get("juan")).toBe("pedro");
  expect(hastMap.get("alejandro")).toBe(null);
});
test("test has method", () => {
  expect(hastMap.has("juan")).toBe(true);
  expect(hastMap.has("alejandro")).toBe(false);
});
test.skip("test remove method", () => {
  hastMap.remove("juan");
  expect(hastMap.has("juan")).toBe(false);
});
