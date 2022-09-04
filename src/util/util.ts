import fs from "fs";
import Jimp = require("jimp"); 
// const ImageBuffer = require("imagebuffer"); 

const Axios = require("axios");

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise((resolve, reject) => {
      Jimp.read(inputURL).then(photo => {
          const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
          photo
              .resize(256, 256) // resize
              .quality(60) // set JPEG quality
              .greyscale() // set greyscale
              .write(__dirname + outpath, (img) => {
                  resolve(__dirname + outpath);
              });
      }).catch(err => {
          console.error(err);
          reject("Could not read image.");
      })
  });
}

export async function filterImageFromURLUsingAxios(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const outpath2 =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      const response = await Axios({
        url: inputURL,
        method: 'GET',
        responseType: 'arraybuffer'
      })

      const photo2 = await Jimp.read(response.data);

      await photo2
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath2, (img) => {
          resolve(__dirname + outpath2);
        });

    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
