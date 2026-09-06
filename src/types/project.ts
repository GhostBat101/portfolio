/**
 * ProjectTypes: Core data contracts for projects, metadata, media assets, and layout templates.
 * Communicates with: scan-projects.mjs, ProjectIndexSection.tsx, and template components.
 */
export type LayoutTemplateType =
  | 'media-left'
  | 'full-bleed'
  | 'text-first-parallax'
  | 'split-scroll'
  | 'editorial-stack';

export interface ProjectMeta {
  title: string;
  year?: string | number;
  role?: string;
  stack?: string;
  live?: string;
  repo?: string;
  order?: number;
  featured?: boolean;
}

export interface ProjectAsset {
  src: string;
  type: 'image' | 'video';
  name: string;
  poster?: string;
}

export interface Project {
  slug: string;
  meta: ProjectMeta;
  overview: string[];
  details: string[];
  cover: ProjectAsset | null;
  gallery: ProjectAsset[];
  template: LayoutTemplateType;
}
