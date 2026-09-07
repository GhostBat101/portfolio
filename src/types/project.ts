/**
 * ProjectTypes: Core data contracts for projects, metadata, media assets, specifications, and layout templates.
 * Communicates with: scan-projects.mjs, ProjectSpecPlate.tsx, and template components.
 */
export type LayoutTemplateType =
  | 'media-left'
  | 'full-bleed'
  | 'text-first-parallax'
  | 'split-scroll'
  | 'editorial-stack';

export interface ProjectMeta {
  readonly title: string;
  readonly year?: string | number;
  readonly role?: string;
  readonly stack?: string;
  readonly live?: string;
  readonly repo?: string;
  readonly order?: number;
  readonly featured?: boolean;
}

export interface ProjectAsset {
  readonly src: string;
  readonly type: 'image' | 'video';
  readonly name: string;
  readonly poster?: string;
}

export interface ProjectSpec {
  readonly label: string;
  readonly value: string;
}

export interface Project {
  readonly slug: string;
  readonly meta: ProjectMeta;
  readonly overview: readonly string[];
  readonly details: readonly string[];
  readonly cover: ProjectAsset | null;
  readonly gallery: readonly ProjectAsset[];
  readonly template: LayoutTemplateType;
  readonly specs?: readonly ProjectSpec[];
}

