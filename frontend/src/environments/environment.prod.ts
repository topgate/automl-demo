export const environment = {
  production: true,
  useMock: false
};

// Cloud Functionsのエンドポイント
// AutoML Tables APIとの間に認証用のCloud Functionsを作る
export const FUNCTIONS_URL = `https://location-project-id.cloudfunctions.net/endpoint`;
