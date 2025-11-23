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
        // Check if port is already open
        if (this.port.readable && this.port.writable) {
            // Port is already open, just get readers/writers
            if (onLog) onLog('Port already open, reusing...');
        } else {
            // Open port only if not already open
            await this.port.open({ baudRate: this.baudRate });
        }
        
        // Get readers/writers (reuse if already have them)
        if (!this.reader) {
            this.reader = this.port.readable.getReader();
        }
        if (!this.writer) {
            this.writer = this.port.writable.getWriter();
        }

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
                if (onLog) onLog('Warning: esptool-js init failed, using direct serial: ' + e.message);
                return false;
            }
        }
        return false;
    }

    async disconnect() {
        // Disconnect esploader first
        if (this.esploader) {
            try {
                await this.esploader.disconnect();
            } catch (e) {
                console.log('Error disconnecting esploader:', e);
            }
            this.esploader = null;
        }
        
        // Close reader
        if (this.reader) {
            try {
                await this.reader.cancel();
            } catch (e) {
                console.log('Error canceling reader:', e);
            }
            try {
                await this.reader.releaseLock();
            } catch (e) {
                console.log('Error releasing reader:', e);
            }
            this.reader = null;
        }
        
        // Close writer
        if (this.writer) {
            try {
                await this.writer.releaseLock();
            } catch (e) {
                console.log('Error releasing writer:', e);
            }
            this.writer = null;
        }
        
        // Close port (only if we opened it)
        // Note: Don't close port here if it was opened outside wrapper
        // The caller should handle port closing
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

