import { HomePage } from "@/components/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Money Mindset",
  description: "Only platform to make you rich",
};


export default function Home() {
  
  return (
    <>
      <HomePage />
    </>
  );
}