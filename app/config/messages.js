const message = {
  serverError: "Server error.",
  userCreated: "User created successfully.",
  userDeleted: "User deleted successfully.",
  userUpdated: "User information updated successfully.",
  profilePictureChanged: "Profile picture changed successfully.",
  profilePictureDeleted: "Profile picture deleted successfully.",
  uploadingIssue: "Something went wrong, while uploading image.",
  statusUpdated: "User status updated successfully.",
  emailTemplate404: "Email template is not available.",
  quickNotifications: "Notifications has been sent successfully, Users will receive notifications shortly!",
  register: {
    success: "User registered successfully.",
    fail: ""
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
  forgot_password: {
    invalidEmail: "Email not found.",
    success: "An OTP sent to your registered email id. Please check your email. ",
  },
  otp: {
    required: "Please enter an OTP",
    success: "OTP verified successfully. ",
    invalid_otp: "Please enter a valid OTP.",
    invalid_email: "Please enter a valid email.",
    resend: "Resend OTP. Please check your email.",
    not_found: "Enter details are invalid",
  },
  reset_password: {
    not_found: "User not found",
    invalidToken: "Password Reset Unsuccessful. Please try again.",
    success: "You have successfully reset your password. "
  },
  change_password: {
    invalidEmail: "Email not found.",
    correctPassword:"Please enter the correct old password",
    invalidCurrentPassword: "Please enter current password.’ & if not, matched  - ‘Wrong Password. Please check the password again.’",
    success: "You have successfully changed your password. ",
    samePassword: "Please set a password that is different than your current one.",
    currentPassword: "please enter current password",
    newPassword: "please enter new password"
  },
  change_profile: {
    invalidEmail: "Email not found.",
    success: "You have successfully changed your profile. "
  },
  change_email: {
    logout_reason: "Your email has been been changed",
    success: "You have successfully changed your email. "
  },
  change_phone: {
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
    change_request: "A phone number change request sent successfully!",
    phone_otp: "Resend OTP. Please check your phone.",
    duplicate: "Phone number is already exist, please use different number"
  },
  profile_pic: {
    required: "Profile picture is Required."
  },
  inviteUser: {
    sent: "Invitation has been sent successfully!"
  },
  token: {
    required: "Token should not be empty",
    not_found: "Invalid token provided.",
    token_expire: "Invitation link is expired. Please contact Path2caregiving team to receive invitation link."
  },
  object_id: {
    not_found: "Invalid object id provided."
  },
  resend_invite: {
    success: "Notification sent successfully !.",
    faliure: "Oops ! Users not found to notify. ",
  },
  logout_reason:
  {
    suspend: "You are suspended by the admin"
  }, 
  myprofile: {
    first_name: "Please enter first name",
    last_name: "Please enter last name",
    email: "Please enter email",
    valid_email: "Please enter a valid email",
    phone: "Please enter phone",
  },
};

module.exports = message;
