import React, { useState } from "react";
import AuthCard from "../components/AuthCard/AuthCard";
import AuthNav from "../components/AuthNav/AuthNav";
import StudentForm from "./components/StudentForm";

export default function Register() {
  const [item, setItem] = useState(1);

  return (
    <AuthCard title="Sign Up" isArrowLeft={false}>
      <AuthNav
        data={{
          text1: "Student",
          text2: "Teacher",
          item: item,
          setItem: setItem,
        }}
      />
      <StudentForm userType={item} />
    </AuthCard>
  );
}