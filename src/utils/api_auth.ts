import { env } from '../env.ts';

export async function AuthModel(user_google: string) {
  try {
    const response = await fetch(`${env.API_DSR}/users/${user_google}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('User not found. Please login and try again');
    }

    return await response.json();
  } catch {
    throw new Error('User not found. Please login and try again.');
  }
}
