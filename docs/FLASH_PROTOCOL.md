# ESP32 Flash Protocol Implementation

Dựa trên [esptool chính thức](https://github.com/espressif/esptool), protocol flash ESP32 sử dụng:

## SLIP Protocol

- Mỗi packet bắt đầu và kết thúc bằng `0xC0`
- Escape `0xC0` → `0xDB 0xDC`
- Escape `0xDB` → `0xDB 0xDD`

## Flash Commands

1. **FLASH_BEGIN (0x02)**: Bắt đầu flash mode
   - Parameters: erase_size, num_blocks, block_size, offset
   
2. **FLASH_DATA (0x03)**: Gửi data block
   - Parameters: data_length, sequence, 0, 0 + data
   - Checksum được tính và gửi kèm
   
3. **FLASH_END (0x04)**: Kết thúc flash mode
   - Parameters: reboot flag

## Khuyến nghị

Sử dụng thư viện **esptool-js** chính thức thay vì tự implement:
- Đã được test kỹ
- Hỗ trợ đầy đủ protocol
- Được maintain bởi Espressif

