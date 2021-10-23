'use strict';

const db = require("../../config/db");
const { upload } = require("../../utils/fileUpload/multer");
const { CONSTANTS } = require("../../utils/constants");
const imageUpload = upload.array(
    "bannerImage",
    CONSTANTS.MAXIMUM_BANNER_IMAGES
  );
const { delFile } = require("../../utils/fileSystem");
const { createPromotionItems, createPromotionCronJob, cancelCronJob } = require("./promotions.utils");

exports.list = async (req, res, next) => {
    try {
        const { attributes, sort = "id", order = "asc" } = req.query;
        let promotions = {}, args = { order: [[sort, order]] };

        if (attributes) args.attributes = attributes;

        const data = await db.promotions.findAll(args);
        promotions.data = data;
        res.status(200).json(promotions);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    imageUpload(req, res, async (err) => {
        if (err) {
            res.status(400).json({
                error: CONSTANTS.MAXIMUM_BANNER_IMAGES_ERROR_MESSAGE,
              });
        } else {
            try {
                const promotion = req.body;
                const { promotionItems } = promotion;
                const newPromotion = await db.promotions.create({
                    ...promotion,
                    image: req.file ? req.file.path : null
                });
                if (promotionItems) {
                    const { id, startDate, endDate } = newPromotion;
                    await createPromotionItems(promotionItems, id);
                    await createPromotionCronJob(`promotion-start-${id}`, startDate);
                    if (!promotion.neverExpire) {
                        await createPromotionCronJob(`promotion-end-${id}`, endDate);
                    }
                }
                res.status(201).json(newPromotion);
            } catch (err) {
                if (req && req.file && req.file.path) delFile(req.file.path);
                next(err);
            }
        }
    })
};

exports.promotionById = async (req, res, next) => {
    try {
        const promotion = await db.promotions.findByPk(req.params.id);
        res.status(200).json(promotion);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    imageUpload(req, res, async (err) => {
        if (err) {
            res.status(400).json({
                error: CONSTANTS.SINGLE_IMAGE_ERROR_MESSAGE("Banner")
            });
        } else {
            try {
                const { id } = req.params;
                const promotion = req.body;
                const { promotionItems, startDate, endDate } = promotion;
                let data;

                if (req.file) {
                    delFile(promotion.currentImageUrl);
                    data = { ...promotion, image: req.file.path };
                } else {
                    data = { ...promotion };
                }
                const updatePromotion = await db.promotions.update(data, { where: { id } });
                if (promotionItems) {
                    await cancelCronJob(`promotion-start-${id}`);
                    await cancelCronJob(`promotion-end-${id}`);
                    await destroyPromotionItems(id);
                    await createPromotionItems(promotionItems, id);
                    await createPromotionCronJob(`promotion-start-${id}`, startDate);
                    await createPromotionCronJob(`promotion-end-${id}`, endDate);
                }
                res.status(200).json(updatePromotion);
            } catch (err) {
                next(err);
            }
        }
    })
};

exports.remove = async (req, res, next) => {
    try {
        await db.promotions.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};