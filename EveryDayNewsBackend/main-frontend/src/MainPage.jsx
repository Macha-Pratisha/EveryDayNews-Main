
// import { UserCog, Users, Truck } from "lucide-react";

// export default function MainPage() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-10">

//       {/* Welcome Line */}
//    <h3 class="text-4xl md:text-5xl font-extrabold mb-6 text-center gradient-text pulse-1 drop-shadow-md">
//   Welcome to
// </h3>

// <h1 class="text-5xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 pulse-2 drop-shadow-md">
//   Newspaper Agency Automation Software
// </h1>
//       {/* Card Container */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">

//         {/* Manager Portal */}
// <div className="relative bg-white rounded-[3rem] shadow-lg border-2 border-indigo-400 p-8 flex flex-col items-center transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl group">
//   <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-in-out blur-lg"></div>
//   <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white text-4xl font-bold mb-6 shadow-md z-10">
//     <UserCog className="w-12 h-12" />
//   </div>
//   <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center z-10">Manager Portal</h2>
//   <p className="text-gray-500 text-center mb-4 z-10">Go to Manager Login / Signup</p>
//   <a href="http://localhost:8082/login" className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 text-white font-semibold hover:from-indigo-500 hover:to-indigo-600 transition-colors duration-500 z-10">
//     Enter
//   </a>
// </div>

// {/* Customer Portal */}
// <div className="relative bg-white rounded-[3rem] shadow-lg border-2 border-orange-400 p-8 flex flex-col items-center transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl group">
//   <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-in-out blur-lg"></div>
//   <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-4xl font-bold mb-6 shadow-md z-10">
//     <Users className="w-12 h-12" />
//   </div>
//   <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center z-10">Customer Portal</h2>
//   <p className="text-gray-500 text-center mb-4 z-10">Go to Customer Login / Signup</p>
//   <a href="http://localhost:8080/login" className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold hover:from-orange-500 hover:to-orange-600 transition-colors duration-500 z-10">
//     Enter
//   </a>
// </div>

// {/* Delivery Portal */}
// <div className="relative bg-white rounded-[3rem] shadow-lg border-2 border-green-400 p-8 flex flex-col items-center transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl group">
//   <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-r from-green-200 via-green-300 to-green-200 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-in-out blur-lg"></div>
//   <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white text-4xl font-bold mb-6 shadow-md z-10">
//     <Truck className="w-12 h-12" />
//   </div>
//   <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center z-10">Delivery Portal</h2>
//   <p className="text-gray-500 text-center mb-4 z-10">Go to Delivery Login / Signup</p>
//   <a href="http://localhost:8081/login" className="px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold hover:from-green-500 hover:to-green-600 transition-colors duration-500 z-10">
//     Enter
//   </a>
// </div>


//       </div>
//     </div>
//   );
// }


import { UserCog, Users, Truck } from "lucide-react";

export default function MainPage() {
  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 p-10">

      {/* Welcome Line */}
      <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 pulse-1 drop-shadow-md">
        Welcome to
      </h3>

      <h1 className="text-5xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 pulse-2 drop-shadow-md">
        Newspaper Agency Automation Software
      </h1>

      {/* Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">

        {/* Manager Portal */}
        <div className="relative bg-white rounded-[3rem] shadow-lg border-2 border-indigo-400 p-8 flex flex-col items-center transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl group">
          <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-in-out blur-lg"></div>
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white text-4xl font-bold mb-6 shadow-md z-10">
            <UserCog className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center z-10">Manager Portal</h2>
          <p className="text-gray-500 text-center mb-4 z-10">Go to Manager Login / Signup</p>
          <a href="https://managerportal.vercel.app/login" className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 text-white font-semibold hover:from-indigo-500 hover:to-indigo-600 transition-colors duration-500 z-10">
            Enter
          </a>
        </div>

        {/* Customer Portal */}
        <div className="relative bg-white rounded-[3rem] shadow-lg border-2 border-orange-400 p-8 flex flex-col items-center transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl group">
          <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-in-out blur-lg"></div>
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-4xl font-bold mb-6 shadow-md z-10">
            <Users className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center z-10">Customer Portal</h2>
          <p className="text-gray-500 text-center mb-4 z-10">Go to Customer Login / Signup</p>
          <a href="https://customer-portal-black-gamma.vercel.app" className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold hover:from-orange-500 hover:to-orange-600 transition-colors duration-500 z-10">
            Enter
          </a>
        </div>

        {/* Delivery Portal */}
        <div className="relative bg-white rounded-[3rem] shadow-lg border-2 border-green-400 p-8 flex flex-col items-center transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl group">
          <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-r from-green-200 via-green-300 to-green-200 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-in-out blur-lg"></div>
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white text-4xl font-bold mb-6 shadow-md z-10">
            <Truck className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center z-10">Delivery Portal</h2>
          <p className="text-gray-500 text-center mb-4 z-10">Go to Delivery Login / Signup</p>
          <a href="https://delivery-portal-iota.vercel.app" className="px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold hover:from-green-500 hover:to-green-600 transition-colors duration-500 z-10">
            Enter
          </a>
        </div>

      </div>
    </div>
  );
}

