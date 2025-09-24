"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
  useEffect,
} from "react";
import ImageContainer from "@/components/ImageContainer";

interface ImageContainerProps {
  img: UploadedImage;
  src: string;
  link: string;
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

interface ImageContextType {
  openModal: (props: ImageContainerProps) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageContainerProvider({ children }: { children: ReactNode }) {
  const [modalProps, setModalProps] = useState<ImageContainerProps | null>(
    null,
  );
  const [baseUrl, setBaseUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((props: ImageContainerProps) => {
    setModalProps(props);
    setIsOpen(true);
    window.history.pushState({ modalOpen: true }, "", window.location.href);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalProps(null);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        closeModal();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isOpen]);

  return (
    <ImageContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      {isOpen && modalProps && (
        <ImageContainer
          {...modalProps}
          baseUrl={baseUrl}
          onClose={closeModal}
        />
      )}
    </ImageContext.Provider>
  );
}

export function useImageModal() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error(
      "useImageModal must be used within an ImageContainerProvider",
    );
  }
  return context;
}
