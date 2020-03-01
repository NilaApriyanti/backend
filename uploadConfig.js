const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const MAX_SIZE = 20000000
const storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, './static');
		},
		filename: function(req, file, cb) {
			cb(null, crypto.randomBytes(20).toString('hex') + path.extname(file.originalname))
		}
	})


	const fileFilter = (req, file, cb) => {
		// reject a file
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
			cb(null, true)
		} else {
			cb(null, false)
		}
	}

	const upload = multer({
		storage: storage,
		limits: {
			fileSize: MAX_SIZE
		},
		fileFilter: fileFilter
	})

module.exports = { multer, upload }