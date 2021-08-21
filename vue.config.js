module.exports = {
    publicPath: process.env.production ? '/pf2e' : '',
    outputDir: 'dist/pf2e',
    transpileDependencies: [
        'vuetify'
    ]
}
