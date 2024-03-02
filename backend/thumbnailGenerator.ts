import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import fs from "fs";
import path from "path";
import * as oembedParser from "oembed-parser";

// ffmpeg-staticからffmpegのパスを取得し、fluent-ffmpegに設定
if (ffmpegStatic !== null) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
} else {
  console.error("ffmpeg-staticからパスを取得できませんでした。");
  // 必要に応じてエラーハンドリング
}

/**
 * 動画URLからサムネイルを生成し、サムネイルのファイルパスを返す関数
 * @param videoUrl 動画のURL
 * @returns サムネイルのファイルパス
 */
export const generateThumbnail = async (videoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // 一時ファイルのパスを生成
    const tempDir = path.join(__dirname, "tmp");
    const filename = `thumbnail-${Date.now()}.png`;
    const filePath = path.join(tempDir, filename);

    // tmpディレクトリが存在しない場合は作成
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // ffmpegを使用してサムネイルを生成
    ffmpeg(videoUrl)
      .on("end", () => {
        console.log(`サムネイルが正常に生成されました: ${filePath}`);
        resolve(filePath);
      })
      .on("error", (err: Error) => {
        console.error(`サムネイル生成中にエラーが発生しました: ${err.message}`);
        reject(err);
        console.log(ffmpeg);
      })
      .screenshots({
        // サムネイルの設定
        count: 1, // 生成するサムネイルの数
        folder: tempDir, // 保存先ディレクトリ
        filename: filename, // ファイル名
        size: "320x240", // サイズ
      });
  });
};
