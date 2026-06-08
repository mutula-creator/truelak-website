import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Upload directly using UTApi
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      console.error('Uploadthing error:', response.error);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    return NextResponse.json({ 
      url: response.data?.ufsUrl || response.data?.url,
      name: response.data?.name,
    });
  } catch (err) {
    console.error('Upload CV error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
