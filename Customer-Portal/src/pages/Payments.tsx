import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

interface Bill {
  id: string;
  amount: number;
  dueDate: string;
  status: "paid";
  paidDate: string;
  subscriptionName: string;
}

const Payments = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dummyBills: Bill[] = [
      {
        id: "1",
        subscriptionName: "The Daily Times",
        amount: 120,
        dueDate: "2025-11-30T00:00:00Z",
        status: "paid",
        paidDate: "2025-11-05T00:00:00Z",
      },
      {
        id: "2",
        subscriptionName: "Morning Herald",
        amount: 150,
        dueDate: "2025-12-01T00:00:00Z",
        status: "paid",
        paidDate: "2025-11-08T00:00:00Z",
      },
      {
        id: "3",
        subscriptionName: "Evening Express",
        amount: 100,
        dueDate: "2025-12-05T00:00:00Z",
        status: "paid",
        paidDate: "2025-11-10T00:00:00Z",
      },
    ];

    const loadBills = () => {
  const storedPayments: Bill[] = JSON.parse(localStorage.getItem("payments") || "[]");

  // ✅ Merge dummy and stored payments (no duplicates)
  const ids = new Set<string>();
  const combined = [...dummyBills, ...storedPayments].filter((bill) => {
    if (ids.has(bill.id)) return false;
    ids.add(bill.id);
    return true;
  });

  setBills(combined);
  setIsLoading(false);
};


    loadBills();

    // ✅ Listen for updates
    const updateBills = () => loadBills();
    window.addEventListener("billsUpdated", updateBills);

    return () => window.removeEventListener("billsUpdated", updateBills);
  }, []);

  const getStatusBadge = () => (
    <Badge className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">
      Paid
    </Badge>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-muted-foreground">
        Loading bills...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-700 to-amber-600 bg-clip-text text-transparent mb-4">
        Payments & Bills
      </h1>

      {bills.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-10 w-[260px] h-[340px]">
          <CreditCard className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-base">No bills found</p>
        </Card>
      ) : (
        <div className="flex flex-wrap gap-4 justify-start">
          {bills.map((bill) => (
            <Card
              key={bill.id}
              className="w-[260px] h-[340px] shadow-md hover:shadow-lg transition-shadow rounded-xl"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">
                    {bill.subscriptionName}
                  </CardTitle>
                  {getStatusBadge()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Paid on: {new Date(bill.paidDate).toLocaleDateString()}
                </p>
              </CardHeader>

              <CardContent className="flex flex-col justify-center items-center h-full space-y-4">
                <div className="text-center">
                  <p className="text-muted-foreground text-xs">Amount</p>
                  <p className="text-2xl font-bold mt-1">
                    ₹{bill.amount.toFixed(2)}
                  </p>
                </div>

                <div className="text-center text-muted-foreground text-sm">
                  <p>Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                  <p>
                    Status:{" "}
                    <span className="text-green-600 font-medium">Paid</span>
                  </p>
                </div>

                <div className="flex justify-center mt-2">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payments;
