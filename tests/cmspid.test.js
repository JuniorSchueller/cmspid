/**
 * Test suite for cmspid
 * Focuses on data integrity and UUID-style formatting.
 */

const cmspid = require('../src/index');

describe('cmspid library', () => {
  
  // Test 1: Basic String Encoding/Decoding
  test('should encode and decode a standard string correctly', () => {
    const input = 'hello-world';
    const encoded = cmspid.encode(input);
    
    expect(cmspid.isValid(encoded)).toBe(true);
    expect(cmspid.decode(encoded)).toBe(input);
  });

  // Test 2: Buffer Support
  test('should handle Node.js Buffers', () => {
    const buffer = Buffer.from([0x00, 0xff, 0x42]);
    const encoded = cmspid.encode(buffer);
    const decoded = cmspid.decode(encoded, 'buffer');
    
    expect(Buffer.compare(buffer, decoded)).toBe(0);
  });

  // Test 3: Formatting Structure
  test('should follow the 8-4-4-4-N pattern', () => {
    const input = 'a-very-long-string-for-testing-purposes';
    const encoded = cmspid.encode(input);
    
    const parts = encoded.split('-');
    expect(parts[0].length).toBe(8);
    expect(parts[1].length).toBe(4);
    expect(parts[2].length).toBe(4);
    expect(parts[3].length).toBe(4);
    // The last part contains the remainder
    expect(parts.length).toBe(5);
  });

  // Test 4: Special Characters
  test('should handle emojis and unicode correctly', () => {
    const input = '🚀 cmspid encoding 🆔';
    const encoded = cmspid.encode(input);
    expect(cmspid.decode(encoded)).toBe(input);
  });

  // Test 5: Error Handling
  test('should throw TypeError on invalid input types', () => {
    expect(() => cmspid.encode(12345)).toThrow(TypeError);
    expect(() => cmspid.decode(null)).toThrow(TypeError);
  });

  // Test 6: Empty Input
  test('should return empty string for empty input', () => {
    expect(cmspid.encode('')).toBe('');
  });
});
