function dashboardHome(req, res, next) {
    res.render('admin/dashboard');
};

module.exports = {
    dashboardHome,
}