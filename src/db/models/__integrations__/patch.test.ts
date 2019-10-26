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
    // setup users
    await db(TABLE_NAME_USER).insert([
      { id: 1, username: "will" },
      { id: 2, username: "andy" }
    ]);

    // setup patches
    await db(TABLE_NAME_PATCH).insert([
      { id: 1, user_id: 1, uuid: "patch-1" },
      { id: 2, user_id: 1, uuid: "patch-2" },
      { id: 3, user_id: 2, uuid: "patch-3" }
    ]);

    const model = createPatchModel(db);

    const patches = await model.getPatchesByUserId(1);
    expect(patches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          user_id: 1,
          uuid: "patch-1"
        }),
        expect.objectContaining({
          id: 2,
          user_id: 1,
          uuid: "patch-2"
        })
      ])
    );
  });

  it("should return empty array", async () => {
    // setup
    await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);
    await db(TABLE_NAME_PATCH).insert([{ id: 1, user_id: 1, uuid: "patch-1" }]);

    const model = createPatchModel(db);
    const patches = await model.getPatchesByUserId(777);
    expect(patches.length).toBe(0);
  });

  it("should create a patch", async () => {
    const uuid = "f3ef4b00-9a29-47c9-b7fb-e1f91edf841b";
    const expectedPatch = {
      id: 1,
      user_id: 1,
      uuid,
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    };

    // setup
    await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

    const model = createPatchModel(db);
    const patch = await model.create({ user_id: 1, uuid });
    expect(patch).toEqual(expectedPatch);
    expect(await model.getById(patch!.id)).toEqual(expectedPatch);
  });

  it("should update a patch", async () => {
    const expectedPatch = {
      id: 1,
      user_id: 1,
      uuid: "new-patch-uuid",
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    };

    // setup
    await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);
    await db(TABLE_NAME_PATCH).insert([
      { id: 1, user_id: 1, uuid: "patch-1" },
      { id: 2, user_id: 1, uuid: "patch-2" }
    ]);

    const model = createPatchModel(db);
    const patch = await model.update(1, {
      user_id: 1,
      uuid: expectedPatch.uuid
    });
    expect(patch).toEqual(expectedPatch);
    expect(await model.getById(1)).toEqual(expectedPatch);
  });
});
