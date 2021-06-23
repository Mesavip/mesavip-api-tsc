import cloudinary from 'cloudinary';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

import * as cloudinaryConfig from '../../config/cloudinary';
import query from '../../shared/infra/knex/knex';

class UploadFiles {
  async execute(request: Request, response: Response): Promise<Response> {
    const { type, transformation } = request.body;
    const { id: restaurant_id } = request.user;
    const { tempFilePath } = (request as any).files.file;

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

    await query('files').insert({
      path: secure_url,
      public_id,
      restaurant_id,
      type,
    });

    return response.status(201).json('Files uploaded successfully');
  }
}
export { UploadFiles };
