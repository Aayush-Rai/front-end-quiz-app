import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4100/api/v1/quiz")
      .then((res) => res.json())
      .then((data) => setQuestions(data.data.questions));
  }, []);

  const handleSubmit = async () => {
    const question = questions[0];
    const selectedOptionId = selectedOption[question.id];

    if (!selectedOptionId) {
      toast.error("Please select an answer");
      return;
    }

    const res = await fetch("http://localhost:4100/api/v1/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: question.id, selectedOptionId }),
    }); 

    const data = await res.json();
    setResult(data.result);;

  
    await fetch("http://localhost:4200/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: `Your answer is ${data.result}` }),
    });

    
    if (data.result === "correct") {
      toast.success("✅ Correct Answer!");
    } else {
      toast.error("❌ Incorrect Answer!");
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const question = questions[0];

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer />
      <h2>{question.title}</h2>
      {question.options.map((opt) => (
        <div key={opt.id}>
          <input
            type="radio"
            id={opt.id}
            name="quiz"
            value={opt.id}
            onChange={() =>
              setSelectedOption({ ...selectedOption, [question.id]: opt.id })
            }
            checked={selectedOption[question.id] === opt.id}
          />
          <label htmlFor={opt.id}>{opt.text}</label>
        </div>
      ))}
      <button onClick={handleSubmit} style={{ marginTop: "10px" , border:"2px black solid", borderRadius:"8px", color: "red", cursor:"pointer"}}>
        Submit
      </button>
    </div>
  );
};

export default App;
