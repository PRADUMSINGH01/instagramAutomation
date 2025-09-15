"use client";
// --- Main App Component (for demonstration) ---

const Cart = () => {
  return (
    <div className="flex  bg-gradient-to-r from-pink-500 to-purple-600 text-white  flex-col w-[20rem] h-[20rem] border rounded-xl  justify-between items-center p-4 ">
      <h1 className="text-xl">Comment to Auto DMs</h1>
      <p className="text-sm text-gray-100 ">
        {" "}
        Customer commnent On your IG and Auto DM in there account
      </p>
      <button className=""> Create work flow </button>
    </div>
  );
};

export default function DM_AUTOMATION() {   
  return (
    <div>
      <Cart />
    </div>
  );
}
