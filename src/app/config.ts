
let serverUrlEnv = ""
let bucketName = "ctb.development"
if (window.location.hostname.indexOf("localhost") > -1) {
  serverUrlEnv = "http://localhost:3000"
} else if (window.location.hostname.indexOf("dev.checktheboard.com") > -1) {
  serverUrlEnv = 'http://dev.checktheboard.com'
} else if (window.location.hostname.indexOf("staging.checktheboard.com") > -1) {
  serverUrlEnv = 'http://staging.checktheboard.com'
} else {
  serverUrlEnv = 'http://dev.checktheboard.com'
}

export const s3Details = {
  url: "https://s3.us-east-2.amazonaws.com/" + bucketName,
  awsS3Url: "https://s3.amazonaws.com/" + bucketName + '/',
  awss3PublicUrl: "https://" + bucketName + ".s3.amazonaws.com",
  awsserverUrl: "https://" + bucketName + ".s3.us-east-2.amazonaws.com/",
  bucketName: bucketName,
  userProfileFolderPath: "profile-images/",
}
export const defaultProfileImagePath = "/assets/images/default.png"
export const serverUrl = serverUrlEnv
export const pageSize = 10
export const pageSizeOptions = [10, 25, 50, 100]
export const dateFormat = 'm/d/Y'
export const userStatus = [
  'Active',
  'Inactive'
]
