import Card from "./Card";

function App() {
  const cardNumber1 = "4642 3489 9867 7632";
  const maskedNumber1 = "4642 xxxx xxxx xxxx";

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="flex space-x-16">
        <Card cardNumber={cardNumber1} maskedNumber={maskedNumber1} />
      </div>
    </div>
  );
}

export default App;
