// import postcssLabFunction from 'postcss-lab-function'
import cssnano from 'cssnano'
import postcssPresetEnv from 'postcss-preset-env'

const mode = process.env.NODE_ENV
const dev = mode === 'development'

export default {
  map: false,
  plugins: [
    postcssPresetEnv({
      stage: 2,
      features: {
        'custom-properties': false,
        'nesting-rules': true,
      },
    }),
    !dev &&
      cssnano({
        preset: [
          'default',
          {
            discardComments: false,
          },
        ],
      }),
  ],
}
