import CallSection from "@/components/call-us/CallSection";
import FormSection from "@/components/form/FormSection";
import React from "react";

const ContactUs = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-10">
      <h2 className="text-3xl font-semibold">ارتباط با ما</h2>
      <FormSection />
      <CallSection />
    </div>
  );
};

export default ContactUs;
