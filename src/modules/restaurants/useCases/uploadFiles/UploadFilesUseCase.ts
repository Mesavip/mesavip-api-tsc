import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

import * as cloudinaryConfig from '../../../../config/cloudinary';
import query from '../../../../shared/infra/knex/knex';

interface IUploadFiles {
  user_id: string;
  type: string;
  transformation: string;
  tempFilePath: string;
}

class UploadFilesUseCase {
  async execute({
    user_id,
    type,
    transformation,
    tempFilePath,
  }: IUploadFiles): Promise<IUploadFiles> {
    // Clean tmp folder
    fs.rm(
      path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp'),
      { recursive: true },
      (error) => {
        console.error(error);
      }
    );

    cloudinary.v2.config(cloudinaryConfig);
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
      tempFilePath,
      {
        folder:
          process.env.NODE_ENV === 'development'
            ? 'Mesavip/Uploads'
            : 'Mesavip/HerokuUploads',
        transformation,
      }
    );

    const files: IUploadFiles = await query('files').insert({
      path: secure_url,
      public_id,
      user_id,
      type,
    });

    return files;
  }
}
export { UploadFilesUseCase };
