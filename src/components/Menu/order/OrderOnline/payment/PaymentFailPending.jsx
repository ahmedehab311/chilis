import { useParams } from "react-router-dom";

const PaymentFailPending = () => {
  const { orderCode } = useParams();

  return (
    <div className="p-4 text-center">
      {/* <h2 className="text-yellow-600 text-2xl font-bold">الدفع قيد الانتظار</h2> */}
      <p>كود الطلب: {orderCode}</p>
      {/* <p>سنقوم بمراجعة الدفع وتأكيده قريبًا.</p> */}
    </div>
  );
};

export default PaymentFailPending;
