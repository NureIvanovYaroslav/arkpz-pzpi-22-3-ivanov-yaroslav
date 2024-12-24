class AdminController {
  async backupDatabase(req, res, next) {
    res.status(200).json({ message: "Backup endpoint is not yet implemented" });
  }

  async restoreDatabase(req, res, next) {
    res
      .status(200)
      .json({ message: "Restore endpoint is not yet implemented" });
  }
}

module.exports = new AdminController();
