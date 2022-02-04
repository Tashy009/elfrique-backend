const express = require("express");
const Auth = require("../middleware/UserAuth");

const AuthController = require("../controllers/Auth");

const ProfileController = require("../controllers/profile");

const VoteContestController = require("../controllers/VotingContest");

const AwardContestController = require("../controllers/AwardContest");

const upload = require("../helpers/upload");

const {
  registerValidation,
  validate,
  loginValidation,
  resetPasswordValidation,
  changePasswordValidation,
  createVoteValidation,
  createAwardValidation,
} = require("../helpers/validator");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome To elfrique API");
});

router.post(
  "/signup",
  registerValidation(),
  validate,
  AuthController.registerUser
);

router.post("/login", loginValidation(), validate, AuthController.login);

router.get("/verifyemail", AuthController.verifyEmail);

router.post(
  "/resetpassword",
  resetPasswordValidation(),
  validate,
  AuthController.resetpassword
);

router.post("/getpasswordlink", AuthController.postresetlink);

router.get("/getuserProfile", Auth, ProfileController.getUserProfile);

router.post("/edituserProfile", Auth, ProfileController.editUserProfile);

router.post(
  "/changepassword",
  Auth,
  changePasswordValidation(),
  validate,
  ProfileController.changePassWord
);

router.post(
  "/createVote",
  Auth,
  upload.single("image"),
  createVoteValidation(),
  validate,
  VoteContestController.createVoteContest
);

router.get("/getallVote", Auth, VoteContestController.getallVOteContest);

router.get("/getVote/:id", Auth, VoteContestController.getSingleVoteContest);

router.patch("/updateVote/:id", Auth, VoteContestController.updateVoteContest);

router.post(
  "/createAward",
  Auth,
  upload.single("image"),
  createAwardValidation(),
  validate,
  AwardContestController.createAwardContest
);

router.get("/getallAward", Auth, AwardContestController.getAllAwardsContest);

router.get("/getAward/:id", Auth, AwardContestController.getSingleAwardContest);

router.post(
  "/createContestant/:id",
  Auth,
  upload.single("image"),
  VoteContestController.createContestants
);

router.get(
  "/getallContestant/:id",
  Auth,
  VoteContestController.getAllContestants
);

router.get(
  "/getContestant/:title/:id",
  Auth,
  VoteContestController.getSingleContestant
);

router.post(
  "/addSponsor/:id",
  Auth,
  upload.single("image"),
  VoteContestController.addSponsor
);

router.post("/addInfo/:id", Auth, VoteContestController.addInfo);

router.post(
  "/createCategories/:id",
  Auth,
  AwardContestController.createAwardCategories
);

router.get(
  "/getallCategories/:id",
  Auth,
  AwardContestController.getAllAwardCategories
);

router.get(
  "/getSingleCategory/:title/:id",
  Auth,
  AwardContestController.getSingleCategory
);

router.post(
  "/createNominees/:title/:id",
  Auth,
  upload.single("image"),
  AwardContestController.createAwardNominees
);

module.exports = router;
