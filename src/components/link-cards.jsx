import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

const LinkCard = ({ url, fetchUrls }) => {
  const downloadImage = async () => {
    try {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        // Cleanup
        URL.revokeObjectURL(blobUrl);
        toast.success("QR Code downloaded successfully!");
    } catch (error) {
        console.error("Download failed:", error);
        toast.error("Failed to download QR Code");
    }
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  const handleDelete = () => {
    fnDelete()
      .then(() => {
        fetchUrls();
        toast.success("Link Deleted");
      })
      .catch((error) => {
        toast.error("Failed to delete link");
      });
  };

  const handleCopy = () => {
    const baseUrl = window.location.origin; 
    const shortCode = url?.custom_url ? url?.custom_url : url.short_url;
    
    const linkToCopy = `${baseUrl}/${shortCode}`;
    
    navigator.clipboard.writeText(linkToCopy);
    toast.success("Link copied to clipboard!");
  };

  // Helper for display text
  const shortCode = url?.custom_url ? url?.custom_url : url.short_url;
  const displayUrl = `${window.location.origin}/${shortCode}`;

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url?.qr}
        alt="qr code"
        className="h-32 object-contain ring ring-blue-500 self-start"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer break-all">
          {displayUrl}
        </span>
        
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <Button variant="ghost" onClick={handleCopy}>
          <Copy />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          {loadingDelete ? <BeatLoader size={5} /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;