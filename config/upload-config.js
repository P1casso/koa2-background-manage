module.exports = {
    koaBody:{
        multipart: true,
        encoding: 'gzip',
        formidable: {
            uploadDir: (__dirname, 'public/upload'),
            keepExtensions: true,
            maxFieldsSize: 2 * 1024 * 1024,
        }
    },
}