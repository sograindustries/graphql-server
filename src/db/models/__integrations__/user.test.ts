import { db } from "../..";
import { setup, teardown } from "../../testing";
import { createUserModel } from "../user";
import { TABLE_NAME_USER } from "../../tables";

describe("user", () => {
  beforeEach(async () => {
    await setup(db);
  });

  afterEach(async () => {
    await teardown(db);
  });

  afterAll(() => {
    db.destroy();
  });

  it("should create a user", async () => {
    const expectedUser = {
      id: 1,
      username: "will@argosindustries.com",
      first_name: "first-name",
      last_name: "last-name",
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    };

    const model = createUserModel(db);
    const user = await model.create({
      username: expectedUser.username,
      first_name: expectedUser.first_name,
      last_name: expectedUser.last_name
    });
    expect(user).toEqual(expectedUser);
    expect(await model.getUserById(user!.id)).toEqual(expectedUser);
  });

  it("should get a user by id", async () => {
    const expectedUser = {
      id: 1,
      username: "will@argosindustries.com",
      first_name: "first-name",
      last_name: "last-name",
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    };

    await db(TABLE_NAME_USER).insert([
      {
        id: expectedUser.id,
        username: expectedUser.username,
        first_name: expectedUser.first_name,
        last_name: expectedUser.last_name
      }
    ]);

    const model = createUserModel(db);
    expect(await model.getUserById(expectedUser.id)).toEqual(expectedUser);
  });

  it("should get a user by username", async () => {
    const expectedUser = {
      id: 1,
      username: "will@argosindustries.com",
      first_name: "first-name",
      last_name: "last-name",
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    };

    await db(TABLE_NAME_USER).insert([
      {
        id: expectedUser.id,
        username: expectedUser.username,
        first_name: expectedUser.first_name,
        last_name: expectedUser.last_name
      }
    ]);

    const model = createUserModel(db);
    expect(await model.getUserByUsername(expectedUser.username)).toEqual(
      expectedUser
    );
  });

  it("should not return user for invalid id", async () => {
    const expectedUser = {
      id: 1,
      username: "will@argosindustries.com",
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    };

    await db(TABLE_NAME_USER).insert([
      { id: expectedUser.id, username: expectedUser.username }
    ]);

    const model = createUserModel(db);
    expect(await model.getUserById(23456)).toBeUndefined();
  });

  it("should not return user for invalid username", async () => {
    const expectedUser = {
      id: 1,
      username: "will@argosindustries.com",
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    };

    await db(TABLE_NAME_USER).insert([
      { id: expectedUser.id, username: expectedUser.username }
    ]);

    const model = createUserModel(db);
    expect(await model.getUserByUsername("invalid-username")).toBeUndefined();
  });

  it("should throw when creating user with existing username", async () => {
    const expectedUser = {
      id: 1,
      username: "will@argosindustries.com"
    };
    await db(TABLE_NAME_USER).insert([expectedUser]);

    const model = createUserModel(db);
    await expect(
      model.create({ username: expectedUser.username })
    ).rejects.toThrow();
  });
});
