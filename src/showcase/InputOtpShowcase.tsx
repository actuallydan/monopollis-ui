import { useState } from "react";
import { InputOtp, Card, Header, Paragraph, Divider } from "../components";

export default function InputOtpShowcase() {
  const [otpValue, setOtpValue] = useState("");

  return (
    <div className="space-y-8">
      <Card title="Input OTP Component" variant="bordered">
        <div className="space-y-6">
          <Paragraph size="sm">
            One-time password input component with masked mode, inspired by
            PrimeReact but customized for the monochromatic terminal theme.
          </Paragraph>

          <div className="space-y-8">
            {/* Basic OTP */}
            <div>
              <Header size="sm" className="mb-4">
                Basic 4-Digit OTP
              </Header>
              <InputOtp
                value={otpValue}
                onChange={setOtpValue}
                length={4}
                autoFocus={true}
              />
              <Paragraph size="sm" className="mt-2 text-orange-300/60">
                Current value: {otpValue || "None"}
              </Paragraph>
            </div>

            <Divider />

            {/* 6-Digit OTP with Mask */}
            <div>
              <Header size="sm" className="mb-4">
                6-Digit OTP with Mask
              </Header>
              <InputOtp
                value={otpValue}
                onChange={setOtpValue}
                length={4}
                mask={true}
                integerOnly={true}
              />
              <Paragraph size="sm" className="mt-2 text-orange-300/60">
                Current value: {otpValue || "None"}
              </Paragraph>
            </div>

            <Divider />

            {/* Disabled OTP */}
            <div>
              <Header size="sm" className="mb-4">
                Disabled OTP
              </Header>
              <InputOtp
                value="1234"
                onChange={() => {}}
                length={4}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
