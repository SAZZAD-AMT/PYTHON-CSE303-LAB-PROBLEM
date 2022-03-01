'use strict';

var path = require('path');
var fs = require('fs');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);
var fs__namespace = /*#__PURE__*/_interopNamespace(fs);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function getStat(filename) {
    return new Promise((resolve, reject) => {
        fs__namespace.stat(filename, (err, stats) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(stats);
            }
        });
    });
}
function resolveRoot(pathname = '') {
    return path__namespace.resolve(__dirname, '..', pathname);
}
function readTextFile(filename) {
    return fs__namespace.readFileSync(filename).toString();
}
function parseJSONFile(filename) {
    let data = null;
    try {
        data = JSON.parse(readTextFile(filename));
    }
    catch (e) {
        console.error(e);
    }
    return data;
}
function getIndexFilename(dirname, index = 'index') {
    return new Promise((resolve, reject) => {
        const indexFiles = [
            `${index}.html`,
            `${index}.htm`
        ];
        fs__namespace.readdir(dirname, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                const indexFile = files.find((file) => {
                    file = file.toLowerCase();
                    return indexFiles.some((item) => item === file);
                });
                if (indexFile) {
                    resolve(path__namespace.resolve(dirname, indexFile));
                }
                else {
                    reject(new Error(`file not found: ${dirname}`));
                }
            }
        });
    });
}
function getPort(start) {
    return new Promise((resolve, reject) => {
        require('getport')(start, (err, port) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(port);
            }
        });
    });
}
function openBrowser(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const open = require('open');
        yield open(url);
    });
}
function getRelativePath(rootPath, filename) {
    const relativePath = path__namespace.relative(rootPath, filename);
    if (/^\.\./.test(relativePath)) {
        return null;
    }
    return relativePath;
}

exports.__awaiter = __awaiter;
exports.getIndexFilename = getIndexFilename;
exports.getPort = getPort;
exports.getRelativePath = getRelativePath;
exports.getStat = getStat;
exports.openBrowser = openBrowser;
exports.parseJSONFile = parseJSONFile;
exports.resolveRoot = resolveRoot;
//# sourceMappingURL=utils.js.map
