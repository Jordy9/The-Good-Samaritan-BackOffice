import { Types } from "../types/Types"

export const UploadFish = () => ({
    type: Types.chbUploadFinish
})
  
export const upload = (progress) => ({
    type: Types.chbUpload,
    payload: progress
})