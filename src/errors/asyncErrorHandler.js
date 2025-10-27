/**
 * Membungkus async function (biasanya controller method)
 * agar error yang terjadi di dalamnya ditangkap dan diteruskan ke next()
 */
function asyncErrorHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncErrorHandler;
