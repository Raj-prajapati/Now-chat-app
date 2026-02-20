const ChatSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-zinc-900 animate-pulse">

    
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
        <div>
          <div className="bg-gray-700 h-4 w-24 rounded-md mb-2"></div>
          <div className="bg-gray-700 h-3 w-16 rounded-md"></div>
        </div>
      </div>

     
      <div className="flex flex-col gap-5 mt-10">

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div className="bg-gray-700 h-6 w-40 rounded-xl"></div>
        </div>

       
        <div className="flex justify-end items-start gap-3">
          <div className="bg-gray-700 h-6 w-32 rounded-xl"></div>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div className="bg-gray-700 h-6 w-52 rounded-xl"></div>
        </div>
      </div>

     
      <div className="flex items-center gap-3 mt-auto">
        <div className="bg-gray-700 h-10 w-full rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
      </div>

    </div>
  );
};

export default ChatSkeleton;
