import { auth } from '@/lib/auth/auth';
import { NextRequest, NextResponse } from 'next/server';

interface AuthWithVerification {
  handleVerificationToken: (token: string) => Promise<{ success: boolean; error?: string }>;
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    // Cast auth to extended interface
    const authWithVerification = auth as unknown as AuthWithVerification;
    const result = await authWithVerification.handleVerificationToken(token);
    
    if (result && result.success) {
      return NextResponse.json({ message: 'Email verified successfully' });
    }
    
    return NextResponse.json({
      error: result?.error || 'Invalid or expired token'
    }, { status: 400 });
  } catch (error: unknown) {
    console.error('Verification error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      error: 'Verification failed',
      details: errorMessage
    }, { status: 500 });
  }
}