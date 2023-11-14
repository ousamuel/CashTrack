import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link } from "@nextui-org/react";

export default function MiddleDashChart() {
  const allQuestions: string[] = [
    "First. What do you think is the hardest part of what I do for a living?",
    "What reality show do you think I'm most likely to binge watch? Explain.",
    "What's the first thing you noticed about me?",
    "If Myspace was still a thing what would my profile song be?",
    "If you were to buy me a present, knowing nothing about me other than what I look like, what would it be?",
    "On a scale of 1-10, how messy do you think my car is? 1 being the cleanest 10 complete disaster, explain.",
    "Do you think plants thrive or die in my care? Explain",
    "Do I look kind? Explain ",
    "Do I seem like more of a creative or analytical type?",
    "Do I seem like someone who would get a name tattooed on myself? Why or why not?",
    "Finish the sentence: Just by looking at you I'd think _____________.",
    "What do my shoes tell you about me?",
    "What does my Instagram tell you about me?",
    "What do you think I'm most likely to splurge on?",
    "As a child, what do you think I wanted to be?",
    "What would your younger self not believe about your life today?",
    "Finish the sentence: Strangers would describe me as ______ only I know that I am _______",
    "What title would you give this chapter in your life?",
    "Do you think the image you have of yourself matches the image other people see you as?",
    "What fast food restaurant do you think I'm most likely to drive through? What's my order?",
    "Do you think I intimidate others? Why or why not?",
    "What dating advice would you give your younger self?",
    "What about my profile made you swipe right?",
    "What are you passionate about?",
    "What's your most embarrassing childhood nickname, and is it still used by your friends or family?",
    "How old do you feel emotionally?",
    "What's been your happiest memory this past year?",
    "Have you changed your mind about anything recently?",
    "What has been your earliest recollection of happiness?",
    "What lesson took you the longest to un-learn?",
    "Are you lying to yourself about anything?",
    "What about me surprised you?",
    "Based on what you know about me, do you have a Netflix recommendation?",
    "What do you think my superpower is?",
    "Is it better to have loved and lost than never to have loved at all?",
    "Should you always tell the truth, even if it might hurt someone?",
    "Is it better to be a big fish in a small pond or a small fish in a big pond?",

    "Last. What do you think our most important similarities are?",
  ];
  const [question, setQuestion] = useState(allQuestions[0]);
  const [num, setNum] = useState(0);

  function randInt(min: number, max: number): number {
    if (min > max) {
      throw new Error("min must be less than or equal to max");
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomNum = randInt(0, allQuestions.length - 1);
  function decNum() {
    if (num == 0) {
      setNum(allQuestions.length - 1);
    } else {
      setNum(num - 1);
    }
  }
  function incNum() {
    if (num == allQuestions.length - 1) {
      setNum(0);
    } else {
      setNum(num + 1);
    }
  }
  console.log(num);

  return (
    <div className="p-4 ">
      <div className="flex-1">
        {" "}
        <Button
          className="btn btn-blue"
          onPress={() => setQuestion(allQuestions[randomNum])}
        >
          Click for random
        </Button>
        <Button
          className="btn btn-orange"
          onPress={() => {
            decNum();
            setQuestion(allQuestions[num]);
          }}
        >
          Click for decrease
        </Button>
        <Button
          className="btn btn-green"
          onPress={() => {
            incNum();
            setQuestion(allQuestions[num]);
          }}
        >
          Click for increase
        </Button>
      </div>
      {/* <Image className="w-[85px]" src="/images/chartguy.png" /> */}
      {/* <div className="flex-1">text</div> */}
      <div className="flex-1 font-bolder text-5xl text-slate-300 text-center mt-4 p-5 border-2 rounded-lg bg-violet-800">
        {question}
      </div>
    </div>
  );
}
