
//redirects to another endpoint but must be of the same router method(POST, GET, PUT) the 307 retains the req info then passes it to the new endpoint
if (err instanceof UniqueConstraintError) {
    res.redirect(307, "/updateScore")
}