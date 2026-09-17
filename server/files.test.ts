import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createUnauthenticatedContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("files router", () => {
  it("rejects file listing without an authenticated user", async () => {
    const caller = appRouter.createCaller(createUnauthenticatedContext());
    await expect(caller.files.list()).rejects.toMatchObject<TRPCError>({ code: "UNAUTHORIZED" });
  });
});
