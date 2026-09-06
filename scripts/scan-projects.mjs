/**
 * ScanProjects: Build-time Node.js script scanning /projects and compiling projects.json.
 * Communicates with: /projects directory, public/projects, and src/data/projects.json.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const TEMPLATES = [
  'media-left',
  'full-bleed',
  'text-first-parallax',
  'split-scroll',
  'editorial-stack',
];

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm']);

export function slugToTitle(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function parseMetaFile(rawContent, slug) {
  if (!rawContent || !rawContent.trim()) {
    return {
      title: slugToTitle(slug),
      order: Infinity,
    };
  }

  const meta = {
    title: slugToTitle(slug),
    order: Infinity,
  };

  const lines = rawContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.includes(':')) continue;

    const separatorIndex = trimmed.indexOf(':');
    const key = trimmed.slice(0, separatorIndex).trim().toLowerCase();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (key === 'order') {
      const parsedOrder = parseInt(value, 10);
      meta.order = Number.isNaN(parsedOrder) ? Infinity : parsedOrder;
    } else if (key === 'featured') {
      meta.featured = value.toLowerCase() === 'true';
    } else if (key === 'year') {
      meta.year = value;
    } else {
      meta[key] = value;
    }
  }

  return meta;
}

export function parseStatementFile(rawContent) {
  if (!rawContent || !rawContent.trim()) {
    return [];
  }

  return rawContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('---'));
}

export function sortMediaFiles(fileNames, slug) {
  let cover = null;
  const gallery = [];

  const validFiles = fileNames.filter((fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    return IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext);
  });

  for (const fileName of validFiles) {
    const ext = path.extname(fileName).toLowerCase();
    const base = path.basename(fileName, ext).toLowerCase();
    const type = VIDEO_EXTENSIONS.has(ext) ? 'video' : 'image';
    const asset = {
      src: `projects/${slug}/media/${fileName}`,
      type,
      name: fileName,
    };

    if (base === 'cover') {
      cover = asset;
    } else {
      gallery.push(asset);
    }
  }

  gallery.sort((a, b) => {
    const baseA = path.basename(a.name, path.extname(a.name));
    const baseB = path.basename(b.name, path.extname(b.name));
    const numA = parseInt(baseA.replace(/\D/g, ''), 10);
    const numB = parseInt(baseB.replace(/\D/g, ''), 10);

    if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
      return numA - numB;
    }
    return baseA.localeCompare(baseB, undefined, { numeric: true });
  });

  return { cover, gallery };
}

export function assignTemplate(slug, index) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const deterministicIndex = Math.abs(hash + index) % TEMPLATES.length;
  return TEMPLATES[deterministicIndex];
}

export function scanProjects(rootDir) {
  const projectsDir = path.resolve(rootDir, 'projects');
  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true });
  const projectFolders = entries.filter((entry) => entry.isDirectory());
  const projects = [];

  let index = 0;
  for (const folder of projectFolders) {
    const slug = folder.name;
    const folderPath = path.join(projectsDir, slug);

    const metaPath = path.join(folderPath, 'meta.txt');
    const rawMeta = fs.existsSync(metaPath) ? fs.readFileSync(metaPath, 'utf8') : '';
    const meta = parseMetaFile(rawMeta, slug);

    const overviewPath = path.join(folderPath, 'overview.txt');
    const rawOverview = fs.existsSync(overviewPath) ? fs.readFileSync(overviewPath, 'utf8') : '';
    const overview = parseStatementFile(rawOverview);

    const detailsPath = path.join(folderPath, 'details.txt');
    const rawDetails = fs.existsSync(detailsPath) ? fs.readFileSync(detailsPath, 'utf8') : '';
    const details = parseStatementFile(rawDetails);

    const mediaPath = path.join(folderPath, 'media');
    const mediaFiles = fs.existsSync(mediaPath) ? fs.readdirSync(mediaPath) : [];
    const { cover, gallery } = sortMediaFiles(mediaFiles, slug);

    const template = assignTemplate(slug, index);

    projects.push({
      slug,
      meta,
      overview,
      details,
      cover,
      gallery,
      template,
    });

    index += 1;
  }

  projects.sort((a, b) => {
    const orderA = a.meta.order ?? Infinity;
    const orderB = b.meta.order ?? Infinity;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.slug.localeCompare(b.slug);
  });

  return projects;
}

export function syncProjectMedia(rootDir) {
  const projectsDir = path.resolve(rootDir, 'projects');
  const targetDir = path.resolve(rootDir, 'public', 'projects');

  if (!fs.existsSync(projectsDir)) return;

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const sourceMedia = path.join(projectsDir, slug, 'media');
    const destMedia = path.join(targetDir, slug, 'media');

    if (fs.existsSync(sourceMedia)) {
      if (!fs.existsSync(destMedia)) {
        fs.mkdirSync(destMedia, { recursive: true });
      }
      const files = fs.readdirSync(sourceMedia);
      for (const file of files) {
        fs.copyFileSync(path.join(sourceMedia, file), path.join(destMedia, file));
      }
    }
  }
}

const currentFilePath = fileURLToPath(import.meta.url);
const invokedFilePath = process.argv[1] ? path.resolve(process.argv[1]) : '';

if (invokedFilePath === currentFilePath) {
  const rootDir = process.cwd();
  const projects = scanProjects(rootDir);
  syncProjectMedia(rootDir);

  const outputPath = path.resolve(rootDir, 'src', 'data', 'projects.json');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2), 'utf8');
  console.log(`[GhostBat101 Scanner] Scanned ${projects.length} projects -> ${outputPath}`);
}
