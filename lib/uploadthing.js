import { createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  cvUploader: f({
    pdf: { maxFileSize: '4MB', maxFileCount: 1 },
    'application/msword': { maxFileSize: '4MB', maxFileCount: 1 },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async () => ({}))
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl || file.url };
    }),
};
