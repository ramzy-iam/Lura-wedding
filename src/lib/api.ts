import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Google Drive upload utility using axios
export async function uploadFileToGDrive(
  file: File,
  metadata: { name?: string; parents?: string[] } = {},
) {
  try {
    // 1. Fetch access token from backend
    const tokenRes = await api.get('/gdrive/token');
    const { access_token } = tokenRes.data;

    // 2. Initiate resumable upload session using axios
    const initRes = await axios.post(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
      {
        name: metadata.name || file.name,
        mimeType: file.type,
        parents: metadata.parents,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Upload-Content-Type': file.type,
          'X-Upload-Content-Length': file.size.toString(),
        },
      },
    );

    // 3. Extract upload URL from response headers
    const uploadUrl = initRes.headers.location;
    if (!uploadUrl) {
      throw new Error('No upload URL received from Google Drive');
    }

    // 4. Upload file data directly to the upload URL using axios
    const uploadRes = await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
        'Content-Length': file.size.toString(),
      },
    });

    return { success: true, data: uploadRes.data };
  } catch (error) {
    console.error('Google Drive upload error:', error);
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error:
          error.response?.data?.error?.message ||
          error.message ||
          'Upload failed',
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}
