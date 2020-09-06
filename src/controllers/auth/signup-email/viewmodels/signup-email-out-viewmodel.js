exports.signupEmailOutViewmodel = {
  data: {
    type: 'custom',
    map: (sourceObject) => ({
      userId: sourceObject.userId,
      email: sourceObject.email,
      token: sourceObject.token
    })
  }
}