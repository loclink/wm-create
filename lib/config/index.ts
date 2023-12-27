import packageInfo from 'package.json';

const PACKAGE_VERSION = packageInfo.version;
const COMMAND_NAME = Object.keys(packageInfo.bin)[0];

export { COMMAND_NAME, PACKAGE_VERSION };
