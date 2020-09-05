const { UserModel } = require('../../models/user');
const { IdentityModel } = require('../../models/identity');
const { AppError } = require('../../common');
const { hashPassword } = require('lib/hash-utils');

exports.signupEmail = async (model) => {
  const identityExists = await IdentityModel.exists({
      providerName: 'email',
      providerKey: model.email
  });

  if (identityExists) throw new AppError(
      "The email provided is already registered!",
      409
  );

  const user = new UserModel({
      firstName: model.firstName,
      lastName: model.lastName
  });

  hashPassword_p = hashPassword(model.password);
  await user.save();

  const identity = new IdentityModel({
      userId: user._id,
      providerName: 'email',
      providerKey: model.email,
      password: await hashPassword_p
  });

  await identity.save();

  return [user._doc, identity._doc]
}
