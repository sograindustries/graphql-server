import { db } from "../..";
import { setup, teardown } from "../../testing";
import { createPatchModel } from "../patch";
import {
  TABLE_NAME_USER,
  TABLE_NAME_PATCH,
  TABLE_NAME_PATCH_BATTERY,
  TABLE_NAME_PATCH_READING
} from "../../tables";

describe("patch", () => {
  beforeEach(async () => {
    await setup(db);
  });

  afterEach(async () => {
    await teardown(db);
  });

  afterAll(async () => {
    await db.destroy();
  });

  it("should return array with patches", async () => {
    // setup users
    await db(TABLE_NAME_USER).insert([
      { id: 1, username: "will" },
      { id: 2, username: "andy" }
    ]);

    // setup patches
    await db(TABLE_NAME_PATCH).insert([
      { id: 1, user_id: 1, ble_id: "patch-1" },
      { id: 2, user_id: 1, ble_id: "patch-2" },
      { id: 3, user_id: 2, ble_id: "patch-3" }
    ]);

    const model = createPatchModel(db);

    const patches = await model.getPatchesByUserId(1);
    expect(patches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          user_id: 1,
          ble_id: "patch-1"
        }),
        expect.objectContaining({
          id: 2,
          user_id: 1,
          ble_id: "patch-2"
        })
      ])
    );
  });

  it("should return empty array", async () => {
    // setup
    await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);
    await db(TABLE_NAME_PATCH).insert([
      { id: 1, user_id: 1, ble_id: "patch-1" }
    ]);

    const model = createPatchModel(db);
    const patches = await model.getPatchesByUserId(777);
    expect(patches.length).toBe(0);
  });

  it("should create a patch", async () => {
    const ble_id = "f3ef4b00-9a29-47c9-b7fb-e1f91edf841b";
    const expectedPatch = {
      id: 1,
      user_id: 1,
      ble_id,
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    };

    // setup
    await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

    const model = createPatchModel(db);
    const patch = await model.create({ user_id: 1, ble_id });
    expect(patch).toEqual(expectedPatch);
    expect(await model.getById(patch!.id)).toEqual(expectedPatch);
  });

  it("should update a patch", async () => {
    const expectedPatch = {
      id: 1,
      user_id: 1,
      ble_id: "new-patch-ble_id",
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    };

    // setup
    await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);
    await db(TABLE_NAME_PATCH).insert([
      { id: 1, user_id: 1, ble_id: "patch-1" },
      { id: 2, user_id: 1, ble_id: "patch-2" }
    ]);

    const model = createPatchModel(db);
    const patch = await model.update(1, {
      user_id: 1,
      ble_id: expectedPatch.ble_id
    });
    expect(patch).toEqual(expectedPatch);
    expect(await model.getById(1)).toEqual(expectedPatch);
  });

  describe("battery", () => {
    it("should insert battery value", async () => {
      const patchId = 1;

      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      const model = createPatchModel(db);
      const battery = await model.insertBatteryValue(patchId, 0.5);

      expect(battery).toEqual(
        expect.objectContaining({ id: 1, patch_id: patchId, value: 0.5 })
      );

      expect(await model.getBatteryValue(patchId)).toEqual(
        expect.objectContaining({ patch_id: patchId, value: 0.5 })
      );
    });

    it("should list battery values", async () => {
      const patchId = 1;

      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      // setup patch battery values.
      await db(TABLE_NAME_PATCH_BATTERY).insert([
        { id: 1, patch_id: patchId, value: 1 },
        { id: 2, patch_id: patchId, value: 0.5 },
        { id: 3, patch_id: patchId, value: 0.2 }
      ]);

      const model = createPatchModel(db);
      expect(await model.listBatteryValue(patchId)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ patch_id: patchId, value: 1 }),
          expect.objectContaining({ patch_id: patchId, value: 0.5 }),
          expect.objectContaining({ patch_id: patchId, value: 0.2 })
        ])
      );
    });

    it("should get latest battery value", async () => {
      const patchId = 1;

      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      const model = createPatchModel(db);

      // setup patch battery values.
      await db(TABLE_NAME_PATCH_BATTERY).insert([
        {
          id: 1,
          patch_id: patchId,
          value: 1,
          created_at: new Date(new Date().setDate(new Date().getDate() - 1))
        },
        { id: 2, patch_id: patchId, value: 0.5, created_at: new Date() }
      ]);

      expect(await model.getBatteryValue(patchId)).toEqual(
        expect.objectContaining({ patch_id: patchId, value: 0.5 })
      );
    });
  });

  describe("ecg data", () => {
    it("should insert battery value", async () => {
      const patchId = 1;

      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      const model = createPatchModel(db);
      const battery = await model.insertEcgPayload(patchId, "some-s3-uri");

      expect(battery).toEqual(
        expect.objectContaining({
          id: 1,
          patch_id: patchId,
          s3_uri: "some-s3-uri"
        })
      );
    });
  });

  describe("readings", () => {
    it("should insert reading", async () => {
      const patchId = 1;

      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      const model = createPatchModel(db);
      const reading = await model.insertReading(patchId, "some-uri");

      expect(reading).toEqual(
        expect.objectContaining({ id: 1, patch_id: patchId, uri: "some-uri" })
      );
    });

    it("should list readings", async () => {
      const patchId = 1;

      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      await db(TABLE_NAME_PATCH_READING).insert([
        { id: 1, patch_id: patchId, uri: "uri-1" },
        { id: 2, patch_id: patchId, uri: "uri-2" }
      ]);

      const model = createPatchModel(db);
      const listings = await model.listReadings(patchId);

      expect(listings).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            patch_id: patchId,
            uri: "uri-1"
          }),
          expect.objectContaining({
            id: 2,
            patch_id: patchId,
            uri: "uri-2"
          })
        ])
      );
    });
  });
});
