function getIPAddress() {
  const interfaces = require('os')
    .networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

/**
 * @returns 获取ip的字符串
 * @ignore
 * x_x_x_x
 */
function getIPAddressStr() {
  let ip = getIPAddress();
  ip = ip.replace(/\./g, '_');
  return ip;
}


module.exports = {
  getIPAddress,
  getIPAddressStr,
};
