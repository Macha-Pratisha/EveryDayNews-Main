
// import { useEffect, useState } from "react";
// import axiosInstance from "@/lib/axios";
// import { toast } from "sonner";
// import qrImage from "@/pages/Qr.jpg"; 
// import { useNavigate } from "react-router-dom";


// interface Publication {
//   _id: string;
//   name: string;
//   language: string;
//   monthlyPrice: number;
// }

// interface Subscription {
//   publication: {
//     _id: string;
//   };
//   customerName: string;
// }



// const NewSubscription = () => {
//   const [publications, setPublications] = useState<Publication[]>([]);
//   const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
//   const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [customerNameInput, setCustomerNameInput] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState<"qr" | "cod">("qr");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchPublications();
//   }, []);

//   const fetchPublications = async () => {
//     try {
//       const response = await axiosInstance.get("/customer/publications");
//       setPublications(response.data);
//     } catch (error) {
//       console.error("Error fetching publications:", error);
//       toast.error("Failed to fetch available publications");
//     }
//   };

//   const fetchSubscriptions = async (name: string) => {
//     if (!name.trim()) return;
//     try {
//       const response = await axiosInstance.get(
//         `/customer/subscriptions?customerName=${encodeURIComponent(name)}`
//       );
//       setSubscriptions(response.data);
//     } catch (error) {
//       console.error("Error fetching subscriptions:", error);
//     }
//   };

//   const handleSubscribeClick = (pub: Publication) => {
//     setSelectedPub(pub);
//     setShowModal(true);
//   };
//   const navigate = useNavigate();
//   const handlePayNow = async () => {
//   if (!customerNameInput.trim()) {
//     toast.error("Please enter your name");
//     return;
//   }

//   setLoading(true);
//   try {
//     await axiosInstance.post("/customer/subscriptions/subscribe", {
//       customerName: customerNameInput.trim(),
//       publicationId: selectedPub?._id,
//       amount: selectedPub?.monthlyPrice,
//     });

//     toast.success(`Subscribed to ${selectedPub?.name} successfully!`);
//     setShowModal(false);
//     fetchSubscriptions(customerNameInput);
//     window.dispatchEvent(new Event("billsUpdated"));

//     // ✅ Navigate to Payments page
//     navigate("/payments"); 
//   } catch (error: any) {
//     console.error(error);
//     toast.error(error.response?.data?.message || "Subscription failed");
//   } finally {
//     setLoading(false);
//   }
// };

//   const isSubscribed = (pubId: string) =>
//     subscriptions.some((sub) => sub.publication._id === pubId);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Available Publications</h1>

//       {publications.length === 0 ? (
//         <p>No publications available.</p>
//       ) : (
//         <ul className="space-y-4">
//           {publications.map((pub) => (
//             <li
//               key={pub._id}
//               className="p-4 border rounded-md shadow-sm flex items-center justify-between"
//             >
//               <div>
//                 <h2 className="font-semibold text-lg">{pub.name}</h2>
//                 <p className="text-gray-500">Language: {pub.language}</p>
//                 <p className="font-medium mt-1">₹{pub.monthlyPrice} / month</p>
//               </div>
//               <button
//                 onClick={() => handleSubscribeClick(pub)}
//                 className={`px-4 py-2 rounded-lg border transition-all duration-200 text-white bg-blue-600 hover:bg-blue-700 border-blue-700`}
//               >
//                 Subscribe
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//             >
//               ✕
//             </button>
//             <h2 className="text-xl font-semibold mb-4">
//               Subscribe to {selectedPub?.name}
//             </h2>

//             {/* Name Input */}
//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Your Name</label>
//               <input
//                 type="text"
//                 value={customerNameInput}
//                 onChange={(e) => {
//                   setCustomerNameInput(e.target.value);
//                   fetchSubscriptions(e.target.value);
//                 }}
//                 className="w-full border px-3 py-2 rounded-md"
//                 placeholder="Enter your name"
//               />
//             </div>

//             {/* Payment Method */}
//             <div className="mb-4">
//               <p className="font-medium mb-2">Payment Method</p>
//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="payment"
//                     checked={paymentMethod === "qr"}
//                     onChange={() => setPaymentMethod("qr")}
//                   />
//                   <span>QR Code</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="payment"
//                     checked={paymentMethod === "cod"}
//                     onChange={() => setPaymentMethod("cod")}
//                   />
//                   <span>Cash on Delivery</span>
//                 </label>
//               </div>

//               {paymentMethod === "qr" && (
//                 <div className="mt-4 p-4 border rounded-md bg-gray-50 flex items-center justify-center">
//                   <img src="/images/Qr.jpg" alt="QR Code" className="w-40 h-40" />
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={handlePayNow}
//               disabled={loading || isSubscribed(selectedPub?._id || "")}
//               className={`w-full text-white py-2 rounded-lg flex justify-center items-center ${
//                 isSubscribed(selectedPub?._id || "")
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700"
//               }`}
//             >
//               {loading ? "Processing..." : isSubscribed(selectedPub?._id || "")
//                 ? "Already Subscribed"
//                 : "Pay Now"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewSubscription;
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import qrImage from "@/pages/Qr.jpg"; 
import { useNavigate } from "react-router-dom";


interface Publication {
  _id: string;
  name: string;
  language: string;
  monthlyPrice: number;
}

interface Subscription {
  publication: {
    _id: string;
  };
  customerName: string;
}



const NewSubscription = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [customerNameInput, setCustomerNameInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "cod">("qr");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axiosInstance.get("https://everydaynewsbackend.onrender.com/api/customer/publications");
      setPublications(response.data);
    } catch (error) {
      console.error("Error fetching publications:", error);
      toast.error("Failed to fetch available publications");
    }
  };

  const fetchSubscriptions = async (name: string) => {
    if (!name.trim()) return;
    try {
      const response = await axiosInstance.get(
        `https://everydaynewsbackend.onrender.com/api/customer/subscriptions?customerName=${encodeURIComponent(name)}`
      );
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const handleSubscribeClick = (pub: Publication) => {
    setSelectedPub(pub);
    setShowModal(true);
  };
  const navigate = useNavigate();
  const handlePayNow = async () => {
  if (!customerNameInput.trim()) {
    toast.error("Please enter your name");
    return;
  }

  setLoading(true);
  try {
    await axiosInstance.post("https://everydaynewsbackend.onrender.com/api/customer/subscriptions/subscribe", {
      customerName: customerNameInput.trim(),
      publicationId: selectedPub?._id,
      amount: selectedPub?.monthlyPrice,
    });

    // ✅ Create new payment entry
    const newPayment = {
      id: Date.now().toString(), // unique id
      subscriptionName: selectedPub?.name || "Unknown",
      amount: selectedPub?.monthlyPrice || 0,
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 30)
      ).toISOString(), // due 30 days later
      status: "paid" as const,
      paidDate: new Date().toISOString(),
    };

    // ✅ Save in localStorage
    const existingPayments = JSON.parse(localStorage.getItem("payments") || "[]");
    existingPayments.push(newPayment);
    localStorage.setItem("payments", JSON.stringify(existingPayments));

    // ✅ Trigger update event for Payments page
    window.dispatchEvent(new Event("billsUpdated"));

    toast.success(`Subscribed to ${selectedPub?.name} successfully!`);
    setShowModal(false);
    fetchSubscriptions(customerNameInput);

    // ✅ Navigate to Payments page
    navigate("/payments");
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || "Subscription failed");
  } finally {
    setLoading(false);
  }
};


  const isSubscribed = (pubId: string) =>
    subscriptions.some((sub) => sub.publication._id === pubId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-teal-600">Available Publications</h1>

      {publications.length === 0 ? (
        <p>No publications available.</p>
      ) : (
        <ul className="space-y-4">
  {publications.map((pub) => (
    <li
      key={pub._id}
      className="p-4 rounded-lg shadow hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex items-center justify-between"
      style={{
        background: "linear-gradient(145deg, #f9f4e6, #f5e5b5)", // soft sea gold gradient
        border: "1px solid #e0c97f",
        color: "#4b3f2f",
      }}
    >
      <div>
        <h2 className="font-semibold text-lg">{pub.name}</h2>
        <p className="text-gray-600">Language: {pub.language}</p>
        <p className="font-medium mt-1">₹{pub.monthlyPrice} / month</p>
      </div>
      <button
        onClick={() => handleSubscribeClick(pub)}
        className="px-4 py-2 rounded-lg border border-teal-700 bg-teal-500 text-white font-medium hover:bg-yellow-600"
      >
        Subscribe
      </button>
    </li>
  ))}
</ul>



      )}

 {/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div
      className="rounded-lg p-6 w-full max-w-md shadow-md relative transition-transform hover:-translate-y-1"
      style={{
        background: "linear-gradient(145deg, #f3ede3ff, #f2e8d6)", // soft SeaGold gradient
        border: "1px solid #e6d7b7", // subtle golden border
        color: "#4b3f2f",
      }}
    >
      {/* Close button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:text-gray-800 hover:bg-yellow-100 transition-colors"
        title="Close"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-4">{`Subscribe to ${selectedPub?.name}`}</h2>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Your Name</label>
        <input
          type="text"
          value={customerNameInput}
          onChange={(e) => {
            setCustomerNameInput(e.target.value);
            fetchSubscriptions(e.target.value);
          }}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Enter your name"
          style={{
            borderColor: "#e6d7b7",
            backgroundColor: "#fcf8f1",
            color: "#4b3f2f",
          }}
        />
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <p className="font-medium mb-2">Payment Method</p>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "qr"}
              onChange={() => setPaymentMethod("qr")}
            />
            <span>QR Code</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>

        {paymentMethod === "qr" && (
          <div
            className="mt-4 p-4 rounded-md flex items-center justify-center"
            style={{
              border: "1px solid #e6d7b7",
              backgroundColor: "#f7e6c9ff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <img src="/images/Qr.jpg" alt="QR Code" className="w-40 h-40" />
          </div>
        )}
      </div>

      <button
        onClick={handlePayNow}
        disabled={loading || isSubscribed(selectedPub?._id || "")}
        className={`w-full text-white py-2 rounded-lg flex justify-center items-center ${
          isSubscribed(selectedPub?._id || "")
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-400 transition-colors"
        }`}
      >
        {loading
          ? "Processing..."
          : isSubscribed(selectedPub?._id || "")
          ? "Already Subscribed"
          : "Pay Now"}
      </button>
    </div>
  </div>
)}



    </div>
  );
};

export default NewSubscription;