exports.logout = (req, res) =>{
    console.log("Tesign1234567890");
    res.cookie("token", "");
    res.redirect('/');
};