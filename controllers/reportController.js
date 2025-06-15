const ApiError = require("../utils/ApiError");
const Report = require("../models/Report");

exports.getHairTestReport = async (req, res, next) => {
  try {
    const report = await Report.findOne({ publicId: req.params.publicId })
      .populate("hairTest")
      .populate({
        path: "user",
        select: "name gender",
      })
      .populate({
        path: "recommendedProducts",
        select: "name category tags benefits price",
      });
    if (!report) throw new ApiError(404, "Hair test Report not found");

    res.status(200).json({
      message: "Hair test report fetched successfully",
      report,
    });
  } catch (e) {
    next(e);
  }
};
