'use strict';

const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const { CONSTANTS } = require("../constants");

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {

        const { sub_groups_image } = req.query;

        if (sub_groups_image) {
            return cb(null, "./public/images/subGroups");
        }

        let requestSegments = req.path.split('/');
        let path = CONSTANTS.DEFAULT_IMAGE_PATH + requestSegments[1];
        if (req.query.attribute_image_len) {
            const dir = `./public/images/products/${req.query.folder_name}`;
            await fs.promises.mkdir(dir, { recursive: true });
            return cb(null, dir);
        }
        if (!fs.existsSync(path)) {
            path = fs.mkdirSync(path);
            fs.chmod(path, '777');
            if (req.params.paramsId) {
                path = path + `/${req.params.paramsId}`;
                fs.mkdirSync(path);
                fs.chmod(path, '777');
                if (req.params.variantId) {
                    path = path + `/${req.params.paramsId}` + `/${req.params.variantId}`;
                    fs.mkdirSync(path);
                    fs.chmod(path, '777');
                }
            }
        } else {
            if (req.params.paramsId) {
                path = path + `/${req.params.paramsId}`;
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                    fs.chmod(path, '777');
                    if (req.params.variantId) {
                        path = path + `/${req.params.paramsId}` + `/${req.params.variantId}`;
                        fs.mkdirSync(path);
                        fs.chmod(path, '777');
                    }
                } else {
                    fs.chmod(path, '777');
                }
            }
            fs.chmod(path, '777')
        }
        return cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/, '-').replace(/T/, '-').replace(/\..+/, '').slice(0, -3) +
            Math.floor(1000 + Math.random() * 9000) + path.extname(file.originalname)
        );
    }
});

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const mimetyp = file.mimetype
    if (extension === '.webp' || extension === '.jpg' || extension === '.jpeg' || extension === '.png' || extension === '.pdf' || mimetyp === 'image/png' || mimetyp === 'image/jpg' || mimetyp === 'image/jpeg' || mimetyp === 'application/pdf' || mimetyp === 'image/webp') {
        cb(null, true)
    } else {
        cb({ error: 'Only Jpg,png and pdf format is supported' }, false)
    }
};

exports.upload = multer({
    storage,
    limit: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});