import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: [
            {
              "role": "user",
              "content": prompt
            }
        ],
        temperature: 0.9,
        max_tokens: 1000,
        top_p: 1,
    })
    .then((response: any) => response.choices[0].message)
    // .catch((err: any) => `ChatGPT was unable to find an answer for that! (Error: ${err.message})`);

    return res;
}

export default query;