exports.logout = (req, res) => {
  console.log("Logout called !!");
  res.status(202).clearCookie("token");

  res.status(202).clearCookie("Expires").send("Logout Successfully");
};
