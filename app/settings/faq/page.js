// "use client";
// import { useState } from "react";
// import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
// import Link from "next/link";

// const faqData = [
//   {
//     question: "What is WeedWatcher?",
//     answer: "WeedWatcher is an AI-powered tool that detects and classifies weeds using advanced image processing and machine learning techniques.",
//   },
//   {
//     question: "How does WeedWatcher detect weeds?",
//     answer: "It uses computer vision algorithms to analyze images, identify weeds, and provide real-time reports on their distribution and impact.",
//   },
//   {
//     question: "Can I use WeedWatcher on both crops and gardens?",
//     answer: "Yes, WeedWatcher can be used for both crops and gardens. It’s designed to work with various agricultural settings, offering flexibility for different types of farming and gardening environments.",
//   },
//   {
//     question: "How accurate is WeedWatcher's weed detection feature?",
//     answer: "WeedWatcher’s AI is trained on a large dataset of weed images to ensure high accuracy. However, the accuracy can vary depending on the quality of the images and the types of weeds in your area. Regular updates to the AI model aim to improve accuracy over time.",
//   },
//   {
//     question: "Do I need to upload images of weeds manually, or does WeedWatcher do it automatically?",
//     answer: "You need to capture images manually using the WeedWatcher app. Once you take the photo, the app processes it automatically to detect weeds.",
//   },
//   {
//     question: "How does WeedWatcher contribute to sustainable farming practices?",
//     answer: "WeedWatcher helps reduce the overuse of herbicides by providing accurate weed detection, allowing farmers to apply targeted treatments instead of broad-spectrum herbicides. This contributes to environmentally friendly farming and lowers chemical exposure.",
//   },
//   {
//     question: "Can I track weed growth over time using WeedWatcher?",
//     answer: "Yes, WeedWatcher allows you to monitor the growth of weeds over time, providing insights into the effectiveness of your weed management strategies and helping you plan future interventions.",
//   },
//   {
//     question: "Can WeedWatcher send me alerts for weed detection?",
//     answer: "WeedWatcher does not have an alert feature at the moment. However, you can view real-time weed detection results as soon as you capture an image.",
//   },
//   {
//     question: "How can I access real-time monitoring for weed distribution?",
//     answer: "Real-time monitoring is available through the app’s camera feature, which analyzes the images you capture to show weed distribution within your field or garden instantly.",
//   },
//   {
//     question: "Can WeedWatcher integrate with other farm management tools?",
//     answer: "Currently, WeedWatcher is designed to work independently, but future versions may include integration with other farm management platforms.",
//   },
//   {
//     question: "What devices are compatible with WeedWatcher?",
//     answer: "WeedWatcher is compatible with most smartphones and tablets running iOS and Android. Check the app store for specific device compatibility.",
//   },
//   {
//     question: "How can I provide feedback or report an issue with the app?",
//     answer: "You can provide feedback or report issues through the app’s support section.",
//   },
// ];

// const FAQ = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
//       <div className="flex items-center mb-4">
//         <Link href="/settings">
//           <ArrowLeft size={24} className="cursor-pointer mr-2" />
//         </Link>
//         <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
//       </div>

//       {faqData.map((item, index) => (
//         <div key={index} className="border-b py-3 z-5">
//           <button
//             className="flex justify-between items-center w-full text-left text-lg font-semibold"
//             onClick={() => setOpenIndex(openIndex === index ? null : index)}
//           >
//             {item.question}
//             {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </button>
//           {openIndex === index && <p className="mt-2 text-gray-600">{item.answer}</p>}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FAQ;
"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import Link from "next/link";

const faqData = [
  {
    question: "What is WeedWatcher?",
    answer: "WeedWatcher is an AI-powered tool that detects and classifies weeds using advanced image processing and machine learning techniques.",
  },
  {
    question: "How does WeedWatcher detect weeds?",
    answer: "It uses computer vision algorithms to analyze images, identify weeds, and provide real-time reports on their distribution and impact.",
  },
  {
    question: "How accurate is WeedWatcher's weed detection feature?",
    answer: "WeedWatcher’s AI is trained on a large dataset of weed images to ensure high accuracy. However, the accuracy can vary depending on the quality of the images and the types of weeds in your area. Regular updates to the AI model aim to improve accuracy over time.",
  },
  {
    question: "Do I need to upload images of weeds manually, or does WeedWatcher do it automatically?",
    answer: "You need to capture images manually using the WeedWatcher app. Once you take the photo, the app processes it automatically to detect weeds.",
  },
  {
    question: "How does WeedWatcher contribute to sustainable farming?",
    answer: "WeedWatcher helps reduce the overuse of herbicides by providing accurate weed detection, allowing farmers to apply targeted treatments instead of broad-spectrum herbicides. This contributes to environmentally friendly farming and lowers chemical exposure.",
  },
  {
    question: "Can I track weed growth over time using WeedWatcher?",
    answer: "Yes, WeedWatcher allows you to monitor the growth of weeds over time, providing insights into the effectiveness of your weed management strategies and helping you plan future interventions.",
  },
  {
    question: "Can WeedWatcher integrate with other farm management tools?",
    answer: "Currently, WeedWatcher is designed to work independently, but future versions may include integration with other farm management platforms.",
  },
  {
    question: "What devices are compatible with WeedWatcher?",
    answer: "WeedWatcher is compatible with most smartphones and tablets running iOS and Android. Check the app store for specific device compatibility.",
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link href="/settings">
          <ArrowLeft size={28} className="cursor-pointer text-green-600 hover:text-green-700 transition" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">Frequently Asked Questions</h1>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 transition transform hover:scale-105"
          >
            <button
              className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {item.question}
              {openIndex === index ? <ChevronUp size={24} className="text-green-600" /> : <ChevronDown size={24} className="text-gray-600" />}
            </button>

            {openIndex === index && (
              <p className="mt-2 text-gray-600 text-sm leading-relaxed border-t pt-2">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
