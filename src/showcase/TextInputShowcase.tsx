import { useState } from "react";
import { TextInput, Card } from "../components";

export default function TextInputShowcase() {
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <div className="space-y-8">
      <Card title="Text Input Components" variant="bordered">
        <div className="space-y-6">
          <TextInput
            label="Username"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Enter your username"
            description="This is a description for the username field"
            required
          />

          <TextInput
            label="Email Address"
            value={emailValue}
            onChange={setEmailValue}
            type="email"
            placeholder="Enter your email"
            error="Please enter a valid email address"
          />

          <TextInput
            label="Password"
            value={passwordValue}
            onChange={setPasswordValue}
            type="password"
            placeholder="Enter your password"
            description="Password must be at least 8 characters"
          />

          <TextInput
            label="Disabled Input"
            value="This input is disabled"
            onChange={() => {}}
            disabled
            description="This input field is disabled"
          />
        </div>
      </Card>
    </div>
  );
}
