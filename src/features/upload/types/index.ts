export interface UploadResponse {
  url: string;
  path: string;
}

export interface UploadPayload {
  file: File;
  folder?: string;
}


