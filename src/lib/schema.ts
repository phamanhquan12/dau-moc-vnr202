/** NMMS v1.0 content contracts. Install `zod` in actual Next.js project. */
import { z } from 'zod';

export const ScriptSceneSchema = z.object({
  id: z.string().regex(/^(C\d{2}_S\d{2}|PRO_S0[12]|EPI_S0[12])$/),
  script_ref: z.string().min(3),
  title: z.string().min(1),
  act: z.string().nullable().optional(),
  chapter_id: z.string().nullable(),
  chapter_title: z.string().nullable(),
  period_label: z.string(),
  narration: z.string().min(5),
  dialogue_fiction: z.string(),
  visual_direction: z.string(),
  audio_direction: z.string(),
  motion_direction: z.string(),
  historical_notes: z.string(),
  historical_claim_ids: z.array(z.string()),
  assets: z.array(z.string()),
  reading_fallback_required: z.boolean(),
  status: z.enum(['draft','editor_approved','historian_approved','published']),
  source_doc: z.string(),
});

export const ScriptManifestSchema = z.object({
  version: z.string(),
  content_status: z.string(),
  locale: z.literal('vi-VN'),
  project_title: z.string(),
  source_script: z.string(),
  scenes: z.array(ScriptSceneSchema).min(1),
}).superRefine((data, ctx) => {
  const ids = data.scenes.map((s) => s.id);
  if (new Set(ids).size !== ids.length) {
    ctx.addIssue({code: z.ZodIssueCode.custom, message: 'Duplicate scene ID'});
  }
});
export type ScriptScene = z.infer<typeof ScriptSceneSchema>;
export type ScriptManifest = z.infer<typeof ScriptManifestSchema>;

export const DialogueLineSchema = z.object({
  speaker: z.string().min(1),
  text: z.string().min(1),
  isFiction: z.boolean().default(true),
});
export const SceneSchema = z.object({
  id: ScriptSceneSchema.shape.id,
  chapterId: z.string().nullable(),
  title: z.string().min(1),
  periodLabel: z.string(),
  narrative: z.object({
    narrator: z.string().min(1),
    dialogue: z.array(DialogueLineSchema),
  }),
  presentation: z.object({
    template: z.enum(['cinematic','split','timeline','document','plain']),
    mediaIds: z.array(z.string()),
    motionPreset: z.enum(['fade-in','chapter-cut','split-sync','timeline-reveal','map-step','convergence','none']),
  }),
  history: z.object({
    claimIds: z.array(z.string()),
    fictionDisclosure: z.boolean(),
    historicalNotes: z.string().optional(),
  }),
  status: z.enum(['draft','editor_approved','historian_approved','published']),
});
export type Scene = z.infer<typeof SceneSchema>;

export const SourceSchema = z.object({
  id: z.string(), title: z.string(), publisher: z.string(),
  url: z.string().url().optional(), file: z.string().optional(),
  pages: z.string().optional(), accessedAt: z.string().optional(),
  license: z.string().optional(),
});
export const ClaimSchema = z.object({
  id: z.string(), statement: z.string().min(5), sourceIds: z.array(z.string()).min(1),
  verificationStatus: z.enum(['pending','verified','disputed']),
  verifiedBy: z.string().optional(), verifiedAt: z.string().optional(),
});
export const MediaSchema = z.object({
  id: z.string(), path: z.string(), kind: z.enum(['photo','illustration','audio','video']),
  credit: z.string(), altVi: z.string(), captionVi: z.string(),
  rightsStatus: z.enum(['pending','approved','rejected']),
  isReconstruction: z.boolean(), sourceId: z.string().optional(),
});

/** Release-only gate. Draft manifest is intentionally NOT ready for this. */
export function assertPublishable(args: {
  scenes: Scene[];
  claims: z.infer<typeof ClaimSchema>[];
  sources: z.infer<typeof SourceSchema>[];
  media: z.infer<typeof MediaSchema>[];
}) {
  const claims = new Map(args.claims.map((x) => [x.id, x]));
  const sources = new Set(args.sources.map((x) => x.id));
  const media = new Map(args.media.map((x) => [x.id, x]));
  for (const scene of args.scenes) {
    if (scene.status !== 'published') throw new Error(`${scene.id}: not published`);
    if (!scene.history.claimIds.length) throw new Error(`${scene.id}: missing history claim mapping`);
    for (const id of scene.history.claimIds) {
      const c = claims.get(id);
      if (!c || c.verificationStatus !== 'verified') throw new Error(`${scene.id}: unverified claim ${id}`);
      if (c.sourceIds.some((sourceId) => !sources.has(sourceId))) throw new Error(`${scene.id}: missing source for ${id}`);
    }
    for (const id of scene.presentation.mediaIds) {
      const m = media.get(id);
      if (!m || m.rightsStatus !== 'approved') throw new Error(`${scene.id}: media not licensed ${id}`);
      if (m.isReconstruction && !m.captionVi.includes('Tái dựng')) {
        throw new Error(`${scene.id}: reconstruction missing visible disclosure`);
      }
    }
  }
}
