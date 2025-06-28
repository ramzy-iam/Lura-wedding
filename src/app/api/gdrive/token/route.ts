import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import { checkRateLimit } from '@/utils/limiter';

export async function GET() {
  try {
    // Apply rate limiting
    await checkRateLimit();
    const credentials = JSON.parse(
      process.env.GOOGLE_CREDENTIALS_JSON as string,
    );

    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    if (!accessToken.token) {
      throw new Error('Failed to generate access token');
    }

    return NextResponse.json({
      success: true,
      access_token: accessToken.token,
    });
  } catch (error) {
    console.error('Failed to generate Google Drive token:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate access token' },
      { status: 500 },
    );
  }
}
