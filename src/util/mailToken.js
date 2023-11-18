module.exports.generateVerifyEmailToken = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
};
