const message = {
  serverError: "Something went wrong!",
  userCreated: "User created successfully.",
  userDeleted: "User deleted successfully.",
  userUpdated: "User information updated successfully.",
  userNotFound: "User not found",
  recordNotFound: "Record not found",
  profilePictureChanged: "Profile picture changed successfully.",
  profilePictureDeleted: "Profile picture deleted successfully.",
  uploadingIssue: "Something went wrong, while uploading image.",
  statusUpdated: "User status updated successfully.",
  emailTemplate404: "Email template is not available.",
  quickNotifications: "Notifications has been sent successfully, Users will receive notifications shortly!",
  register: {
    success: "User registered successfully.",
  },
  login: {
    invalidPassword: "Invalid Password.",
    invalidEmail: "Invalid Email ",
    invalidPhone: "Invalid Phone ",
    success: "Login Successful!",
    emailNotFound: "The email address entered is not registered with us.",
    phoneNotFound: "The phone number entered is not registered with us.",
    phoneNotVerified: "The phone number is not verified, please login with your email id.",
  },
  forgotPassword: {
    emailNotExist: "The email is not registered with Check the Board.",
    phoneNotExist: "The mobile number is not registered with Check the Board.",
    successEmail: "An OTP sent to your registered email id. Please check your email.",
    successPhone: "An OTP sent to your registered phone number. Please check your phone.",
  },
  otp: {
    required: "Please enter an OTP",
    success: "OTP verified successfully. ",
    invalidOtp: "The entered verification code is incorrect.",
    invalidEmail: "Please enter a valid email.",
    resend: "Resend OTP. Please check your email."
  },
  resetPassword: {
    invalidToken: "Password Reset Unsuccessful. Please try again.",
    success: "You have successfully reset your password."
  },
  changePassword: {
    invalidEmail: "Email not found.",
    correctPassword: "Please enter the correct old password",
    invalidCurrentPassword: "Please enter current password.’ & if not, matched  - ‘Wrong Password. Please check the password again.’",
    success: "You have successfully changed your password.",
    samePassword: "Please set a password that is different than your current one.",
    currentPassword: "please enter current password",
    newPassword: "please enter new password"
  },
  changeProfile: {
    invalidEmail: "Email not found.",
    success: "You have successfully changed your profile. "
  },
  changeEmail: {
    logoutReason: "Your email has been been changed",
    success: "You have successfully changed your email. "
  },
  changePhone: {
    success: "You have successfully changed your phone. "
  },
  name: {
    required: "Name is Required."
  },
  email: {
    required: "Email is required.",
    pattern: "Please enter a valid email.",
    duplicate: "Email is already exist, please use different email"
  },
  password: {
    required: "Password is required.",
    pattern: "Password must be 8 characters long , have 1 small letter, 1 capital letter and 1 special character.",
  },
  phoneNumber: {
    required: "Phone Number is Required.",
    pattern: "Alphabets are not allowed.",
    changeRequest: "A phone number change request sent successfully!",
    phoneOtp: "Resend OTP. Please check your phone.",
    duplicate: "Phone number is already exist, please use different number"
  },
  profileImage: {
    required: "Profile picture is Required."
  },
  inviteUser: {
    sent: "Invitation has been sent successfully!"
  },
  token: {
    required: "Token should not be empty",
    notFound: "Invalid token provided.",
    tokenExpire: "Invitation link is expired. Please contact Path2caregiving team to receive invitation link."
  },
  objectId: {
    notFound: "Invalid object id provided."
  }
};

module.exports = message;
