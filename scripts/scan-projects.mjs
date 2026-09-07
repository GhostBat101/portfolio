/**
 * ScanProjects: Build-time Node.js script scanning /projects, optimizing video, and compiling projects.json.
 * Communicates with: /projects directory, FFmpeg, public/projects, and src/data/projects.json.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const TEMPLATES = [
  'media-left',
  'full-bleed',
  'text-first-parallax',
  'split-scroll',
  'editorial-stack',
];

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov']);

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

export function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
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
    const isVideo = VIDEO_EXTENSIONS.has(ext);
    const type = isVideo ? 'video' : 'image';
    const sanitizedBase = sanitizeFileName(path.basename(fileName, ext));

    let src = `projects/${slug}/media/${fileName}`;
    let poster;

    if (isVideo) {
      src = `projects/${slug}/media/${sanitizedBase}-web.mp4`;
      poster = `projects/${slug}/media/${sanitizedBase}-poster.jpg`;
    }

    const asset = {
      src,
      type,
      name: fileName,
      ...(poster ? { poster } : {}),
    };

    if (base === 'cover' || base === 'cover-web' || base === 'cover-poster') {
      cover = asset;
    } else {
      gallery.push(asset);
    }
  }

  if (!cover && gallery.length > 0) {
    cover = gallery.shift();
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

export function getFfmpegPath() {
  const candidatePaths = [
    'C:\\Users\\User\\AppData\\Local\\Microsoft\\WinGet\\Links\\ffmpeg.exe',
    'C:\\Users\\User\\AppData\\Local\\ms-playwright\\ffmpeg-1011\\ffmpeg-win64.exe',
    'ffmpeg',
  ];

  for (const candidate of candidatePaths) {
    try {
      execSync(`"${candidate}" -version`, { stdio: 'ignore' });
      return candidate;
    } catch {
    }
  }
  return null;
}

export function processVideo(ffmpegBin, sourceVideoPath, destWebVideoPath, destPosterPath) {
  if (!fs.existsSync(destWebVideoPath)) {
    try {
      execSync(
        `"${ffmpegBin}" -y -i "${sourceVideoPath}" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -an -movflags +faststart "${destWebVideoPath}"`,
        { stdio: 'ignore' }
      );
    } catch {
      fs.copyFileSync(sourceVideoPath, destWebVideoPath);
    }
  }

  if (!fs.existsSync(destPosterPath)) {
    try {
      execSync(
        `"${ffmpegBin}" -y -ss 00:00:01 -i "${sourceVideoPath}" -vframes 1 -q:v 2 -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "${destPosterPath}"`,
        { stdio: 'ignore' }
      );
    } catch {
    }
  }
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
  const ffmpegBin = getFfmpegPath();

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

    if (!fs.existsSync(sourceMedia)) continue;

    if (!fs.existsSync(destMedia)) {
      fs.mkdirSync(destMedia, { recursive: true });
    }

    const files = fs.readdirSync(sourceMedia);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const sourceFile = path.join(sourceMedia, file);
      const isVideo = VIDEO_EXTENSIONS.has(ext);

      if (isVideo && ffmpegBin) {
        const sanitizedBase = sanitizeFileName(path.basename(file, ext));
        const destWebVideo = path.join(destMedia, `${sanitizedBase}-web.mp4`);
        const destPoster = path.join(destMedia, `${sanitizedBase}-poster.jpg`);
        processVideo(ffmpegBin, sourceFile, destWebVideo, destPoster);
      } else {
        const destFile = path.join(destMedia, file);
        if (!fs.existsSync(destFile)) {
          fs.copyFileSync(sourceFile, destFile);
        }
      }
    }
  }
}

const currentFilePath = fileURLToPath(import.meta.url);
const invokedFilePath = process.argv[1] ? path.resolve(process.argv[1]) : '';

if (invokedFilePath === currentFilePath) {
  const rootDir = process.cwd();
  syncProjectMedia(rootDir);
  const projects = scanProjects(rootDir);

  const outputPath = path.resolve(rootDir, 'src', 'data', 'projects.json');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2), 'utf8');
  console.log(`[GhostBat101 Scanner] Scanned ${projects.length} projects -> ${outputPath}`);
}
