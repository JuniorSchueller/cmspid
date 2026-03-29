/**
 * cmspid - Creative Managed Serialized Pseudo-Identifier
 * * A lightweight encoding utility that bridges the gap between Base64 
 * data-reversibility and the aesthetic structure of a UUID (RFC 4122).
 * * @author JuniorSchueller
 * @license MIT
 * @version 1.0.0
 */

'use strict';

class cmspid {
  /**
   * Encodes a string or Buffer into a cmspid (UUID-styled) string.
   * @param {string|Buffer} input - The raw data to be encoded.
   * @returns {string} A masked string following the 8-4-4-4-N pattern.
   * @throws {TypeError} If the input is not a string or a Buffer.
   */
  static encode(input) {
    if (!input && input !== '') return '';
    
    let buffer;
    if (Buffer.isBuffer(input)) {
      buffer = input;
    } else if (typeof input === 'string') {
      buffer = Buffer.from(input, 'utf8');
    } else {
      throw new TypeError('cmspid: Input must be a String or a Buffer.');
    }

    const hex = buffer.toString('hex');
    return this._tokenize(hex);
  }

  /**
   * Decodes a cmspid string back into its original data.
   * @param {string} pid - The encoded cmspid string.
   * @param {string} [encoding='utf8'] - The output format (e.g., 'utf8', 'hex', 'buffer').
   * @returns {string|Buffer} The original decoded data.
   * @throws {TypeError} If pid is not a string.
   */
  static decode(pid, encoding = 'utf8') {
    if (typeof pid !== 'string') {
      throw new TypeError('cmspid: Decode parameter must be a string.');
    }

    // Remove all hyphens to reconstruct the hex string
    const hex = pid.replace(/-/g, '');
    
    try {
      const buffer = Buffer.from(hex, 'hex');
      return encoding === 'buffer' ? buffer : buffer.toString(encoding);
    } catch (error) {
      throw new Error('cmspid: Failed to decode. String may be corrupted or not a valid hex sequence.');
    }
  }

  /**
   * Validates if a string adheres to the cmspid visual format.
   * @param {string} str - The string to validate.
   * @returns {boolean}
   */
  static isValid(str) {
    // Matches the 8-4-4-4-N pattern where N is the remaining hex data
    const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]+$/i;
    return pattern.test(str);
  }

  /**
   * Internal helper to segment hex strings into UUID-like tokens.
   * @param {string} hex 
   * @private
   */
  static _tokenize(hex) {
    const segments = [];
    const breaks = [8, 4, 4, 4];
    let cursor = 0;

    for (const len of breaks) {
      if (cursor < hex.length) {
        segments.push(hex.substring(cursor, cursor + len));
        cursor += len;
      }
    }

    // Append the remainder of the hex string as the final segment
    if (cursor < hex.length) {
      segments.push(hex.substring(cursor));
    }

    return segments.join('-');
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = cmspid;
}

if (typeof window !== 'undefined') {
  window.cmspid = cmspid;
}
