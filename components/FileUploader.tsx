"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import { useToast } from "@/hooks/use-toast";
import { MAX_FILE_SIZE } from "@/constants";
import { uploadFiles } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader =  ({ ownerId, accountId, className }: Props) => {
  const path = usePathname()
  const [files, setFiles] = useState<File[]>([]);
  const {toast} = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    const uploadPromises = acceptedFiles.map(async (file) => {
      if(file.size > MAX_FILE_SIZE){
        setFiles((prevFiles)=> prevFiles.filter((f) => f.name !== file.name))

        return toast({
          
          description: (
            <p className="body-2 text-white">
              <span className="font-semibold">
                {file.name} is too large. Max file size is 50 MB.
              </span>
            </p>
          ) , 
          className:"error-toast",
        })
      }

      return uploadFiles({file,ownerId,accountId,path}).then((uploadedFile) => {
        if(uploadedFile){
          setFiles((prevFiles) => prevFiles.filter((f)=> f.name !== file.name))
        }
      })

    })

    await Promise.all(uploadPromises)

  }, [ownerId,accountId,path]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileRemove = (e:React.MouseEvent<HTMLImageElement, MouseEvent>,filename:string) =>{
    e.stopPropagation()
    setFiles((prevFiles) => prevFiles.filter((files) => files.name !== filename))

  }

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button")}>
        <Image
          src="/assets/icons/upload.svg"
          width={24}
          height={24}
          alt="upload"
        />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Uploading</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="preview-item-name">
                    {file.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      alt="loader"
                      width={80}
                      height={26}
                    />
                  </div>
                </div>
                <Image src="/assets/icons/remove.svg" width={24} height={24} alt="remove" onClick={(e)=>handleFileRemove(e,file.name)}/>


              </li>
            );
          })}
        </ul>
      )}
      
    </div>
  );
};

export default FileUploader;
