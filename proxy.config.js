
module.exports = [
  {
    context:["/register", "/login", "/users", "/token-refresh", "/voting/forUser", "/voting/add",
      "/voting", "/usernames", "/userId", "/deactivate-voting", "/voting/delete", "/shareToUsers",
      "/vote", "/votingSharedToUser", "/voting-edit","/users-group/add", "/user-group", "/voting-result"],
    target: "http://localhost:8080",
    secure: false,
    logLevel: "debug"
  }
]
