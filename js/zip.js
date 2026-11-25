/* zip.js (both pages)
   Reads a .zip file in the browser, no library needed (uses the built-in DecompressionStream).
   readZip(file) gives back [{ path, file }] like a folder does, so the same opener handles both. */

async function readZip(file) {
  if (typeof DecompressionStream === 'undefined') throw new Error('This browser cannot open zip files. Use Chrome or Edge.');
  var buf = await file.arrayBuffer(), dv = new DataView(buf), bytes = new Uint8Array(buf);

  // the "end of central directory" record is near the end of the file
  var end = -1;
  for (var i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 65557); i--) {
    if (dv.getUint32(i, true) === 0x06054b50) { end = i; break; }
  }
  if (end < 0) throw new Error('This is not a zip file');
  var count = dv.getUint16(end + 10, true), pos = dv.getUint32(end + 16, true);
  if (count === 0xffff || pos === 0xffffffff) throw new Error('This zip is too big (zip64 is not supported)');

  var dec = new TextDecoder('utf-8'), items = [];
  for (var n = 0; n < count; n++) {
    if (dv.getUint32(pos, true) !== 0x02014b50) break;
    var flags = dv.getUint16(pos + 8, true), method = dv.getUint16(pos + 10, true);
    var csize = dv.getUint32(pos + 20, true), usize = dv.getUint32(pos + 24, true);
    var nlen = dv.getUint16(pos + 28, true), elen = dv.getUint16(pos + 30, true), clen = dv.getUint16(pos + 32, true);
    var offset = dv.getUint32(pos + 42, true);
    var name = dec.decode(bytes.subarray(pos + 46, pos + 46 + nlen)).replace(/\\/g, '/');
    pos += 46 + nlen + elen + clen;
    if (!name || name.charAt(name.length - 1) === '/' || (flags & 1)) continue; // folders, encrypted files
    items.push({ name: name, method: method, csize: csize, usize: usize, offset: offset });
  }

  // drop junk (hidden files, __MACOSX, node_modules...) and a single wrapping folder
  var keep = items.filter(function (it) {
    var parts = it.name.split('/');
    return !parts.some(function (s, i) { return s.charAt(0) === '.' || s === '__MACOSX' || (i < parts.length - 1 && IGNORE.test(s)); });
  });
  var first = keep.length ? keep[0].name.split('/')[0] : '';
  var wrapped = keep.length && keep.every(function (it) { return it.name.indexOf('/') > 0 && it.name.split('/')[0] === first; });

  var out = [];
  for (var k = 0; k < keep.length && out.length < MAX_FILES; k++) {
    var it = keep[k];
    if (it.usize > MAX_ASSET) continue;
    var lh = it.offset, start = lh + 30 + dv.getUint16(lh + 26, true) + dv.getUint16(lh + 28, true);
    var raw = new Blob([bytes.subarray(start, start + it.csize)]), blob;
    if (it.method === 0) blob = raw;
    else if (it.method === 8) blob = await new Response(raw.stream().pipeThrough(new DecompressionStream('deflate-raw'))).blob();
    else continue;
    out.push({ path: wrapped ? it.name.slice(first.length + 1) : it.name, file: blob });
  }
  return { entries: out, name: wrapped ? first : file.name.replace(/\.zip$/i, '') };
}
