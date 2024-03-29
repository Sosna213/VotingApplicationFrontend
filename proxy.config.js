
module.exports = [
  {
    context:["/register", "/login", "/users", "/token-refresh", "/voting/forUser", "/voting/add",
      "/voting", "/usernames", "/userId", "/deactivate-voting", "/voting/delete", "/shareToUsers",
      "/vote", "/votingSharedToUser", "/voting-edit","/users-group/add", "/user-group", "/voting-result",
      "/user-group/delete", "/users-group/edit", "/voting/get-token"],
    target: "http://localhost:8180",
    secure: false,
    logLevel: "debug"
  }
]
