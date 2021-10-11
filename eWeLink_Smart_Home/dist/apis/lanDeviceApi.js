"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFanAPI = exports.toggleLanLightAPI = exports.transmitRfChlAPI = exports.updateLanLight = exports.getLanDeviceParams = exports.setSwitches = exports.setSwitch = void 0;
var axios_1 = __importDefault(require("axios"));
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var lanControlAuthenticationUtils_1 = __importDefault(require("../utils/lanControlAuthenticationUtils"));
var setSwitch = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var ip, port, deviceid, devicekey, data, selfApikey, iv, reqData, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ip = params.ip, port = params.port, deviceid = params.deviceid, devicekey = params.devicekey, data = params.data, selfApikey = params.selfApikey;
                iv = ("abcdef" + Date.now() + "abcdef").slice(0, 16);
                reqData = {
                    iv: lanControlAuthenticationUtils_1.default.encryptionBase64(iv),
                    deviceid: deviceid,
                    selfApikey: selfApikey,
                    encrypt: true,
                    sequence: "" + Date.now(),
                    data: lanControlAuthenticationUtils_1.default.encryptionData({
                        iv: iv,
                        data: data,
                        key: devicekey,
                    }),
                };
                res = axios_1.default.post("http://" + ip + ":" + port + "/zeroconf/switch", reqData);
                res.catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // console.log('控制局域网单通道设备出错', reqData);
                                console.log('update LAN single switch devices error', reqData);
                                return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                                        deviceid: deviceid,
                                        ownerApikey: selfApikey,
                                        params: JSON.parse(data),
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [4 /*yield*/, res];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.setSwitch = setSwitch;
var setSwitches = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var ip, port, deviceid, devicekey, data, selfApikey, iv, reqData, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ip = params.ip, port = params.port, deviceid = params.deviceid, devicekey = params.devicekey, data = params.data, selfApikey = params.selfApikey;
                iv = ("abcdef" + Date.now() + "abcdef").slice(0, 16);
                reqData = {
                    iv: lanControlAuthenticationUtils_1.default.encryptionBase64(iv),
                    deviceid: deviceid,
                    selfApikey: selfApikey,
                    encrypt: true,
                    sequence: "" + Date.now(),
                    data: lanControlAuthenticationUtils_1.default.encryptionData({
                        iv: iv,
                        data: data,
                        key: devicekey,
                    }),
                };
                res = axios_1.default.post("http://" + ip + ":" + port + "/zeroconf/switches", reqData);
                res.catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // console.log('控制局域网多通道设备出错', reqData);
                                console.log('update LAN multi-switch devices error', reqData);
                                return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                                        deviceid: deviceid,
                                        ownerApikey: selfApikey,
                                        params: JSON.parse(data),
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [4 /*yield*/, res];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.setSwitches = setSwitches;
/**
 *
 * @description RF-Bridge 发送通道值
 */
var transmitRfChlAPI = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var ip, port, deviceid, devicekey, data, selfApikey, iv, reqData, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ip = params.ip, port = params.port, deviceid = params.deviceid, devicekey = params.devicekey, data = params.data, selfApikey = params.selfApikey;
                iv = ("abcdef" + Date.now() + "abcdef").slice(0, 16);
                reqData = {
                    iv: lanControlAuthenticationUtils_1.default.encryptionBase64(iv),
                    deviceid: deviceid,
                    selfApikey: selfApikey,
                    encrypt: true,
                    sequence: "" + Date.now(),
                    data: lanControlAuthenticationUtils_1.default.encryptionData({
                        iv: iv,
                        data: data,
                        key: devicekey,
                    }),
                };
                res = axios_1.default.post("http://" + ip + ":" + port + "/zeroconf/transmit", reqData);
                res.catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // console.log('控制局域网RF-Bridge出错', reqData);
                                console.log('update LAN RF-Bridge error', reqData);
                                return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                                        deviceid: deviceid,
                                        ownerApikey: selfApikey,
                                        params: JSON.parse(data),
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [4 /*yield*/, res];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.transmitRfChlAPI = transmitRfChlAPI;
/**
 *
 * @deprecated 局域网设备好像不支持该接口
 */
var getLanDeviceParams = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var ip, port, deviceid, devicekey, selfApikey, iv, reqData, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ip = params.ip, port = params.port, deviceid = params.deviceid, devicekey = params.devicekey, selfApikey = params.selfApikey;
                iv = ("abcdef" + Date.now() + "abcdef").slice(0, 16);
                reqData = {
                    iv: lanControlAuthenticationUtils_1.default.encryptionBase64(iv),
                    deviceid: deviceid,
                    selfApikey: selfApikey,
                    encrypt: true,
                    sequence: "" + Date.now(),
                    data: lanControlAuthenticationUtils_1.default.encryptionData({
                        iv: iv,
                        data: JSON.stringify({}),
                        key: devicekey,
                    }),
                };
                res = axios_1.default.post("http://" + ip + ":" + port + "/zeroconf/info", reqData);
                res.catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log('get lan device params failed:', deviceid);
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, res];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getLanDeviceParams = getLanDeviceParams;
/**
 * @description 调整灯的模式及亮度、色温
 * @description 目前仅针对UIID 103
 */
var updateLanLight = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var ip, port, deviceid, devicekey, data, selfApikey, iv, reqData, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ip = params.ip, port = params.port, deviceid = params.deviceid, devicekey = params.devicekey, data = params.data, selfApikey = params.selfApikey;
                iv = ("abcdef" + Date.now() + "abcdef").slice(0, 16);
                reqData = {
                    iv: lanControlAuthenticationUtils_1.default.encryptionBase64(iv),
                    deviceid: deviceid,
                    selfApikey: selfApikey,
                    encrypt: true,
                    sequence: "" + Date.now(),
                    data: lanControlAuthenticationUtils_1.default.encryptionData({
                        iv: iv,
                        data: data,
                        key: devicekey,
                    }),
                };
                res = axios_1.default.post("http://" + ip + ":" + port + "/zeroconf/dimmable", reqData);
                res.catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // console.log('控制局域网灯设备出错', reqData);
                                console.log('update LAN lamp device error', reqData);
                                return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                                        deviceid: deviceid,
                                        ownerApikey: selfApikey,
                                        params: JSON.parse(data),
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [4 /*yield*/, res];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.updateLanLight = updateLanLight;
/**
 * @description 开灯
 * @description 目前仅针对UIID 34 风扇灯
 */
var toggleLanLightAPI = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var ip, port, deviceid, devicekey, data, selfApikey, iv, reqData, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ip = params.ip, port = params.port, deviceid = params.deviceid, devicekey = params.devicekey, data = params.data, selfApikey = params.selfApikey;
                iv = ("abcdef" + Date.now() + "abcdef").slice(0, 16);
                reqData = {
                    iv: lanControlAuthenticationUtils_1.default.encryptionBase64(iv),
                    deviceid: deviceid,
                    selfApikey: selfApikey,
                    encrypt: true,
                    sequence: "" + Date.now(),
                    data: lanControlAuthenticationUtils_1.default.encryptionData({
                        iv: iv,
                        data: data,
                        key: devicekey,
                    }),
                };
                res = axios_1.default.post("http://" + ip + ":" + port + "/zeroconf/light", reqData);
                res.catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // console.log('控制局域网灯设备出错', reqData);
                                console.log('update LAN lamp device error', reqData);
                                return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                                        deviceid: deviceid,
                                        ownerApikey: selfApikey,
                                        params: JSON.parse(data),
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [4 /*yield*/, res];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.toggleLanLightAPI = toggleLanLightAPI;
/**
 * @description 调节风扇档位
 * @description 目前仅针对UIID 34 风扇灯
 */
var setFanAPI = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var ip, port, deviceid, devicekey, data, selfApikey, iv, reqData, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ip = params.ip, port = params.port, deviceid = params.deviceid, devicekey = params.devicekey, data = params.data, selfApikey = params.selfApikey;
                iv = ("abcdef" + Date.now() + "abcdef").slice(0, 16);
                reqData = {
                    iv: lanControlAuthenticationUtils_1.default.encryptionBase64(iv),
                    deviceid: deviceid,
                    selfApikey: selfApikey,
                    encrypt: true,
                    sequence: "" + Date.now(),
                    data: lanControlAuthenticationUtils_1.default.encryptionData({
                        iv: iv,
                        data: data,
                        key: devicekey,
                    }),
                };
                res = axios_1.default.post("http://" + ip + ":" + port + "/zeroconf/fan", reqData);
                res.catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // console.log('控制局域网灯设备出错', reqData);
                                console.log('update LAN lamp device error', reqData);
                                return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                                        deviceid: deviceid,
                                        ownerApikey: selfApikey,
                                        params: JSON.parse(data),
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [4 /*yield*/, res];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.setFanAPI = setFanAPI;
