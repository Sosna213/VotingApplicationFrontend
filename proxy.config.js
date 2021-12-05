
module.exports = [
  {
    context:["/register", "/login", "/users", "/token-refresh", "/voting/forUser", "/voting/add", "/voting", "/userId", "/voting/delete","/shareToUser", "/vote", "/votingSharedToUser", "/voting-edit"],
    target: "http://localhost:8080",
    secure: false,
    logLevel: "debug"
  }
]
