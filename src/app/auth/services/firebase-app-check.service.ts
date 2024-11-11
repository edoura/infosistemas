import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { AppCheck, AppCheckTokenResult, ReCaptchaEnterpriseProvider, getToken, initializeAppCheck } from 'firebase/app-check';
import { getAuth, signInAnonymously, Auth, UserCredential } from 'firebase/auth';
import { environment } from '../../../environments/environment';

export const APPCHECK_TOKEN = 'fb_appcheck_token';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAppCheckService {
  app: FirebaseApp;
  appCheck: AppCheck;
  auth: Auth;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.auth = getAuth(this.app);
    this.appCheck = initializeAppCheck(this.app, {
      provider: new ReCaptchaEnterpriseProvider(environment.RECAPTCHA_TOKEN),
      isTokenAutoRefreshEnabled: true
    });

    // Chama o método que executa o login anônimo
    this.initializeAnonymousSignIn();
  }

  // Método assíncrono separado para o login anônimo
  private async initializeAnonymousSignIn(): Promise<void> {
    try {
      const userCredential: UserCredential = await signInAnonymously(this.auth);
      console.log('Usuário autenticado anonimamente:', userCredential);
    } catch (error) {
      console.error('Erro ao realizar login anônimo:', error);
    }
  }

  // Método para obter o token do App Check, com armazenamento local
  async getToken(): Promise<AppCheckTokenResult | undefined> {
    const storedToken = localStorage.getItem(APPCHECK_TOKEN);

    if (storedToken) {
      console.log("Token recuperado do armazenamento local:", storedToken);
      return { token: storedToken } as AppCheckTokenResult;
    }

    let appCheckTokenResponse;
    try {
      appCheckTokenResponse = await getToken(this.appCheck, true); // 'true' para forçar a atualização do token
      if (appCheckTokenResponse?.token) {
        localStorage.setItem(APPCHECK_TOKEN, appCheckTokenResponse.token);
        console.log("Token App Check atualizado e salvo no armazenamento local:", appCheckTokenResponse.token);
      }
    } catch (err) {
      console.error("Erro ao obter token do App Check:", err);
    }

    return appCheckTokenResponse;
  }
}
