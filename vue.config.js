/* eslint-disable @typescript-eslint/no-var-requires */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const marked = require('marked')
const renderer = new marked.Renderer()

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: 'neuron-UI-1.2',
  publicPath: '/neuron/v1.2',
  pages: {
    index: {
      entry: 'src/main.js',
    },
  },
  devServer: {
    port: 8060,
    proxy: {
      '/device-manager-services': {
        target: process.env.HOST_URL,
        changeOrigin: true,
        pathRewrite: {
          '/device-manager-services/v0/neuron': '/edge',
          '/device-manager-services/v0/kuiper': '/edge',
        },
      },
      '/device-thing-service': {
        target: process.env.HOST_URL,
        changeOrigin: true,
      },
      '/emqx': {
        target: process.env.HOST_URL,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader',
            },
            {
              loader: 'markdown-loader',
              options: {
                renderer,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MonacoWebpackPlugin({
        output: 'static/',
        languages: ['json', 'sql'],
        features: [
          '!accessibilityHelp',
          '!bracketMatching',
          'caretOperations',
          'clipboard',
          'codeAction',
          'codelens',
          'colorDetector',
          '!comment',
          '!contextmenu',
          'coreCommands',
          'cursorUndo',
          '!dnd',
          '!find',
          '!folding',
          '!fontZoom',
          '!format',
          '!gotoError',
          '!gotoLine',
          '!gotoSymbol',
          '!hover',
          '!iPadShowKeyboard',
          '!inPlaceReplace',
          'inspectTokens',
          'linesOperations',
          '!links',
          '!multicursor',
          '!parameterHints',
          'quickCommand',
          'quickOutline',
          '!referenceSearch',
          '!rename',
          'smartSelect',
          'snippets',
          '!suggest',
          '!toggleHighContrast',
          'toggleTabFocusMode',
          'transpose',
          'wordHighlighter',
          'wordOperations',
          'wordPartOperations',
        ],
      }),
    ],
  },
}
