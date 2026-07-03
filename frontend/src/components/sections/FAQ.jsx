import FAQItem from "../common/FAQItem";
import { useState } from "react";


function FQA(){
  const[openIndex, setOpenIndex] = useState(0);
  const faqs = [
    {
      question: "Is the AI Accessibility Auditor free to use?",
      answer: "Yes. You can scan public websites for free and receive a detailed accessibility report with AI-powered recommendations."
    },
    {
      question: "Which accessibility standards are supported?",
      answer: "Our scanner checks your website against WCAG 2.2 guidelines to help improve accessibility compliance."
    },
    {
      question: "Can I scan private or local websites?",
      answer: "Currently, only publicly accessible websites can be scanned. Localhost and private networks are not supported yet."
    },
    {
      question: "How long does a website scan take?",
      answer: "Most scans complete within 15 to 30 seconds, depending on the size and complexity of the website."
    },
    {
      question: "Will I receive AI-powered recommendations?",
      answer: "Yes. After every scan, our AI generates actionable suggestions to improve accessibility issues efficiently."
    },
    {
      question: "Do I need to install any software?",
      answer: "No. Everything runs directly in your browser. So, no installation or setup required."
    }
  ];

  return(
    <section id="faq" className="mx-auto max-w-7xl px-6 py-28">
      
      {/* Heading Bolck */}
      <div className="mb-16 text-center">

        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Frequently Asked Questions
        </span>

        <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Everything You Need to Know
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600 sm:max-w-2xl sm:text-lg">
          Find answers to the most common questions about our AI-Powered accessibility scanner.
        </p>

      </div>
      
      {/* FAQ Container */}
      <div className="mx-auto flex max-w-4xl flex-col gap-6">

        {faqs.map((faq, index) => (
          <FAQItem 
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen= {openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}

      </div>

    </section>
  );
}

export default FQA;