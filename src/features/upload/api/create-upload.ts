import { axiosInstance } from "@/lib/axios";
import { UploadPayload, UploadResponse } from "../types";
import { MutationConfig } from "@/lib/reat-query";
import { useMutation } from "@tanstack/react-query";

const uploadImage = async ({file, folder = "general"} : UploadPayload)=> {
const formData = new FormData();
formData.append("file", file);

const {data} = await axiosInstance.post<UploadResponse>(`upload?folder=${folder}`, formData, {
    headers : {
        "Content-Type" : "multipart/form-data"
    }
})
return data
}


type UseUploadImage = {
    mutationConfig?: MutationConfig<typeof uploadImage>
}

export const useUploadImage = ({mutationConfig} : UseUploadImage = {}) => {
    return useMutation({
        mutationFn: uploadImage,
        ...mutationConfig
    })
}