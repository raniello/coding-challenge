/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Permette di usare describe, it, expect senza importarli ogni volta
    environment: 'node', // Fondamentale per logica pura/algoritmi
  },
});