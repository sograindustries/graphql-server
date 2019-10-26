import { db } from "../..";
import { setup, teardown } from "../../testing";
import { createPatchModel } from "../patch";
import { TABLE_NAME_USER, TABLE_NAME_PATCH } from "../../tables";

describe("patch", () => {
  beforeEach(async () => {
    await setup(db);
  });

  afterEach(async () => {
    await teardown(db);
  });

  afterAll(() => {
    db.destroy();
  });

  it("should return array with patches", async () => {
    const model = createPatchModel(db);

    await db(TABLE_NAME_USER).insert([
      { id: 1, username: "will" },
      { id: 2, username: "andy" }
    ]);

    await db(TABLE_NAME_PATCH).insert([
      { id: 1, user_id: 1, uuid: "patch-1" },
      { id: 2, user_id: 1, uuid: "patch-2" },
      { id: 3, user_id: 2, uuid: "patch-3" }
    ]);

    const patches = await model.getPatchesByUserId(1);
    expect(patches).toEqual([{ uuid: "patch-1" }, { uuid: "patch-2" }]);
  });

  it("should return empty array", async () => {
    const model = createPatchModel(db);

    await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);
    await db(TABLE_NAME_PATCH).insert([{ id: 1, user_id: 1, uuid: "patch-1" }]);

    const patches = await model.getPatchesByUserId(777);
    expect(patches.length).toBe(0);
  });

  it("should create a patch", async () => {
    const model = createPatchModel(db);

    await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

    const uuid = "f3ef4b00-9a29-47c9-b7fb-e1f91edf841b";
    const patch = await model.create({ user_id: 1, uuid });
    expect(patch).toEqual({
      id: 1,
      user_id: 1,
      uuid,
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    });
  });
});
