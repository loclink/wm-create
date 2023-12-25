import packageInfo from 'package.json';

const PACKAGE_VERSION = packageInfo.version;
const COMMAND_NAME = Object.keys(packageInfo.bin)[0];

export { PACKAGE_VERSION, COMMAND_NAME };
