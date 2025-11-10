// Fix: Resolves "Cannot find type definition file for 'astro/client'" by pointing to the generated types file with a relative path.
// This is more robust for some TypeScript project setups where module resolution fails.
/// <reference path="../.astro/types.d.ts" />
