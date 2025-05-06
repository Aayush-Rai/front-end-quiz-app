import { useEffect, useState } from "react";

const useGetQuestions = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            setLoading(true);
            const resp = await fetch(import.meta.env.VITE_BACKEND_QUIZ_URL + "/quiz", {
                method: "GET",
            });

            const result = await resp.json();
            setQuestions(result.data.questions);
        } catch (err) {
            console.log("Error in fetching questions: ", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return { questions, loading };
};

export { useGetQuestions };
