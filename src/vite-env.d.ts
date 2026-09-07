/**
 * ViteEnv: Global TypeScript declarations for Vite client environment and CSS modules.
 * Communicates with: Vite compiler, TypeScript language server, and asset loaders.
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY: string;
  readonly VITE_HCAPTCHA_SITEKEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
