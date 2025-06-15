const mongoose = require("mongoose");
const { uploader } = require("../config/cloudinary");
const ApiError = require("../utils/ApiError");

const User = require("../models/User");
const HairTest = require("../models/HairTest");
const Report = require("../models/Report");

const {
  determineCauses,
  calculateRecoveryTime,
  getRecommendedProducts,
} = require("../services/recommendationService");

exports.submitHairTest = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // 1. Upload scalp image to Cloudinary
    const scalpImage = req.file;
    let imageUrl = null;
    if (scalpImage) {
      try {
        imageUrl = await new Promise((resolve, reject) => {
          const uploadStream = uploader.upload_stream(
            { folder: "traya/scalp_images" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          uploadStream.end(scalpImage.buffer);
        });
      } catch (error) {
        throw new ApiError(500, "Image upload failed");
      }
    }
    
    // 2. Create/Update User
    const userData = req.body.user;
    let user = await User.findOneAndUpdate(
      { phoneNumber: userData.phoneNumber },
      { $set: userData },
      { upsert: true, new: true, session },
    );

    // 3. Create HairTest doc
    const {
      hairLossStage,
      familyHistory,
      dandruff,
      sleep,
      stress,
      acidityOrGas,
      energyLevels,
      takingSupplements,
    } = req.body.hairData;
    const hairTest = new HairTest({
      user: user._id,
      hairLossStage,
      familyHistory,
      dandruff,
      sleep,
      stress,
      acidityOrGas,
      energyLevels,
      takingSupplements,
      scalpImageUrl: imageUrl,
    });
    await hairTest.save({ session });

    // 4. Generate Report
    const report = new Report({
      hairTest: hairTest._id,
      user: user._id,
      causes: determineCauses(hairTest),
      recoveryTime: calculateRecoveryTime(hairTest),
      recommendedProducts: (await getRecommendedProducts(hairTest)) ?? [],
    });
    await report.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Hair test submitted successfully",
      publicReportId: report.publicId,
    });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    next(e);
  }
};
