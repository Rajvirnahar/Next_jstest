import OpenAI from "openai";

const openai = new OpenAI();


main();


export default async function handler(req, res) {
    async function main() {
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: "Create a new Custom Tattoo Design ." }],
          model: "gpt-3.5-turbo",
        });
      
        console.log('completion', completion.data.choices)
        console.log(completion.choices[0]);
      }

    res.status(200).json({ name: 'John Doe' })
}
