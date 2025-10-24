import type { Plugin, PluginBuild } from 'esbuild';

const defineTextPlugin: Plugin = {
  name: 'define-text',
  setup(build: PluginBuild) {
    const options = build.initialOptions;
    options.keepNames = true;
  },
};

export default defineTextPlugin;