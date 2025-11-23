/**
 * ESP32 Web Flasher - Web Serial API Implementation
 * Simplified esptool.js for browser-based ESP32 flashing
 */

class ESP32WebFlasher {
    constructor(port, writer, reader) {
        this.port = port;
        this.writer = writer;
        this.reader = reader;
        this.baudRate = 115200;
    }

    // Send command and wait for response
    async sendCommand(cmd, timeout = 1000) {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        
        // Send command
        await this.writer.write(encoder.encode(cmd));
        
        // Read response
        const startTime = Date.now();
        let response = '';
        
        while (Date.now() - startTime < timeout) {
            const { value, done } = await this.reader.read();
            if (done) break;
            
            response += decoder.decode(value, { stream: true });
            if (response.includes('\n')) break;
        }
        
        return response;
    }

    // Reset ESP32 to bootloader mode
    async resetToBootloader() {
        // Set DTR low and RTS high to enter bootloader
        await this.port.setSignals({ 
            dataTerminalReady: false, 
            requestToSend: true 
        });
        await this.sleep(100);
        
        // Set DTR high and RTS low
        await this.port.setSignals({ 
            dataTerminalReady: true, 
            requestToSend: false 
        });
        await this.sleep(100);
    }

    // Sync with ESP32 bootloader
    async sync() {
        // Send sync command (0x08)
        const syncCmd = new Uint8Array([0x08, 0x24, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        await this.writer.write(syncCmd);
        await this.sleep(100);
    }

    // Write flash memory
    async writeFlash(address, data, progressCallback) {
        const chunkSize = 0x1000; // 4KB chunks
        const totalChunks = Math.ceil(data.length / chunkSize);
        
        for (let i = 0; i < totalChunks; i++) {
            const offset = i * chunkSize;
            const chunk = data.slice(offset, Math.min(offset + chunkSize, data.length));
            const chunkAddress = address + offset;
            
            // Write chunk
            await this.writeFlashChunk(chunkAddress, chunk);
            
            if (progressCallback) {
                const progress = ((i + 1) / totalChunks) * 100;
                progressCallback(progress, `Đang ghi: ${Math.round(progress)}%`);
            }
        }
    }

    // Write a single chunk to flash
    async writeFlashChunk(address, data) {
        // Simplified write command
        // In real implementation, you'd need to implement the full esptool protocol
        const command = new Uint8Array([0x02]); // Write flash command
        await this.writer.write(command);
        
        // Send address (4 bytes, little-endian)
        const addrBytes = new Uint8Array(4);
        addrBytes[0] = address & 0xFF;
        addrBytes[1] = (address >> 8) & 0xFF;
        addrBytes[2] = (address >> 16) & 0xFF;
        addrBytes[3] = (address >> 24) & 0xFF;
        await this.writer.write(addrBytes);
        
        // Send data length (4 bytes, little-endian)
        const lenBytes = new Uint8Array(4);
        lenBytes[0] = data.length & 0xFF;
        lenBytes[1] = (data.length >> 8) & 0xFF;
        lenBytes[2] = (data.length >> 16) & 0xFF;
        lenBytes[3] = (data.length >> 24) & 0xFF;
        await this.writer.write(lenBytes);
        
        // Send data
        await this.writer.write(data);
        
        // Wait for acknowledgment
        await this.sleep(50);
    }

    // Erase flash
    async eraseFlash() {
        // Simplified erase - send erase command
        const eraseCmd = new Uint8Array([0x0C, 0x00, 0x00, 0x00, 0x00]);
        await this.writer.write(eraseCmd);
        await this.sleep(2000); // Wait for erase to complete
    }

    // Reset chip
    async resetChip() {
        await this.port.setSignals({ 
            dataTerminalReady: false, 
            requestToSend: false 
        });
        await this.sleep(100);
        await this.port.setSignals({ 
            dataTerminalReady: true, 
            requestToSend: true 
        });
    }

    // Sleep utility
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ESP32WebFlasher;
}

