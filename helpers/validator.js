const { check, body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ message: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

const okvalidate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
};

const registerValidation = () => {
  return [
    check("email", "Your email is not valid")
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),
    check("password", "Enter Password with length of 5 or more characters")
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    check("confirmpassword", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    ),
    check("firstname", "Enter First Name").not().isEmpty(),
    check("lastname", "Enter Last Name").not().isEmpty(),
    check("phonenumber", "Enter Phone Number").not().isEmpty().isInt(),
    check("referral_email", "Enter Referral Email").optional(),
  ];
};

const loginValidation = () => {
  return [
    body("email", "email is required").isEmail(),
    body("password", "Password is required").isLength({ min: 5 }),
  ];
};

const resetPasswordValidation = () => {
  return [
    body("email", "email is required").isEmail(),
    body("password", "Password is required").isLength({ min: 5 }),
    body("confirmpassword", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    ),
  ];
};

const changePasswordValidation = () => {
  return [
    body("oldPassword", "Enter Old Password")
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    body("newPassword", "Enter New Password")
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    body("confirmpassword", "Passwords do not match").custom(
      (value, { req }) => value === req.body.newPassword
    ),
  ];
};

const createVoteValidation = () => {
  return [
    body("title", "Enter Title").not().isEmpty(),
    body("votelimit", "Enter votelimit").not().isEmpty(),
    body("startdate", "Enter Start Date").not().isEmpty(),
    body("closedate", "Enter End Date").not().isEmpty(),
    body("fee", "Enter fee").not().isEmpty(),
    body("type", "Enter Type").not().isEmpty(),
    body("packagestatus", "Enter packagestatus").not().isEmpty(),
    body("timezone", "Enter timezone").not().isEmpty(),
    body("paymentgateway", "Enter description").not().isEmpty(),

    //body("image", "Enter Image").not().isEmpty(),
  ];
};

module.exports = {
  validate,
  okvalidate,
  registerValidation,
  loginValidation,
  resetPasswordValidation,
  changePasswordValidation,
  createVoteValidation,
};
