import { db } from "../..";
import { setup, teardown } from "../../testing";
import { createPatchModel } from "../patch";
import {
  TABLE_NAME_USER,
  TABLE_NAME_PATCH,
  TABLE_NAME_PATCH_BATTERY,
  TABLE_NAME_PATCH_READING,
  TABLE_NAME_PATCH_READING_TAG
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
    const MOCK_PATCH_READING = {
      patchId: 1,
      uri: "some-uri",
      firmwareVersion: "some-fw",
      sequence: 7,
      uptimeMs: 10
    };

    it("should insert reading", async () => {
      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: MOCK_PATCH_READING.patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      const model = createPatchModel(db);
      const reading = await model.insertReading(MOCK_PATCH_READING);

      expect(reading).toEqual(
        expect.objectContaining({
          id: 1,
          patch_id: 1,
          uri: "some-uri",
          firmware_version: "some-fw",
          sequence: 7,
          uptime_ms: 10,
          created_at: expect.any(Date),
          updated_at: expect.any(Date)
        })
      );
    });

    it("should list readings", async () => {
      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: MOCK_PATCH_READING.patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      await db(TABLE_NAME_PATCH_READING).insert([
        {
          id: 1,
          patch_id: MOCK_PATCH_READING.patchId,
          uri: "uri-1",
          sequence: 0,
          uptime_ms: 10,
          firmware_version: "fw-v1"
        },
        {
          id: 2,
          patch_id: MOCK_PATCH_READING.patchId,
          uri: "uri-2",
          sequence: 1,
          uptime_ms: 11,
          firmware_version: "fw-v1"
        }
      ]);

      const model = createPatchModel(db);
      const listings = await model.listReadings(MOCK_PATCH_READING.patchId);

      expect(listings).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            uri: "uri-1",
            sequence: 0,
            uptime_ms: 10,
            firmware_version: "fw-v1"
          }),
          expect.objectContaining({
            id: 2,
            uri: "uri-2",
            sequence: 1,
            uptime_ms: 11,
            firmware_version: "fw-v1"
          })
        ])
      );
    });

    it("should list readings for start date", async () => {
      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: MOCK_PATCH_READING.patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      await db(TABLE_NAME_PATCH_READING).insert([
        {
          id: 1,
          patch_id: MOCK_PATCH_READING.patchId,
          uri: "uri-1",
          sequence: 0,
          uptime_ms: 10,
          firmware_version: "fw-v1",
          created_at: new Date("2019-11-09 00:00:00")
        },
        {
          id: 2,
          patch_id: MOCK_PATCH_READING.patchId,
          uri: "uri-2",
          sequence: 1,
          uptime_ms: 11,
          firmware_version: "fw-v1",
          created_at: new Date("2019-11-09 00:00:10")
        },
        {
          id: 3,
          patch_id: MOCK_PATCH_READING.patchId,
          uri: "uri-2",
          sequence: 1,
          uptime_ms: 11,
          firmware_version: "fw-v1",
          created_at: new Date("2019-11-09 00:00:20")
        }
      ]);

      const model = createPatchModel(db);

      const listingsAll = await model.listReadingsByTimeRange(
        MOCK_PATCH_READING.patchId,
        new Date("2019-11-09 00:00:00")
      );
      expect(listingsAll.length).toBe(3);

      const listingsLatest = await model.listReadingsByTimeRange(
        MOCK_PATCH_READING.patchId,
        new Date("2019-11-09 00:01:00")
      );
      expect(listingsLatest.length).toBe(1);

      const listingsLastTwo = await model.listReadingsByTimeRange(
        MOCK_PATCH_READING.patchId,
        new Date("2019-11-09 00:00:11")
      );
      expect(listingsLastTwo.length).toBe(2);
    });

    it("should create reading tags", async () => {
      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: MOCK_PATCH_READING.patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      const readingId = 1;
      await db(TABLE_NAME_PATCH_READING).insert([
        {
          id: readingId,
          patch_id: MOCK_PATCH_READING.patchId,
          uri: "uri-1",
          sequence: 0,
          uptime_ms: 10,
          firmware_version: "fw-v1"
        }
      ]);

      const model = createPatchModel(db);
      const tags = await model.createReadingTags(readingId, ["tag-1", "tag-2"]);

      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            reading_id: readingId,
            value: "tag-1"
          }),
          expect.objectContaining({
            id: 2,
            reading_id: readingId,
            value: "tag-2"
          })
        ])
      );
    });

    it("should get reading tags", async () => {
      // setup users.
      await db(TABLE_NAME_USER).insert([{ id: 1, username: "will" }]);

      // setup patches.
      await db(TABLE_NAME_PATCH).insert([
        { id: MOCK_PATCH_READING.patchId, user_id: 1, ble_id: "patch-1" }
      ]);

      const readingId = 1;
      await db(TABLE_NAME_PATCH_READING).insert([
        {
          id: readingId,
          patch_id: MOCK_PATCH_READING.patchId,
          uri: "uri-1",
          sequence: 0,
          uptime_ms: 10,
          firmware_version: "fw-v1"
        }
      ]);

      await db(TABLE_NAME_PATCH_READING_TAG).insert([
        {
          id: 1,
          reading_id: readingId,
          value: "tag-1"
        },
        {
          id: 2,
          reading_id: readingId,
          value: "tag-2"
        }
      ]);

      const model = createPatchModel(db);
      const tags = await model.getReadingTags(readingId);

      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 2,
            reading_id: readingId,
            value: "tag-2"
          }),
          expect.objectContaining({
            id: 1,
            reading_id: readingId,
            value: "tag-1"
          })
        ])
      );
    });
  });

  describe.skip("patch_mode", () => {
    it("should set patch mode", () => {});
    it("should return patch mode", () => {});
    it("should return null if patch mode is not set", () => {});
  });
});
