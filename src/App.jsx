import { useGetQuestions } from "./hooks/useGetQuestions";

const App = () => {
    const { questions, loading } = useGetQuestions();
    console.log("🟡 : questions:", questions);

    if (loading) {
        return (
            <div className="h-[100vh] w-[100vw] bg-black text-white flex items-center justify-center">
                <h1 className="text-2xl">Loading...</h1>
            </div>
        );
    }
    return (
        <div>
            <div>
                <h1>Questions</h1>
            </div>
            <div>
                {questions.map(({ id, title, options }) => (
                    <div key={id}>
                        <p>{title}</p>
                        <div>
                            {options.map(({ id: optId, text }) => (
                                <div key={optId}>
                                    <input type="radio" name={id} value={optId} id={optId}></input>
                                    <label htmlFor={optId}>{text}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
