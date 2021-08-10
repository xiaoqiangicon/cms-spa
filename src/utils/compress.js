/* eslint-disable no-new */
import Compressor from 'compressorjs';

function compressImage(file) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      maxWidth: 1000,
      // 有些图片的高度超长，保留之
      maxHeight: 1000000,
      success(result) {
        const newFile = new File([result], file.name, { type: file.type });
        resolve(newFile);
      },
      error(error) {
        console.error(error);

        reject(error);
      },
    });
  });
}

export function beforeReadImage(file) {
  if (Array.isArray(file)) {
    return Promise.all(file.map(f => compressImage(f)));
  }

  return compressImage(file);
}
