"use client";

import { useRef, useState } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
  {
    question: <div className="text-white">How does Findrr&apos;s AI work?</div>,
    answer: <div className="space-y-2 leading-relaxed text-white">Findrr&apos;s AI taps into the power of textual input to generate custom tattoo designs. You input your tattoo concept through text, and the AI, trained on a vast array of tattoo art, interprets your words to create a unique design. It&apos;s a seamless blend of your ideas and AI creativity, offering personalized tattoos without the need for complex software or design skills. With findrr, envisioning your next tattoo is as simple as typing a description.</div>,
  },
  {
    question: <div className="text-white">What AI model do you use?</div>,
    answer: (
      <p>
       Findrr is powered by DALL-E 3
      </p>
    ),
  },
  {
    question: "How long will it take to generate my tattoo?",
    answer: <div className="space-y-2 leading-relaxed">It takes between 5-10 seconds maximum to generate your custom design.</div>,
  },
  {
    question: "What will you do with my AI tattoo ideas?",
    answer: (
      <p>
      We only use your ideas to create a custom tattoo design. Your data privacy and security are our top priorities.
      </p>
    ),
  },
  {
    question: "Who built and is behind Findrr?",
    answer: (
      <p>
     This service was built by me, Rajvir Singh Nahar. You can contact for support at Rajvirnahar6667@gmail.com.
      </p>
    ),
  },
  {
    question: "Is the payment service secure?",
    answer: (
      <p>
    Yes, our payment service is secure. We use Stripe for financial processing, and we do not store any information about your card. Stripe ensures bank-level security standards.
      </p>
    ),
  },
  {
    question: "How much does Findrr cost?",
    answer: (
      <div className="space-y-2 leading-relaxed">Right now the beginner plan costs $4.99, the Veteran plan $9.99 and the Premium plan $18.99. You get 3 credits for free when you sign up. Only one time payments</div>
    ),
  },
  {
    question: "Can I get a refund?",
    answer: (
      <p>
       Unfortunately, we cannot offer refunds as costs incurred for creating AI tatooos are extremely high. Each time you generate a design, we get charged. 
      </p>
    ),
  },
  {
    question: "How do these payments work?",
    answer: (
      <p>
       You only pay once to gain credits to generate custom tattoo designs. We have Beginner, Veteran, and Premium plans. You choose which one best suits you and pay once, and when you&apos;ve run out of credits, you must choose a plan again.
      </p>
    ),
  },
  {
    question: "How do I check my previous billing history and purchases?",
    answer: (
      <p>
      Scroll to the top and you will see your account icon at the top left corner. Click it to log out or view any previous payments you have made.
      </p>
    ),
  },
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-white`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-black text-white" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;