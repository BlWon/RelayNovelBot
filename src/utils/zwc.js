const Buffer = require('buffer').Buffer;

module.exports = {
    zwcToBytes(zwc) {
        const bitArr = zwc.split('').map((c) => {
            if (c == '\u200b') return 0;
            if (c == '\u200c') return 1;
        });
        const byteArr = [];
        let byte = 0;
        let bit = 0;
        for (let i = 0; i < bitArr.length; i++) {
            if (bit == 0) {
                byte = 0;
            }
            byte = byte | (bitArr[i] << bit);
            bit++;
            if (bit == 8) {
                byteArr.push(byte);
                bit = 0;
            }
        }
        if (bit != 0) {
            byteArr.push(byte);
        }
        return byteArr;
    },

    bytesToZwc(bytes) {
        const bitArr = [];
        for (let i = 0; i < bytes.length; i++) {
            const byte = bytes[i];
            for (let j = 0; j < 8; j++) {
                const bit = (byte >> j) & 1;
                bitArr.push(bit);
            }
        }
        const zwcArr = bytes.map((c) => {
            if (c == 0) return '\u200b';
            if (c == 1) return '\u200c';
        });
        return zwcArr;
    },

    zwcToNumber(zwc) {
        return this.bytesToNumber(this.zwcToBytes(zwc));
    },

    numberToZwc(num) {
        const bitArr = this.numberToBytes(num);
        const zwcArr = bitArr.map((c) => {
            if (c == 0) return '\u200b';
            if (c == 1) return '\u200c';
        });
        return zwcArr.join('');
    },

    bytesToNumber(bytes) {
        let num = 0;
        for (let i = 0; i < bytes.length; i++) {
            num = num * 256 + bytes[i];
        }
        return num;
    },

    numberToBytes(num) {
        const bytes = [];
        for (let i = 0; i < 4; i++) {
            bytes.push((num >> (i * 8)) & 0xff);
        }
        return bytes;
    },

    zwcToString(zwc) {
        const bytes = this.zwcToBytes(zwc);
        const str = this.bytesToString(bytes);
        return str;
    },

    bytesToString(bytes) {
        const str = new Buffer.from(bytes).toString();
        return str;
    }
}