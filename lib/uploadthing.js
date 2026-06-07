import { createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  cvUploader: f({
    pdf: { maxFileSize: '4MB' },
    'application/msword': { maxFileSize: '4MB' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { maxFileSize: '4MB' },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log('CV uploaded:', file.url);
      return { url: file.url };
    }),
};
