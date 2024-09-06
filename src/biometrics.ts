import { Biometrics } from '@nativescript/biometrics';

export const authenticate = async (): Promise<boolean> => {
  try {
    const result = await Biometrics.authenticate({ title: 'Log in' });
    console.log(result);
    return result.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};
