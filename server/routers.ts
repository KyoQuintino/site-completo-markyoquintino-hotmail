import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { createStoredFile, deleteStoredFile, listFilesByOwner } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const allowedMimeTypes = new Set([
  "application/pdf",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
]);

function sanitizeFileName(fileName: string) {
  const cleaned = fileName.trim().replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
  return cleaned.slice(0, 180) || "arquivo";
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  files: router({
    list: protectedProcedure.query(({ ctx }) => listFilesByOwner(ctx.user.id)),
    upload: protectedProcedure
      .input(z.object({
        fileName: z.string().min(1).max(255),
        mimeType: z.string().min(1).max(128),
        dataBase64: z.string().min(1).max(12_000_000),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!allowedMimeTypes.has(input.mimeType)) {
          throw new Error("Tipo de arquivo não permitido. Use PDF, JPG, PNG, SVG, WEBP ou GIF.");
        }
        const data = Buffer.from(input.dataBase64, "base64");
        if (data.length === 0 || data.length > MAX_FILE_BYTES) {
          throw new Error("O arquivo precisa ter entre 1 byte e 8 MB.");
        }
        const safeName = sanitizeFileName(input.fileName);
        const stored = await storagePut(`users/${ctx.user.id}/files/${safeName}`, data, input.mimeType);
        return createStoredFile({
          ownerId: ctx.user.id,
          fileName: input.fileName,
          fileKey: stored.key,
          fileUrl: stored.url,
          mimeType: input.mimeType,
          sizeBytes: data.length,
        });
      }),
    remove: protectedProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(({ ctx, input }) => deleteStoredFile(ctx.user.id, input.id)),
  }),
});

export type AppRouter = typeof appRouter;
