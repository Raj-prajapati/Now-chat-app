import { useState, useRef } from "react";
import { useChatStore } from "../../store/chatStore";
import { Send,Image,X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [msg, setMsg] = useState("");
  const sendMessages = useChatStore((s) => s.sendMessages);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
 

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (e) => {
     setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend =async () => {
    if (!msg.trim() && !imagePreview) return;
     await sendMessages({ text: msg,image: imagePreview });
    setMsg("");
    setImagePreview("");
  };

  const handleInput = (e) => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";

    setMsg(e.target.value);
  };

  return (
    <div className="bg-base-300 px-4 border-4 border-base-300  flex gap-2 items-center ml-4 mb-2.5 rounded-3xl mx-6 ">
     
     {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <textarea
        rows={1}
        value={msg}
        placeholder="Type a message..."
        ref={textareaRef}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        onInput={handleInput}
        className="flex-1 resize-none px-4 py-2 text-lg max-h-32
               border border-base-300 rounded-lg
               focus:outline-none overflow-y-hidden"
      />

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <button
        type="button"
        className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Image size={20} />
      </button>
      <button className="" onClick={handleSend}>
        <Send />
      </button>
    </div>
  );
};

export default MessageInput;





