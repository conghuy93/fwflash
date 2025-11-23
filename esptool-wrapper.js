/**
 * ESPTool-JS Wrapper
 * Wrapper để tích hợp esptool-js với giao diện web
 * Dựa trên logic từ esptool chính thức: https://github.com/espressif/esptool
 */

class ESPToolWrapper {
    constructor(port, baudRate) {
        this.port = port;
        this.baudRate = baudRate;
        this.esploader = null;
        this.reader = null;
        this.writer = null;
    }

    async connect(onLog) {
        // Open port
        await this.port.open({ baudRate: this.baudRate });
        this.reader = this.port.readable.getReader();
        this.writer = this.port.writable.getWriter();

        // Initialize esptool-js if available
        if (typeof ESPLoader !== 'undefined') {
            try {
                this.esploader = new ESPLoader({
                    port: this.port,
                    baudRate: this.baudRate,
                    logFunction: onLog || console.log
                });
                await this.esploader.connect();
                return true;
            } catch (e) {
                if (onLog) onLog('Warning: esptool-js init failed, using direct serial');
                return false;
            }
        }
        return false;
    }

    async disconnect() {
        if (this.esploader) {
            try {
                await this.esploader.disconnect();
            } catch (e) {
                // Ignore
            }
        }
        if (this.reader) {
            await this.reader.cancel();
            await this.reader.releaseLock();
        }
        if (this.writer) {
            await this.writer.releaseLock();
        }
        if (this.port) {
            await this.port.close();
        }
    }

    async flashFirmware(address, data, options, onProgress) {
        if (this.esploader) {
            // Use esptool-js official method
            return await this.esploader.writeFlash(address, data, {
                flashMode: options.flashMode || 2,
                flashSize: options.flashSize || 0x16,
                flashFreq: options.flashFreq || 0xc,
                compress: options.compress !== false,
                onProgress: onProgress
            });
        } else {
            // Fallback: implement basic protocol
            throw new Error('esptool-js không khả dụng. Vui lòng tải lại trang.');
        }
    }

    async eraseFlash() {
        if (this.esploader) {
            return await this.esploader.eraseFlash();
        } else {
            throw new Error('esptool-js không khả dụng.');
        }
    }

    async reset() {
        if (this.esploader) {
            return await this.esploader.hardReset();
        } else {
            // Fallback reset
            await this.port.setSignals({ dataTerminalReady: false, requestToSend: false });
            await new Promise(resolve => setTimeout(resolve, 100));
            await this.port.setSignals({ dataTerminalReady: true, requestToSend: true });
        }
    }

    getChipInfo() {
        if (this.esploader && this.esploader.chip) {
            return {
                name: this.esploader.chip.CHIP_NAME || 'ESP32',
                mac: this.esploader.chip.macAddress || null
            };
        }
        return null;
    }
}

