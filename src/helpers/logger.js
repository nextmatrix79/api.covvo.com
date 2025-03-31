/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
const fs = require('fs');
module.exports = {
    _log: function (text, type) {
        text = new Date() +': '+ text;
        const color = type === 'error' ? '\x1b[41m' : '\x1b[42m';
        console.log(color, '\x1b[40m', text);
        const logDir = 'log';
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        fs.appendFile('log/' + type + '.log', text + '\n', (err) => {
            if (err) console.error('Logging error:', err);
        });
    },
    info: function (text) {
        if( typeof  text === 'object'){
            text = JSON.stringify( text );
        }
        this._log(text, 'info');
    },
    error: function (text) {
        this._log(text, 'error');
    }
};
