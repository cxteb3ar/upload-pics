"use client";
import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { copyToClipboard } from "@/lib/browser";

interface ImageContainerProps {
  img: UploadedImage;
  src: string;
  link: string;
  baseUrl: string;
  onClose: () => void;
  handleDownload: (img: UploadedImage) => void;
  handleInfo: (img: UploadedImage) => void;
  handleDelete: (id: string) => void;
  unoptimized?: boolean;
}

interface UploadedImage {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  date: string;
}

const ImageContainer: React.FC<ImageContainerProps> = memo(
  ({
    img,
    src,
    link,
    baseUrl,
    onClose,
    handleDownload,
    handleInfo,
    handleDelete,
    unoptimized,
  }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await copyToClipboard(`${baseUrl}${src}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    return (
      <div className="fixed top-0 left-0 z-99999 flex h-full w-full items-center justify-center text-center">
        <div
          className="fixed z-10000 h-screen w-screen bg-[#000000af]"
          onClick={onClose}
        ></div>
        <div className="fixed top-0 z-10002 flex w-full max-w-[100vw] flex-row items-center justify-between border-b border-[#7a7a7a] bg-[#141414a1] px-1 py-1 dark:border-[#313131]">
          <div className="flex flex-row items-center gap-1">
            <IconButton
              title="Copy Link"
              name="Copy Link"
              onClick={handleCopy}
              className="text-[#cfcfcf] hover:text-[#fff]"
            >
              {!copied ? (
                <LinkRoundedIcon className="text-xl" />
              ) : (
                <InventoryRoundedIcon className="text-xl text-emerald-300" />
              )}
            </IconButton>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-1 text-sm text-blue-400 dark:text-blue-500"
            >
              <p className="2xs:max-w-[15rem] max-w-[7.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-blue-400 transition duration-200 hover:text-blue-300 sm:max-w-[20rem] md:max-w-[24rem] dark:text-blue-500 dark:hover:text-blue-400">
                {img.filename}
              </p>
              <p className="text-xs">
                <ArrowOutwardRoundedIcon className="text-xs" />
              </p>
            </a>
          </div>
          <div className="flex flex-row items-center gap-0">
            <IconButton
              title="Download Image"
              name="Download Image"
              onClick={() => handleDownload(img)}
              className="text-[#cfcfcf] hover:text-[#fff]"
            >
              <FileDownloadRoundedIcon className="text-xl" />
            </IconButton>
            <IconButton
              title={"Delete this Image"}
              name={"Delete this Image"}
              onClick={() => {
                handleDelete(img.id);
                onClose();
              }}
              className="text-[#c54b4b] hover:text-[#aa2828]"
            >
              <DeleteForeverRoundedIcon className="text-xl" />
            </IconButton>
            <IconButton
              title={"View Info"}
              name={"View Info"}
              onClick={() => {
                handleInfo(img);
              }}
              className="text-[#cfcfcf] hover:text-[#fff]"
            >
              <InfoRoundedIcon className="text-xl" />
            </IconButton>
            <CloseButton onClose={onClose} />
          </div>
        </div>
        <div className="inset-0 z-10001 flex items-center justify-center">
          <div className="max-h-screen max-w-screen rounded-4xl px-3">
            <section className="flex justify-center">
              <Image
                className="h-auto max-h-[100vh] w-auto max-w-[100vw] object-contain"
                src={src}
                width={600}
                height={600}
                quality={100}
                unoptimized={unoptimized}
                alt="Image"
              />
            </section>
          </div>
        </div>
      </div>
    );
  },
);

ImageContainer.displayName = "ImageContainer";

export default ImageContainer;

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <IconButton
      title="Close Viewer"
      name="Close Viewer"
      className="text-[#cfcfcf] hover:text-[#fff]"
      onClick={onClose}
    >
      <CloseRoundedIcon className="text-xl" />
    </IconButton>
  );
};
