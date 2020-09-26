const { UserModel } = require('../../models/user');
const { IdentityModel } = require('../../models/identity');
const { AppError } = require('../../common');
const { hashPassword } = require('../../../lib/hash-utils');

const PROVIDER_NAME = 'email';

exports.signupEmail = async (model) => {
  const identityExists = await IdentityModel.exists({
      providerName: PROVIDER_NAME,
      providerKey: model.email
  });

  if (identityExists) throw new AppError(
      "The email provided is already registered for email sign in!",
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
      providerName: PROVIDER_NAME,
      providerKey: model.email,
      password: await hashPassword_p
  });

  await identity.save();

  return {
    userId: user._id.toString(), 
    firstName: user.firstName,
    lastName: user.lastName,
    identityId: identity._id,
    email: identity.providerKey,
    providerName: identity.providerName
  }
}
